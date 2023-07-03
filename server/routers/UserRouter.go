package routers

import (
	"net/http"
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

	userRouter.GET("/auth/callback",
		// cors.New(
		// 	cors.Config{
		// 		AllowAllOrigins:  true,
		// 		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		// 		AllowHeaders:     []string{"no-cors", "Origin", "Authorization", "Content-Type", "Content-Length", "Access-Control-Allow-Origin"},
		// 		AllowCredentials: true,
		// 		MaxAge:           12,
		// 	}),
		func(c *gin.Context) {
			controllers.AuthCallbackController(c)
		})

	userRouter.POST("/logout", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, logout!",
		})
	})

	return userRouter
}
