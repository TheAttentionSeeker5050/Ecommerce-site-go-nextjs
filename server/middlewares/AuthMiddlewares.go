package middlewares

import (
	"net/http"
	"workspace/utils"
	"os"
	"fmt"

	"github.com/gin-gonic/gin"
)

func TokenAuthMiddleware() gin.HandlerFunc {
	// return anonymous function with auth middleware result as a return value
	return func(c *gin.Context) {
		// first get the refresh_token from the cookies
		accessToken, err := c.Cookie("access_token")
		// check for errors
		if err != nil || accessToken == "" {
			// delete cookies
			c.SetCookie("access_token", "", -1, "/", os.Getenv("COOKIE_DOMAIN"), false, true)
			c.SetCookie("refresh_token", "", -1, "/", os.Getenv("COOKIE_DOMAIN"), false, true)
			c.SetCookie("logged_in", "", -1, "/", os.Getenv("COOKIE_DOMAIN"), false, true)

			// return error response
			c.JSON(http.StatusUnauthorized, gin.H{ // status unauthorized
				"error": "Bad Request: Access token not found or is empty",
				"must_restore_session": true,
			})
			c.Abort()
			return
		}

		// log
		fmt.Println("Access token: ", accessToken)

		// validate the refresh token
		tokenUserClaims, err := utils.ValidateJWT(accessToken)
		// check for errors if no errors then the token is valid return success middleware
		if err == nil && tokenUserClaims.Email != "" && tokenUserClaims.ID != "" {
			// set the token email and user id in claims to the context
			// log
			fmt.Println("Access token validated successfully")
			c.Set("email", tokenUserClaims.Email)
			c.Set("id", tokenUserClaims.ID)
			c.Next()
			fmt.Println("email: ", c.GetString("email"))
			return
		} else {
			// delete cookies
			c.SetCookie("access_token", "", -1, "/", os.Getenv("COOKIE_DOMAIN"), false, true)
			c.SetCookie("refresh_token", "", -1, "/", os.Getenv("COOKIE_DOMAIN"), false, true)
			c.SetCookie("logged_in", "", -1, "/", os.Getenv("COOKIE_DOMAIN"), false, true)

			fmt.Println("Access token validation failed: ", err.Error())

			// return error response
			c.JSON(http.StatusForbidden, gin.H{
				"error": "Unauthorized: Invalid access token",
				"must_restore_session": true,
				// "error": err.Error(),
			})
			c.Abort()
			return
		}

	}
}
