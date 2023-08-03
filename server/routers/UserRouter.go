package routers

import (
	"workspace/controllers"

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

	return userRouter
}
