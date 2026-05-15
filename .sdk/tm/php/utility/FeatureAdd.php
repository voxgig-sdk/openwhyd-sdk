<?php
declare(strict_types=1);

// Openwhyd SDK utility: feature_add

class OpenwhydFeatureAdd
{
    public static function call(OpenwhydContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
