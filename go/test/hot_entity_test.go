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

func TestHotEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Hot(nil)
		if ent == nil {
			t.Fatal("expected non-nil HotEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := hotBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "hot." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENWHYD_TEST_HOT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		hotRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.hot")))
		var hotRef01Data map[string]any
		if len(hotRef01DataRaw) > 0 {
			hotRef01Data = core.ToMapAny(hotRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = hotRef01Data

		// LOAD
		hotRef01Ent := client.Hot(nil)
		hotRef01MatchDt0 := map[string]any{
			"id": hotRef01Data["id"],
		}
		hotRef01DataDt0Loaded, err := hotRef01Ent.Load(hotRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		hotRef01DataDt0LoadResult := core.ToMapAny(entityData(hotRef01DataDt0Loaded))
		if hotRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if hotRef01DataDt0LoadResult["id"] != hotRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func hotBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "hot", "HotTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read hot test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse hot test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"hot01", "hot02", "hot03"},
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
	entidEnvRaw := os.Getenv("OPENWHYD_TEST_HOT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENWHYD_TEST_HOT_ENTID": idmap,
		"OPENWHYD_TEST_LIVE":      "FALSE",
		"OPENWHYD_TEST_EXPLAIN":   "FALSE",
		"OPENWHYD_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["OPENWHYD_TEST_HOT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OPENWHYD_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["OPENWHYD_APIKEY"],
			},
			extraOpts,
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
