package routers

import (
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
	})

	// this should be a GET request
	userRouter.GET("/oauth/google", func(c *gin.Context) {
		// controllers.GitHubAuthController(c, db)
		controllers.GoogleAuthController(c, db)
	})

	// // return a refresh token
	// userRouter.POST("/token-refresh", func(c *gin.Context) {
	// 	controllers.RefreshTokenController(c, db)
	// })

	return userRouter
}
