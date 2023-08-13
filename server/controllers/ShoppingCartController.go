package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetShoppingCartItemsController(
	c *gin.Context,
	db *gorm.DB,
) {

	// get the user id from the context
	userID := c.GetString("id")

	

	// return a response
	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully got shopping cart",
	})
}

func UpdateShoppingCartItemsController(
	c *gin.Context,
	db *gorm.DB,
) {

	// return a response
	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully updated shopping cart",
	})
}