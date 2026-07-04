# GetUserPost entity test

require "minitest/autorun"
require "json"
require_relative "../Openwhyd_sdk"
require_relative "runner"

class GetUserPostEntityTest < Minitest::Test
  def test_create_instance
    testsdk = OpenwhydSDK.test(nil, nil)
    ent = testsdk.GetUserPost(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = get_user_post_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "get_user_post." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set OPENWHYD_TEST_GET_USER_POST_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    get_user_post_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.get_user_post")))
    get_user_post_ref01_data = nil
    if get_user_post_ref01_data_raw.length > 0
      get_user_post_ref01_data = Helpers.to_map(get_user_post_ref01_data_raw[0][1])
    end

    # LIST
    get_user_post_ref01_ent = client.GetUserPost(nil)
    get_user_post_ref01_match = {
      "username" => setup[:idmap]["username01"],
    }

    get_user_post_ref01_list_result = get_user_post_ref01_ent.list(get_user_post_ref01_match, nil)
    assert get_user_post_ref01_list_result.is_a?(Array)

  end
end

def get_user_post_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "get_user_post", "GetUserPostTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = OpenwhydSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["get_user_post01", "get_user_post02", "get_user_post03", "username01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["OPENWHYD_TEST_GET_USER_POST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "OPENWHYD_TEST_GET_USER_POST_ENTID" => idmap,
    "OPENWHYD_TEST_LIVE" => "FALSE",
    "OPENWHYD_TEST_EXPLAIN" => "FALSE",
    "OPENWHYD_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["OPENWHYD_TEST_GET_USER_POST_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["OPENWHYD_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["OPENWHYD_APIKEY"],
      },
      extra || {},
    ])
    client = OpenwhydSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["OPENWHYD_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["OPENWHYD_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
