package routers

import (
	"workspace/controllers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// router for user endpoints
func UserRouter(
	router *gin.Engine,
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

	// userRouter.POST("/logout", func(c *gin.Context) {
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"message": "Hello, logout!",
	// 	})
	// })

	return userRouter
}
