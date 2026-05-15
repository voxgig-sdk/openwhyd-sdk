<?php
declare(strict_types=1);

// Openwhyd SDK utility: result_body

class OpenwhydResultBody
{
    public static function call(OpenwhydContext $ctx): ?OpenwhydResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
