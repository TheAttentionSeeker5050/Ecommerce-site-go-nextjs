package models

import "gorm.io/gorm"

// the model struct for the wishlist
type Wishlist struct {
	gorm.Model
	ID       uint64    `gorm:"primary_key;auto_increment" json:"id"`
	User     User      `gorm:"foreignkey:UserID;constraint:onDelete:CASCADE" json:"user"`
	UserID   uint64    `gorm:"not null;default:0" json:"user_id"`
	Name     string    `gorm:"size:255;not null" json:"name"`
	Products []Product `gorm:"many2many:wishlist_products; foreignKey:ID;" json:"products"`
}
