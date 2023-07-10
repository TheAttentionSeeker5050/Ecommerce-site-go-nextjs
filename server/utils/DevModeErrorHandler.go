package utils

import "github.com/gin-gonic/gin"

func ReturnErrorMessageOnDevMode(err error) string {
	// check if the server is in debug mode
	if gin.Mode() == gin.DebugMode {
		return err.Error()
	} else {
		return ""
	}
}
