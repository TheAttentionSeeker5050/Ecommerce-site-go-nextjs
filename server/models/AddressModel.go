package models

// create address model struct
type AddressModel struct {
	ID           uint64 `gorm:"primary_key;auto_increment" json:"id"`
	Street       string `gorm:"size:255;not null" json:"street"`
	City         string `gorm:"size:255;not null" json:"city"`
	State        string `gorm:"size:255;not null" json:"state"`
	Zip          string `gorm:"size:255;not null" json:"zip"`
	Country      string `gorm:"size:255;not null" json:"country"`
	UnitNumber   string `gorm:"size:255;not null" json:"unit_number"`
	ContactPhone string `gorm:"size:255;not null" json:"contact_phone"`
}
