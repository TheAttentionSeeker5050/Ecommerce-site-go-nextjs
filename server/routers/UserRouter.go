package routers

import (
	"workspace/controllers"
	"workspace/middlewares"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// router for user endpoints
func UserRouter(
	router *gin.RouterGroup,
	db *gorm.DB,
) *gin.RouterGroup {
	// define the user router
	userRouter := router.Group("/user")
	// define the user router endpoints
	userRouter.POST("/register", func(c *gin.Context) {
		controllers.RegisterController(c, db)
	})

	userRouter.POST("/login", func(c *gin.Context) {
		controllers.LoginController(c, db)
	})

	userRouter.POST("/logout", func(c *gin.Context) {
		controllers.LogoutController(c, db)
	})

	userRouter.Use(middlewares.TokenAuthMiddleware()).POST("/account/change-email", func(c *gin.Context) {
		controllers.ChangeEmailController(c, db)
	})

	userRouter.POST("/account/change-password", func(c *gin.Context) {
		controllers.ChangePasswordController(c, db)
	})

	userRouter.GET("/account", func(c *gin.Context) {
		controllers.GetAccountController(c, db)
	})

	return userRouter
}
