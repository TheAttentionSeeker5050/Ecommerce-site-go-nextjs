package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllPromosWithItems (
	c *gin.Context,
	db *gorm.DB,
) {
	// return json response
	c.JSON(
		http.StatusOK,
		gin.H{
			"message": "Get all promos with items",
		},
	)


}

func GetAllPromos (
	c *gin.Context,
	db *gorm.DB,
) {
	// return json response
	c.JSON(
		http.StatusOK,
		gin.H{
			"message": "Get all promos",
		},
	)
}

func GetItemById (
	c *gin.Context,
	db *gorm.DB,
) {
	// return json response
	c.JSON(
		http.StatusOK,
		gin.H{
			"message": "Get promo item by id",
		},
	)
}
