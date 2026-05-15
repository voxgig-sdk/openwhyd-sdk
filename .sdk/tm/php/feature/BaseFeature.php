<?php
declare(strict_types=1);

// Openwhyd SDK base feature

class OpenwhydBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(OpenwhydContext $ctx, array $options): void {}
    public function PostConstruct(OpenwhydContext $ctx): void {}
    public function PostConstructEntity(OpenwhydContext $ctx): void {}
    public function SetData(OpenwhydContext $ctx): void {}
    public function GetData(OpenwhydContext $ctx): void {}
    public function GetMatch(OpenwhydContext $ctx): void {}
    public function SetMatch(OpenwhydContext $ctx): void {}
    public function PrePoint(OpenwhydContext $ctx): void {}
    public function PreSpec(OpenwhydContext $ctx): void {}
    public function PreRequest(OpenwhydContext $ctx): void {}
    public function PreResponse(OpenwhydContext $ctx): void {}
    public function PreResult(OpenwhydContext $ctx): void {}
    public function PreDone(OpenwhydContext $ctx): void {}
    public function PreUnexpected(OpenwhydContext $ctx): void {}
}
