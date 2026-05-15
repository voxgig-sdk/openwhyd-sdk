package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAuthenticationEntityFunc func(client *OpenwhydSDK, entopts map[string]any) OpenwhydEntity

var NewGetUserPostEntityFunc func(client *OpenwhydSDK, entopts map[string]any) OpenwhydEntity

var NewPlaylistEntityFunc func(client *OpenwhydSDK, entopts map[string]any) OpenwhydEntity

var NewPostEntityFunc func(client *OpenwhydSDK, entopts map[string]any) OpenwhydEntity

var NewSearchEntityFunc func(client *OpenwhydSDK, entopts map[string]any) OpenwhydEntity

var NewSubscriptionEntityFunc func(client *OpenwhydSDK, entopts map[string]any) OpenwhydEntity

var NewUserEntityFunc func(client *OpenwhydSDK, entopts map[string]any) OpenwhydEntity

