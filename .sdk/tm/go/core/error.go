package core

type OpenwhydError struct {
	IsOpenwhydError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewOpenwhydError(code string, msg string, ctx *Context) *OpenwhydError {
	return &OpenwhydError{
		IsOpenwhydError: true,
		Sdk:              "Openwhyd",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *OpenwhydError) Error() string {
	return e.Msg
}
