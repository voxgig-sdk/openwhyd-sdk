# Openwhyd SDK utility: make_context

from core.context import OpenwhydContext


def make_context_util(ctxmap, basectx):
    return OpenwhydContext(ctxmap, basectx)
