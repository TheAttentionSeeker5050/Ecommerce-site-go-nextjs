package models

import (
	"gorm.io/gorm"
)

// create user model struct

type User struct {
	gorm.Model
	ID               uint64 `gorm:"primary_key;auto_increment" json:"id"`
	FirstName        string `gorm:"size:255;not null" json:"first_name"`
	LastName         string `gorm:"size:255;not null" json:"last_name"`
	MiddleName       string `gorm:"size:255" json:"middle_name"`
	Email            string `gorm:"size:100;not null;unique" json:"email"`
	NeedsEmailUpdate bool   `gorm:"default:false" json:"needs_email_update"`
	GitHubUsername   string `gorm:"size:100" json:"github_username"`
	Password         string `gorm:"size:100;not null;" json:"password"`
	Phone            string `gorm:"size:100;not null;" json:"phone"`
	Provider         string `gorm:"size:100;" json:"provider"`
	Photo            string `gorm:"size:100;" json:"photo"`
	Role             string `gorm:"size:100;not null;default:customer" json:"role"`
	UpdatedAt        int64  `gorm:"autoUpdateTime" json:"updated_at"`
	CreatedAt        int64  `gorm:"autoCreateTime" json:"created_at"`
	PreferredAddress uint64 `gorm:"default:0" json:"preferred_address"`
}
