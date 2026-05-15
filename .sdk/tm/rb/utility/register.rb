# Openwhyd SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

OpenwhydUtility.registrar = ->(u) {
  u.clean = OpenwhydUtilities::Clean
  u.done = OpenwhydUtilities::Done
  u.make_error = OpenwhydUtilities::MakeError
  u.feature_add = OpenwhydUtilities::FeatureAdd
  u.feature_hook = OpenwhydUtilities::FeatureHook
  u.feature_init = OpenwhydUtilities::FeatureInit
  u.fetcher = OpenwhydUtilities::Fetcher
  u.make_fetch_def = OpenwhydUtilities::MakeFetchDef
  u.make_context = OpenwhydUtilities::MakeContext
  u.make_options = OpenwhydUtilities::MakeOptions
  u.make_request = OpenwhydUtilities::MakeRequest
  u.make_response = OpenwhydUtilities::MakeResponse
  u.make_result = OpenwhydUtilities::MakeResult
  u.make_point = OpenwhydUtilities::MakePoint
  u.make_spec = OpenwhydUtilities::MakeSpec
  u.make_url = OpenwhydUtilities::MakeUrl
  u.param = OpenwhydUtilities::Param
  u.prepare_auth = OpenwhydUtilities::PrepareAuth
  u.prepare_body = OpenwhydUtilities::PrepareBody
  u.prepare_headers = OpenwhydUtilities::PrepareHeaders
  u.prepare_method = OpenwhydUtilities::PrepareMethod
  u.prepare_params = OpenwhydUtilities::PrepareParams
  u.prepare_path = OpenwhydUtilities::PreparePath
  u.prepare_query = OpenwhydUtilities::PrepareQuery
  u.result_basic = OpenwhydUtilities::ResultBasic
  u.result_body = OpenwhydUtilities::ResultBody
  u.result_headers = OpenwhydUtilities::ResultHeaders
  u.transform_request = OpenwhydUtilities::TransformRequest
  u.transform_response = OpenwhydUtilities::TransformResponse
}
