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
			"",
		)
	})

	// browse products by category
	productCategoryRouter.GET("/by-category/:category_name", func(c *gin.Context) {
		// we will use our controller here, also add url query parameters (later)
		controllers.GetAllProducts(
			c,
			db,
			controllers.SEARCH_BY_CATEGORY,
		)
	})

	// browse products by pet type
	productCategoryRouter.GET("/by-pet-type/:pet_type_name", func(c *gin.Context) {
		// we will use our controller here, also add url query parameters (later)
		controllers.GetAllProducts(
			c,
			db,
			controllers.SEARCH_BY_PET_TYPE,
		)
	})

	productCategoryRouter.GET("/by-id/:id", func(c *gin.Context) {
		// we will use our controller here, also add url query parameters (later)
		controllers.GetProductById(
			c,
			db,
		)
	})

	return productCategoryRouter
}
