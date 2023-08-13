package models

// the model struct for the shopping cart

// define the model struct
type ShoppingCartItem struct {
	ID       uint    `gorm:"primary_key; auto_increment" json:"id"`
	UserID   int  `gorm:"not null" json:"user_id"`
	User     User    
	ProductID int  `gorm:"not null" json:"product_id"`
	Product  Product 
	Quantity int    `gorm:"not null;" json:"quantity"`
}
