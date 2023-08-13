package repositories

import (
	"workspace/models"

	"gorm.io/gorm"
)

type ShoppingCartRepository struct {
	DB *gorm.DB
}


func NewShoppingCartRepository(db *gorm.DB) *ShoppingCartRepository {
	return &ShoppingCartRepository{
		DB: db,
	}
}

// get a list of products in shopping cart per user id
func (shoppingCartRepo *ShoppingCartRepository) GetAllProductsInShoppingCart(
	userID string,
) ([]*models.ShoppingCartItem, error) {
	// create a list of products
	shoppingCartItems := []*models.ShoppingCartItem{}

	// now make the query
	result := shoppingCartRepo.DB.Where("user_id = ?", userID).Find(&shoppingCartItems)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the products
	return shoppingCartItems, nil
}

// update all items in shopping cart per user id
func (shoppingCartRepo *ShoppingCartRepository) UpdateAllItemsInShoppingCart(
	userID string,
	shoppingCartItems []*models.ShoppingCartItem,
) error {
	// update the shopping cart items belonging to the user and make sure that the ones not in the list are deleted
	result := shoppingCartRepo.DB.Where("user_id = ?", userID).Delete(&models.ShoppingCartItem{})
	if result.Error != nil {
		return result.Error
	}

	// now create the shopping cart items
	for _, shoppingCartItem := range shoppingCartItems {
		result := shoppingCartRepo.DB.Create(&shoppingCartItem)
		if result.Error != nil {
			return result.Error
		}
	}

	// return nil
	return nil

}

// get a single product by product id

// add a single item to the shopping cart
func (shoppingCartRepo *ShoppingCartRepository) AddSingleItemToShoppingCart(
	userID string,
	shoppingCartItem *models.ShoppingCartItem,
) error {
	// create the shopping cart item
	result := shoppingCartRepo.DB.Create(&shoppingCartItem)
	if result.Error != nil {
		return result.Error
	}

	// return nil
	return nil
}

// delete a single item from the shopping cart
func (shoppingCartRepo *ShoppingCartRepository) DeleteSingleItemFromShoppingCart(
	userID string,
	shoppingCartItemID int,
) error {
	// delete the shopping cart item
	result := shoppingCartRepo.DB.Where("user_id = ? AND id = ?", userID, shoppingCartItemID).Delete(&models.ShoppingCartItem{})
	if result.Error != nil {
		return result.Error
	}

	// return nil
	return nil
}

// update a single item in the shopping cart
func (shoppingCartRepo *ShoppingCartRepository) UpdateSingleItemInShoppingCart(
	userID string,
	shoppingCartItemID int,
	shoppingCartItem *models.ShoppingCartItem,
) error {
	// update the shopping cart item
	result := shoppingCartRepo.DB.Where("user_id = ? AND id = ?", userID, shoppingCartItemID).Updates(&shoppingCartItem)
	if result.Error != nil {
		return result.Error
	}

	// return nil
	return nil
}
