# ProjectName SDK exists test

import pytest
from openwhyd_sdk import OpenwhydSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = OpenwhydSDK.test(None, None)
        assert testsdk is not None
