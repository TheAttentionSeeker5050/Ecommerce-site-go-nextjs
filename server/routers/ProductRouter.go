package routers

import (
	"workspace/controllers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ProductRouter(
	router *gin.RouterGroup,
	db *gorm.DB,
) *gin.RouterGroup {
	// define the product category router
	productCategoryRouter := router.Group("/products")

	// define the product category router endpoints
	productCategoryRouter.GET("/", func(c *gin.Context) {
		// we will use our controller here, also add url query parameters (later)
		controllers.GetAllProducts(
			c,
			db,
		)
	})

	return productCategoryRouter
}
