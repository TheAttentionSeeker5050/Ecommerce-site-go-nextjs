package controllers

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"workspace/repositories"
)

func GetAccountController(
	c *gin.Context,
	db *gorm.DB,
) {

	// get the user id from the context
	userID := c.GetString("id")

	responseStruct := struct {
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		Email     string `json:"email"`
		Photo	 string `json:"photo"`
		NeedsEmailUpdate bool `json:"needs_email_update"`
	}{}
	// get the user from the database by id
	userRepo := repositories.NewUserRepository(db)
	user, err := userRepo.GetUserById(userID)



	// check for errors
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Something went wrong while getting the user from the database",
		})
		return
	}

	// set the response struct
	responseStruct.FirstName = user.FirstName
	responseStruct.LastName = user.LastName
	responseStruct.Email = user.Email
	responseStruct.Photo = user.Photo
	responseStruct.NeedsEmailUpdate = user.NeedsEmailUpdate

	// a dummy response for now
	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully got account",
		"first_name": responseStruct.FirstName,
		"last_name": responseStruct.LastName,
		"email": responseStruct.Email,
		"photo": responseStruct.Photo,
		"needs_email_update": responseStruct.NeedsEmailUpdate,
	})
}
