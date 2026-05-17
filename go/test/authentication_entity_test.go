package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/openwhyd-sdk/go"
	"github.com/voxgig-sdk/openwhyd-sdk/go/core"

	vs "github.com/voxgig-sdk/openwhyd-sdk/go/utility/struct"
)

func TestAuthenticationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Authentication(nil)
		if ent == nil {
			t.Fatal("expected non-nil AuthenticationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := authenticationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "authentication." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENWHYD_TEST_AUTHENTICATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		authenticationRef01Ent := client.Authentication(nil)
		authenticationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "authentication"}, setup.data), "authentication_ref01"))

		authenticationRef01DataResult, err := authenticationRef01Ent.Create(authenticationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		authenticationRef01Data = core.ToMapAny(authenticationRef01DataResult)
		if authenticationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		authenticationRef01MatchDt0 := map[string]any{}
		authenticationRef01DataDt0Loaded, err := authenticationRef01Ent.Load(authenticationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if authenticationRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func authenticationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "authentication", "AuthenticationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read authentication test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse authentication test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"authentication01", "authentication02", "authentication03"},
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
	entidEnvRaw := os.Getenv("OPENWHYD_TEST_AUTHENTICATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENWHYD_TEST_AUTHENTICATION_ENTID": idmap,
		"OPENWHYD_TEST_LIVE":      "FALSE",
		"OPENWHYD_TEST_EXPLAIN":   "FALSE",
		"OPENWHYD_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["OPENWHYD_TEST_AUTHENTICATION_ENTID"])
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
