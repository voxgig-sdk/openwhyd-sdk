package voxgigopenwhydsdk

import (
	"github.com/voxgig-sdk/openwhyd-sdk/go/core"
	"github.com/voxgig-sdk/openwhyd-sdk/go/entity"
	"github.com/voxgig-sdk/openwhyd-sdk/go/feature"
	_ "github.com/voxgig-sdk/openwhyd-sdk/go/utility"
)

// Type aliases preserve external API.
type OpenwhydSDK = core.OpenwhydSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type OpenwhydEntity = core.OpenwhydEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type OpenwhydError = core.OpenwhydError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAuthenticationEntityFunc = func(client *core.OpenwhydSDK, entopts map[string]any) core.OpenwhydEntity {
		return entity.NewAuthenticationEntity(client, entopts)
	}
	core.NewGetUserPostEntityFunc = func(client *core.OpenwhydSDK, entopts map[string]any) core.OpenwhydEntity {
		return entity.NewGetUserPostEntity(client, entopts)
	}
	core.NewPlaylistEntityFunc = func(client *core.OpenwhydSDK, entopts map[string]any) core.OpenwhydEntity {
		return entity.NewPlaylistEntity(client, entopts)
	}
	core.NewPostEntityFunc = func(client *core.OpenwhydSDK, entopts map[string]any) core.OpenwhydEntity {
		return entity.NewPostEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.OpenwhydSDK, entopts map[string]any) core.OpenwhydEntity {
		return entity.NewSearchEntity(client, entopts)
	}
	core.NewSubscriptionEntityFunc = func(client *core.OpenwhydSDK, entopts map[string]any) core.OpenwhydEntity {
		return entity.NewSubscriptionEntity(client, entopts)
	}
	core.NewUserEntityFunc = func(client *core.OpenwhydSDK, entopts map[string]any) core.OpenwhydEntity {
		return entity.NewUserEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewOpenwhydSDK = core.NewOpenwhydSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
