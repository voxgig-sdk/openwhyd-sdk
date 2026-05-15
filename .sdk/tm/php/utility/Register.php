<?php
declare(strict_types=1);

// Openwhyd SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

OpenwhydUtility::setRegistrar(function (OpenwhydUtility $u): void {
    $u->clean = [OpenwhydClean::class, 'call'];
    $u->done = [OpenwhydDone::class, 'call'];
    $u->make_error = [OpenwhydMakeError::class, 'call'];
    $u->feature_add = [OpenwhydFeatureAdd::class, 'call'];
    $u->feature_hook = [OpenwhydFeatureHook::class, 'call'];
    $u->feature_init = [OpenwhydFeatureInit::class, 'call'];
    $u->fetcher = [OpenwhydFetcher::class, 'call'];
    $u->make_fetch_def = [OpenwhydMakeFetchDef::class, 'call'];
    $u->make_context = [OpenwhydMakeContext::class, 'call'];
    $u->make_options = [OpenwhydMakeOptions::class, 'call'];
    $u->make_request = [OpenwhydMakeRequest::class, 'call'];
    $u->make_response = [OpenwhydMakeResponse::class, 'call'];
    $u->make_result = [OpenwhydMakeResult::class, 'call'];
    $u->make_point = [OpenwhydMakePoint::class, 'call'];
    $u->make_spec = [OpenwhydMakeSpec::class, 'call'];
    $u->make_url = [OpenwhydMakeUrl::class, 'call'];
    $u->param = [OpenwhydParam::class, 'call'];
    $u->prepare_auth = [OpenwhydPrepareAuth::class, 'call'];
    $u->prepare_body = [OpenwhydPrepareBody::class, 'call'];
    $u->prepare_headers = [OpenwhydPrepareHeaders::class, 'call'];
    $u->prepare_method = [OpenwhydPrepareMethod::class, 'call'];
    $u->prepare_params = [OpenwhydPrepareParams::class, 'call'];
    $u->prepare_path = [OpenwhydPreparePath::class, 'call'];
    $u->prepare_query = [OpenwhydPrepareQuery::class, 'call'];
    $u->result_basic = [OpenwhydResultBasic::class, 'call'];
    $u->result_body = [OpenwhydResultBody::class, 'call'];
    $u->result_headers = [OpenwhydResultHeaders::class, 'call'];
    $u->transform_request = [OpenwhydTransformRequest::class, 'call'];
    $u->transform_response = [OpenwhydTransformResponse::class, 'call'];
});
