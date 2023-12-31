package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"workspace/models"
	"workspace/repositories"
	"strconv"
	"fmt"
)

// create a new shopping cart return structure, it will be { productId:int, productPrice:float, productName:string, quantity:int }
type ShoppingCartItemsReturnStruct struct {
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

	fmt.Println("shoppingCartItems: ", shoppingCartItems)
	
	if err != nil {
		fmt.Println("error on retrieving shopping cart items: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to get shopping cart items",
		})
		return
	}

	// declare a new list of our NewShoppingCartItemsReturnStruct
	shoppingCartItemsReturnStruct := []*ShoppingCartItemsReturnStruct{}

	// call the product repository
	productRepo := repositories.NewProductRepository(db)

	// now loop through the shopping cart items and add them to the list
	for _, shoppingCartItem := range shoppingCartItems {
		// get the product from the database using the repository
		product, _ := productRepo.GetSingleProductByID(shoppingCartItem.ProductID)

		// append the shopping cart item to the list 
		shoppingCartItemsReturnStruct = append(shoppingCartItemsReturnStruct, &ShoppingCartItemsReturnStruct{
			ProductID: shoppingCartItem.ProductID,
			ProductPrice: product.Price,
			ProductName: product.Name,
			Quantity: shoppingCartItem.Quantity,
		})

	}

	

	// return a response
	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully got shopping cart",
		"shoppingCartItems": shoppingCartItemsReturnStruct,
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
			"error": "Failed to bind request body",
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
			"error": "Failed to update shopping cart items",
		})
		return
	}


	// return a response
	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully updated shopping cart",
	})
}