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

func TestPlaylistEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Playlist(nil)
		if ent == nil {
			t.Fatal("expected non-nil PlaylistEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := playlistBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "playlist." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENWHYD_TEST_PLAYLIST_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		playlistRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.playlist", setup.data)))
		var playlistRef01Data map[string]any
		if len(playlistRef01DataRaw) > 0 {
			playlistRef01Data = core.ToMapAny(playlistRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = playlistRef01Data

		// LIST
		playlistRef01Ent := client.Playlist(nil)
		playlistRef01Match := map[string]any{
			"username": setup.idmap["username01"],
		}

		playlistRef01ListResult, err := playlistRef01Ent.List(playlistRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, playlistRef01ListOk := playlistRef01ListResult.([]any)
		if !playlistRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", playlistRef01ListResult)
		}

	})
}

func playlistBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "playlist", "PlaylistTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read playlist test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse playlist test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"playlist01", "playlist02", "playlist03", "username01"},
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
	entidEnvRaw := os.Getenv("OPENWHYD_TEST_PLAYLIST_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENWHYD_TEST_PLAYLIST_ENTID": idmap,
		"OPENWHYD_TEST_LIVE":      "FALSE",
		"OPENWHYD_TEST_EXPLAIN":   "FALSE",
		"OPENWHYD_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["OPENWHYD_TEST_PLAYLIST_ENTID"])
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
