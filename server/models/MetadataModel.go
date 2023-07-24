package models

import "gorm.io/gorm"

// the model struct for metadata
type Metadata struct {
	gorm.Model
	// ID uint64 `gorm:"primary_key; auto_increment" json:"id"`
	// Category                string `gorm:"size:255;not null; default:1" json:"category"` // food, treats, beds-and-furniture, grooming-and-fur-care, medicines, toys, collars-and-leashes, litter, habitat-supplies
	ProductCategoryID       int
	ProductCategory         ProductCategory
	FilterType              string `gorm:"size:255;not null" json:"filter_type"`
	URLFormattedFilterType  string `gorm:"size:255;not null" json:"url_formatted_filter_type"`
	FilterValue             string `gorm:"size:255;not null" json:"filter_value"`
	URLFormattedFilterValue string `gorm:"size:255;not null" json:"url_formatted_filter_value"`
}
