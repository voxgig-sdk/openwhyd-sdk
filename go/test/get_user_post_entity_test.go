package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/openwhyd-sdk"
	"github.com/voxgig-sdk/openwhyd-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestGetUserPostEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetUserPost(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetUserPostEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := get_user_postBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "get_user_post." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENWHYD_TEST_GET_USER_POST_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		getUserPostRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.get_user_post", setup.data)))
		var getUserPostRef01Data map[string]any
		if len(getUserPostRef01DataRaw) > 0 {
			getUserPostRef01Data = core.ToMapAny(getUserPostRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getUserPostRef01Data

		// LIST
		getUserPostRef01Ent := client.GetUserPost(nil)
		getUserPostRef01Match := map[string]any{
			"username": setup.idmap["username01"],
		}

		getUserPostRef01ListResult, err := getUserPostRef01Ent.List(getUserPostRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, getUserPostRef01ListOk := getUserPostRef01ListResult.([]any)
		if !getUserPostRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", getUserPostRef01ListResult)
		}

	})
}

func get_user_postBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "get_user_post", "GetUserPostTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read get_user_post test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse get_user_post test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"get_user_post01", "get_user_post02", "get_user_post03", "username01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("OPENWHYD_TEST_GET_USER_POST_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENWHYD_TEST_GET_USER_POST_ENTID": idmap,
		"OPENWHYD_TEST_LIVE":      "FALSE",
		"OPENWHYD_TEST_EXPLAIN":   "FALSE",
		"OPENWHYD_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["OPENWHYD_TEST_GET_USER_POST_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OPENWHYD_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["OPENWHYD_APIKEY"],
			},
			extra,
		})
		client = sdk.NewOpenwhydSDK(core.ToMapAny(mergedOpts))
	}

	live := env["OPENWHYD_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["OPENWHYD_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
