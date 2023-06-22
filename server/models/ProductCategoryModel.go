package models

import "gorm.io/gorm"

// create product category model struct
type ProductCategoryModel struct {
	gorm.Model
	ID   uint64 `gorm:"primary_key;auto_increment" json:"id"`
	Name string `gorm:"size:255;not null" json:"name"`
}
