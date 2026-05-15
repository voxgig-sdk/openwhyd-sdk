# Openwhyd SDK utility: feature_add
module OpenwhydUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
