<?php
declare(strict_types=1);

// Openwhyd SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class OpenwhydFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new OpenwhydBaseFeature();
            case "test":
                return new OpenwhydTestFeature();
            default:
                return new OpenwhydBaseFeature();
        }
    }
}
