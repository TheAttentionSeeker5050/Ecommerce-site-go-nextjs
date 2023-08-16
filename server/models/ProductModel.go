package models

import "gorm.io/gorm"

// create product model struct
type Product struct {
	gorm.Model
	ID                uint64          `gorm:"primary_key; auto_increment" json:"id"`
	Name              string          `gorm:"size:255;not null" json:"name"`
	Description       string          `gorm:"size:2000;not null" json:"description"`
	Price             float64         `gorm:"not null" json:"price"`
	ProductCategoryID int             // `gorm:"not null" json:"category_id"` // this is the category id
	ProductCategory   ProductCategory // `gorm:"foreign_key:ID;onDelete:CASCADE;" json:"category_id"`
	ProductPetTypeID  int             // `gorm:"not null" json:"pet_type_id"` // this is the pet type id
	ProductPetType    ProductPetType  // `gorm:"foreign_key:ID;onDelete:CASCADE;" json:"pet_type_id"`
	DiscountPercent   float32         `gorm:"default:0" json:"discount_percent"`                                                                                                               // we may change this later
	Image             string          `gorm:"size:400;not null; default: 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/2f42d007-fb4a-44e0-568b-e28824699000/public'" json:"product_image"` // this is the address we will take from cdn
	ImageAlt          string          `gorm:"size:400;not null; default:'Not found'" json:"product_image_alt"`
	OtherPromo        string          `gorm:"size:300;not null; default: 'Not found'" json:"other_promo"`
	Metadata          []Metadata      `gorm:"many2many:product_metadata;"`
}

type ProductUnit struct {
	gorm.Model
	ID        uint64  `gorm:"primaryKey; autoIncrement" json:"id"`
	ProductID Product `gorm:"foreignkey:ID; not null; onDelete:CASCADE" json:"product_id"`
	UnitStatus string  `gorm:"size:255; default:available not null" json:"unit_status"`
}

type ProductCategory struct {
	gorm.Model
	// ID                uint64 `gorm:"primary_key;auto_increment" json:"id"`
	CategoryName      string `gorm:"size:255;not null" json:"category_name"`
	UrlFormattedName  string `gorm:"size:255;not null" json:"url_formatted_name"`
	ImageThumbnailURL string `gorm:"size:255" json:"image_thumbnail_url"`
}

type ProductPetType struct {
	gorm.Model
	// ID                uint64 `gorm:"primary_key;auto_increment" json:"id"`
	PetName           string `gorm:"size:255;not null" json:"pet_name"`
	UrlFormattedName  string `gorm:"size:255;not null" json:"url_formatted_name"`
	ImageThumbnailURL string `gorm:"size:255" json:"image_thumbnail_url"`
}
