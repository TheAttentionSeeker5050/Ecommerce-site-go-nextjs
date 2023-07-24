package controllers

import (
	"net/http"
	"workspace/repositories"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// This controller will get a list of product categories

func GetAllProducts(
	c *gin.Context,
	db *gorm.DB,
) {
	// create a new product repository
	productRepo := repositories.NewProductRepository(db)

	// get the products, we will add filters and pagination later
	products, err := productRepo.GetAllProducts(
		25,
		0,
	)

	// check for errors
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			gin.H{
				"error": err.Error(),
			},
		)

		return
	}

	// return the products
	c.JSON(
		http.StatusOK,
		products,
	)
}
