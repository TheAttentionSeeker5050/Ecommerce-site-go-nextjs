package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"workspace/repositories"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// some constants for the search criteria
const (
	SEARCH_BY_CATEGORY = "by_category"
	SEARCH_BY_PET_TYPE = "by_pet_type"
)

// This controller will get a list of product categories

func GetAllProducts(
	c *gin.Context,
	db *gorm.DB,
	// optional parameter search criteria
	searchCriteria string,
) {

	// create a new product repository
	productRepo := repositories.NewProductRepository(db)

	// get the products, we will add filters and pagination later
	products, err := productRepo.GetAllProducts(
		25,
		0,
	)

	// check if search criteria is by_category
	if searchCriteria == SEARCH_BY_CATEGORY {
		// get the name from the url params
		var productCategoryName string = c.Param("category_name")

		products, err = productRepo.GetProductsByCategory(productCategoryName)

	} else if searchCriteria == SEARCH_BY_PET_TYPE {
		// get the name
		petTypeName := c.Param("pet_type_name")

		products, err = productRepo.GetProductsByPetType(petTypeName)
	}

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
