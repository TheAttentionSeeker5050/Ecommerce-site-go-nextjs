package controllers

import (
	"net/http"
	"workspace/repositories"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// This controller will get a list of product categories
func GetProductCategoryList(c *gin.Context, db *gorm.DB) {
	// prepare the json response

	// initiate the product category repository
	productCategoryRepository := repositories.NewCategoryRepository(db)

	// use the repository to return all the product categories to a list, and catch any errors
	productCategoryList, err := productCategoryRepository.GetAllCategories()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":      err.Error(),
			"error type": "Cannot perform query to get all product categories using the repository methods",
		}) // we need to change this error message for a more user friendly app secure one
		return
	}

	// if no errors, return the list of product categories
	c.JSON(http.StatusOK,
		gin.H{
			"message":             "Request Successful",
			"productCategoryList": productCategoryList,
		})
	return
}

func GetPetTypeList(c *gin.Context, db *gorm.DB) {

	// initiate the pet type repository
	petTypeRepository := repositories.NewCategoryRepository(db)

	// use the repository to return all the pet types to a list, and catch any errors
	petTypeList, err := petTypeRepository.GetAllPetTypes()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":      err.Error(),
			"error type": "Cannot perform query to get all pet types using the repository methods",
		})
		return
	}

	// if no errors, return the list of pet types
	c.JSON(http.StatusOK,
		gin.H{
			"message":     "Request Successful",
			"petTypeList": petTypeList,
		})
	return

}
