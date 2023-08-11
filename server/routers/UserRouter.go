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

	// define the account router, this router will be protected by the auth middleware
	// and will facilitate retrieving and updating user account information
	accountGroup := userRouter.Group("/account")
	accountGroup.Use(middlewares.TokenAuthMiddleware())

	accountGroup.POST("/change-email", func(c *gin.Context) {
		controllers.ChangeEmailController(c, db)
	})

	accountGroup.POST("/change-password", func(c *gin.Context) {
		controllers.ChangePasswordController(c, db)
	})

	accountGroup.GET("", func(c *gin.Context) {
		controllers.GetAccountController(c, db)
	})

	accountGroup.GET("/validate-token", func(c *gin.Context) {
		controllers.ValidateUserController(c, db)
	})

	return userRouter
}
