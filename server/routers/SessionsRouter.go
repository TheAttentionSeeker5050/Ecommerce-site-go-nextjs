package routers

import (
	"net/http"
	"workspace/controllers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// router for user endpoints
func SessionRouter(
	router *gin.RouterGroup,
	db *gorm.DB,
) *gin.RouterGroup {
	// define the user router
	userRouter := router.Group("/sessions")
	// define the user router endpoints

	// this should be a GET request
	userRouter.GET("/oauth/github", func(c *gin.Context) {
		controllers.GitHubAuthController(c, db)
		// controllers.AuthCallbackController(c, db)
	})

	userRouter.POST("/logout", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, logout!",
		})
	})

	return userRouter
}
