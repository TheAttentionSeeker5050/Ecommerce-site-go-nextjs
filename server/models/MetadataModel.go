package models

// the model struct for metadata
type Metadata struct {
	ID          uint64 `gorm:"primary_key; auto_increment" json:"id"`
	Category    string `gorm:"size:255;not null" json:"category"`
	FilterType  string `gorm:"size:255;not null" json:"filter_type"`
	FilterValue string `gorm:"size:255;not null" json:"filter_value"`
}
