package routers

import (
	"workspace/controllers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// router for promo endpoints
func PromoRouter(
	router *gin.RouterGroup,
	db *gorm.DB,
) *gin.RouterGroup {
	// define the promo router
	promoRouter := router.Group("/promos")
	// define the promo router endpoints

	// this should be a GET request
	promoRouter.GET("/", func(c *gin.Context) {
		controllers.GetAllPromos(c, db)
	})

	// this should be a GET request
	promoRouter.GET("/items/:id", func(c *gin.Context) {
		controllers.GetItemById(c, db)
	})

	// this should be a GET request
	promoRouter.GET("/promos-items", func(c *gin.Context) {
		controllers.GetAllPromosWithItems(c, db)
	})

	return promoRouter
}
