package models

import (
	"time"

	"gorm.io/gorm"
)

// create user model struct

type UserModel struct {
	gorm.Model
	ID               uint64       `gorm:"primary_key;auto_increment" json:"id"`
	FirstName        string       `gorm:"size:255;not null" json:"first_name"`
	LastName         string       `gorm:"size:255;not null" json:"last_name"`
	MiddleName       string       `gorm:"size:255;not null" json:"middle_name"`
	Email            string       `gorm:"size:100;not null;unique" json:"email"`
	Password         string       `gorm:"size:100;not null;" json:"password"`
	Phone            string       `gorm:"size:100;not null;" json:"phone"`
	Role             string       `gorm:"size:100;not null;" json:"role"`
	UserSince        time.Time    `json:"user_since"`
	LastUpdate       time.Time    `json:"last_update"`
	PreferredAddress AddressModel `gorm:"foreignkey:ID" json:"preferred_address"` // this is a foreign key relationship
}
