package utils

// in this file are all the session data, cookie etc handlers on the server side

import (
	// "fmt"
	// "net/http"
	"os"
	// "time"
	"github.com/gin-gonic/gin"
)

func SetCookieWithHandler(
	name string,
	value string,
	isProduction bool,
	c *gin.Context,

) {
	// set the cookie
	if isProduction {
		c.SetCookie(name, value, 3600, "/", os.Getenv("COOKIE_DOMAIN"), true, true)
	} else {
		c.SetCookie(name, value, 3600, "/", os.Getenv("COOKIE_DOMAIN"), false, false)
	}
}

// get secure cookie val
func GetSecureCookie(
	isProduction bool,
) bool {
	if isProduction {
		return true
	} else {
		return false
	}
}

func GetHttpOnlyCookie(
	isProduction bool,
) bool {
	if isProduction {
		return true
	} else {
		return false
	}
}

