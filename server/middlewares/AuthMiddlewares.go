package middlewares

import (
	"fmt"
	"net/http"
	"workspace/utils"

	"github.com/gin-gonic/gin"
)

func TokenAuthMiddleware() gin.HandlerFunc {
	// return anonymous function with auth middleware result as a return value
	return func(c *gin.Context) {
		// first get the refresh_token from the cookies
		refreshToken, err := c.Cookie("access_token")
		// check for errors
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Bad Request: No refresh token found",
			})
			c.Abort()
			return
		}

		// verify if the refresh token from cookies is empty
		if refreshToken == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Middleware error: Refresh token is empty",
			})
			c.Abort()
			return
		}

		// validate the refresh token
		tokenUserClaims, err := utils.ValidateJWT(refreshToken)
		// check for errors if no errors then the token is valid return success middleware
		if err == nil {
			// print the token claims to see the contents of it
			fmt.Println(tokenUserClaims)

			// bind the result to tokenClaims struct
			var tokenClaims utils.TokenClaims
			tokenClaims = tokenUserClaims

			// set the token email and user id in claims to the context
			c.Set("email", tokenClaims.Email)
			c.Set("id", tokenClaims.ID)
			c.Next()
			return
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{
				// "error": "Unauthorized: Invalid refresh token",
				"error": err.Error(),
			})
			c.Abort()
			return
		}

	}
}
