package models

import "gorm.io/gorm"

// in this file we will define the user session model
type UserSession struct {
	gorm.Model
	UserID      string `gorm:"unique"`
	Email       string
	AccessToken string
	// Add any other fields you want to store
}
