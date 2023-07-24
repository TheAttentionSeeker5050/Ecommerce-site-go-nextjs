package controllers

import (
	"fmt"
	"net/http"
	"strconv"
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
				"error-msg": err.Error(),
				"error":     "Could not find any products with the stated the criteria",
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

// get a product by id
func GetProductById(
	c *gin.Context,
	db *gorm.DB,
) {
	// get the product id formatted as an int
	productId := c.Param("id")

	queryset := c.Request.URL.Query()
	fmt.Printf("querySet: %v", queryset)

	productIdInt, err := strconv.Atoi(productId)
	if err != nil {
		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"error": "Invalid product id",
			},
		)
	}

	// create a new product repository
	productRepo := repositories.NewProductRepository(db)

	// get the product
	product, err := productRepo.GetSingleProductByID(productIdInt)

	// check for errors
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			gin.H{
				"error-msg": err.Error(),
				"error":     "Product not found",
			},
		)

		return
	}

	// return the product
	c.JSON(
		http.StatusOK,
		product,
	)
}
