# Openwhyd SDK utility: make_context

from projectname_sdk.core.context import OpenwhydContext


def make_context_util(ctxmap, basectx):
    return OpenwhydContext(ctxmap, basectx)
