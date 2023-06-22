package models

// create product category model struct
type ProductCategoryModel struct {
	ID   uint64 `gorm:"primary_key;auto_increment" json:"id"`
	Name string `gorm:"size:255;not null" json:"name"`
}
