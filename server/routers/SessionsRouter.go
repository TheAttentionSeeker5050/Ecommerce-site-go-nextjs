package routers

import (
	"net/http"
	"workspace/controllers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// router for user endpoints
func SessionRouter(
	router *gin.Engine,
	db *gorm.DB,
) *gin.RouterGroup {
	// define the user router
	userRouter := router.Group("/sessions")
	// define the user router endpoints

	userRouter.GET("/oauth/github", func(c *gin.Context) {
		controllers.AuthCallbackController(c, db)
	})

	userRouter.POST("/logout", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, logout!",
		})
	})

	return userRouter
}
