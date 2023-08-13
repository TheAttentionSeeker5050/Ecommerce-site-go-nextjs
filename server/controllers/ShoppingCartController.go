package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"workspace/models"
	"workspace/repositories"
	"strconv"
)

// create a new shopping cart return structure, it will be { productId:int, productPrice:float, productName:string, quantity:int }
type NewShoppingCartItem struct {
	ProductID int `json:"productId"`
	ProductPrice float64 `json:"productPrice"`
	ProductName string `json:"productName"`
	Quantity int `json:"quantity"`
}



func GetShoppingCartItemsController(
	c *gin.Context,
	db *gorm.DB,
) {

	// get the user id from the context
	userID := c.GetString("id")

	// get the shopping cart items from the database using the repository
	shoppingCartRepo := repositories.NewShoppingCartRepository(db)
	shoppingCartItems, err := shoppingCartRepo.GetAllProductsInShoppingCart(userID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to get shopping cart items",
			"error": err.Error(),
		})
		return
	}

	

	// return a response
	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully got shopping cart",
		"shoppingCartItems": shoppingCartItems,
	})
}

func UpdateShoppingCartItemsController(
	c *gin.Context,
	db *gorm.DB,
) {

	// get the user id from the context
	userID := c.GetString("id")

	// get the shopping cart items from the request body
	var shoppingCartItems []*models.ShoppingCartItem

	// bind the request body to the shopping cart items
	err := c.BindJSON(&shoppingCartItems)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to bind request body",
			"error": err.Error(),
		})
		return
	}

	// convert the user id to an int
	userIDInt, _ := strconv.Atoi(userID)

	// add the user id to the shopping cart items
	for _, shoppingCartItem := range shoppingCartItems {
		shoppingCartItem.UserID = userIDInt
	}

	// update the shopping cart items using the repository
	shoppingCartRepo := repositories.NewShoppingCartRepository(db)
	err = shoppingCartRepo.UpdateAllItemsInShoppingCart(userID, shoppingCartItems)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to update shopping cart items",
		})
		return
	}


	// return a response
	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully updated shopping cart",
	})
}