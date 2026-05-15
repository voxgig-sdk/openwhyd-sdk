<?php
declare(strict_types=1);

// Openwhyd SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class OpenwhydMakeContext
{
    public static function call(array $ctxmap, ?OpenwhydContext $basectx): OpenwhydContext
    {
        return new OpenwhydContext($ctxmap, $basectx);
    }
}
