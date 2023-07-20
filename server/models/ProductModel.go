package models

import "gorm.io/gorm"

// create product model struct
type Product struct {
	gorm.Model
	ID          uint64  `gorm:"primary_key; auto_increment" json:"id"`
	Name        string  `gorm:"size:255;not null" json:"name"`
	Description string  `gorm:"size:2000;not null" json:"description"`
	Price       float64 `gorm:"not null" json:"price"`
	// category id is a foreign key of ProductCategoryModel
	Category ProductCategory `gorm:"foreignkey:ID; not null; onDelete:CASCADE" json:"category_id"`
	PetType  ProductPetType  `gorm:"foreignkey:ID; not null; onDelete:CASCADE" json:"pet_type_id"`
	// discount percent defaults to 0 if not set
	DiscountPercent float32    `gorm:"default:0" json:"discount_percent"`      // we may change this later
	Image           string     `gorm:"size:400;not null" json:"product_image"` // this is the address we will take from cdn
	ImageAlt        string     `gorm:"size:400;not null" json:"product_image_alt"`
	OtherPromo      string     `gorm:"size:300;not null" json:"other_promo"`
	Metadata        []Metadata `gorm:"foreignkey:ID; not null; onDelete:CASCADE" json:"metadata"`
}

type ProductUnit struct {
	gorm.Model
	ID        uint64  `gorm:"primaryKey; autoIncrement" json:"id"`
	ProductID Product `gorm:"foreignkey:ID; not null; onDelete:CASCADE" json:"product_id"`
}

type ProductCategory struct {
	gorm.Model
	ID   uint64 `gorm:"primary_key;auto_increment" json:"id"`
	Name string `gorm:"size:255;not null" json:"name"`
}

type ProductPetType struct {
	gorm.Model
	ID      uint64 `gorm:"primary_key;auto_increment" json:"id"`
	PetName string `gorm:"size:255;not null" json:"pet_name"`
}
