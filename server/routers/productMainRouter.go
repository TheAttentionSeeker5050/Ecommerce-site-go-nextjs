package routers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ProductMainRouter(
	router *gin.RouterGroup,
	db *gorm.DB,
) *gin.RouterGroup {
	// define the product category router
	productCategoryRouter := router.Group("/")

	// define the product category router endpoints
	productCategoryRouter.GET("/", func(c *gin.Context) {
		c.JSON(
			http.StatusOK,
			gin.H{
				"message": "Hello, product list!",
			},
		)
	})

	return productCategoryRouter
}