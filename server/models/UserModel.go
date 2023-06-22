package models

import "time"

// create user model struct

type UserModel struct {
	ID               uint64       `gorm:"primary_key;auto_increment" json:"id"`
	FirstName        string       `gorm:"size:255;not null" json:"first_name"`
	LastName         string       `gorm:"size:255;not null" json:"last_name"`
	MiddleName       string       `gorm:"size:255;not null" json:"middle_name"`
	Email            string       `gorm:"size:100;not null;unique" json:"email"`
	Password         string       `gorm:"size:100;not null;" json:"password"`
	Phone            string       `gorm:"size:100;not null;" json:"phone"`
	Role             string       `gorm:"size:100;not null;" json:"role"`
	UserSince        time.Time    `gorm:"default:CURRENT_TIMESTAMP" json:"user_since"`
	LastUpdate       time.Time    `gorm:"default:CURRENT_TIMESTAMP" json:"last_update"`
	PreferredAddress AddressModel `gorm:"foreignkey:PreferredAddressID" json:"preferred_address"` // this is a foreign key relationship
}
