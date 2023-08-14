package routers

import (
	"workspace/controllers"
	"workspace/middlewares"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)



func ShoppingCartRouter(
	router *gin.RouterGroup,
	db *gorm.DB,
) {
	// define the shopping cart router
	shoppingCartRoutes := router.Group("/cart")
	
	
	// add the auth middleware
	shoppingCartRoutes.Use(middlewares.TokenAuthMiddleware())

	// define the shopping cart routes
	// for getting the items in the shopping cart
	shoppingCartRoutes.GET("", func(c *gin.Context) {
		// use the controller in the shopping cart controller
		controllers.GetShoppingCartItemsController(c, db)
	})

	// for updating the items in the shopping cart
	shoppingCartRoutes.POST("", func(c *gin.Context) {
		// use the controller in the shopping cart controller
		controllers.UpdateShoppingCartItemsController(c, db)
	})

}