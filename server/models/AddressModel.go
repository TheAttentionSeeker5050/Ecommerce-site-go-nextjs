package models

import "gorm.io/gorm"

// create address model struct
type Address struct {
	gorm.Model
	ID           uint64 `gorm:"primary_key;auto_increment;" json:"id"`
	User         User   `gorm:"foreignkey:UserID;constraint:onDelete:CASCADE" json:"user"`
	UserID       uint64 `gorm:"not null;default:0" json:"user_id"`
	Street       string `gorm:"size:255;not null" json:"street"`
	City         string `gorm:"size:255;not null" json:"city"`
	State        string `gorm:"size:255;not null" json:"state"`
	Zip          string `gorm:"size:255;not null" json:"zip"`
	Country      string `gorm:"size:255;not null" json:"country"`
	UnitNumber   string `gorm:"size:255;not null" json:"unit_number"`
	ContactPhone string `gorm:"size:255;not null" json:"contact_phone"`
}
