<?php
declare(strict_types=1);

// Openwhyd SDK utility: prepare_body

class OpenwhydPrepareBody
{
    public static function call(OpenwhydContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
