# Openwhyd SDK feature factory

from openwhyd_sdk.feature.base_feature import OpenwhydBaseFeature
from openwhyd_sdk.feature.ratelimit_feature import OpenwhydRatelimitFeature
from openwhyd_sdk.feature.retry_feature import OpenwhydRetryFeature
from openwhyd_sdk.feature.test_feature import OpenwhydTestFeature
from openwhyd_sdk.feature.timeout_feature import OpenwhydTimeoutFeature


_FEATURES = {
    "base": lambda: OpenwhydBaseFeature(),
    "ratelimit": lambda: OpenwhydRatelimitFeature(),
    "retry": lambda: OpenwhydRetryFeature(),
    "test": lambda: OpenwhydTestFeature(),
    "timeout": lambda: OpenwhydTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
