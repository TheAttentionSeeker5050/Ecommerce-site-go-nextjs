package routers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// router for user endpoints
func UserRouter(router *gin.Engine) *gin.RouterGroup {
	// define the user router
	userRouter := router.Group("/user")
	// define the user router endpoints
	userRouter.POST("/register", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, register!",
		})
	})

	userRouter.POST("/login", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, login!",
		})
	})

	userRouter.POST("/logout", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, logout!",
		})
	})

	return userRouter
}
