<?php
declare(strict_types=1);

// Openwhyd SDK utility: result_headers

class OpenwhydResultHeaders
{
    public static function call(OpenwhydContext $ctx): ?OpenwhydResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
