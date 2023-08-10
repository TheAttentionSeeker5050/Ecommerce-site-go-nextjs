package controllers

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAccountController(
	c *gin.Context,
	db *gorm.DB,
) {
	// a dummy response for now
	c.JSON(200, gin.H{
		"message": "Successfully got account",
	})
}
