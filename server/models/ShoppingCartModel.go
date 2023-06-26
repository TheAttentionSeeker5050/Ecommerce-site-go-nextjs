package models

// the model struct for the shopping cart

// define the model struct
type ShoppingCartItem struct {
	ID       uint    `gorm:"primary_key; auto_increment" json:"id"`
	User     User    `gorm:"foreignkey:ID; not null;" json:"user_id"`
	Product  Product `gorm:"foreignkey:ID; not null;" json:"product_id"`
	Quantity uint    `gorm:"not null;" json:"quantity"`
}
