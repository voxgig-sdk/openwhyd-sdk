# Openwhyd SDK feature factory

from feature.base_feature import OpenwhydBaseFeature
from feature.test_feature import OpenwhydTestFeature


def _make_feature(name):
    features = {
        "base": lambda: OpenwhydBaseFeature(),
        "test": lambda: OpenwhydTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
