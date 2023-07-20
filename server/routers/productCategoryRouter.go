package routers

import (
	"workspace/controllers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ProductCategoryRouter(
	router *gin.RouterGroup,
	db *gorm.DB,
) *gin.RouterGroup {
	// define the product category router
	productCategoryRouter := router.Group("/category")

	// define the product category router endpoints
	// get a list of all categories
	productCategoryRouter.GET("/", func(c *gin.Context) {
		// use the product category controller
		controllers.GetProductCategoryList(c, db)
	})

	productCategoryRouter.GET("/pet-types", func(c *gin.Context) {
		// use the product category controller
		controllers.GetPetTypeList(c, db)
	})

	return productCategoryRouter
}
