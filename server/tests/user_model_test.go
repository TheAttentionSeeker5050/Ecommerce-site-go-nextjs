package tests

import (
	"testing"
	"workspace/models"
	"workspace/repositories"
)

// declare a user model struct
var userData = &models.User{
	FirstName:  "Test",
	LastName:   "User",
	MiddleName: "T.",
	Email:      "test.user@gmail.com",
	Password:   "password",
	Phone:      "1234567890",
	Role:       "customer",
}

var userRepo *repositories.UserRepository

// create tests for the user model repositories using mock database
func TestCreateAndRetrieveUser(t *testing.T) {

	// initiate the user repository
	userRepo := repositories.NewUserRepository(db)

	// defer close user repository

	// create the user
	user, err := userRepo.CreateUser(userData)
	// check for errors
	if err != nil {
		t.Errorf("this is the error creating the user: %v\n", err)
		return
	}

	// check if the user is created
	if user.ID <= 0 {
		t.Errorf("this is the user: %v\n", user)
		return
	}

	// check if the user is created with the correct values
	if user.FirstName != userData.FirstName {
		t.Errorf("this is the user: %v\n", user)
		return
	}

	// check if the user is created with the correct values
	if user.LastName != userData.LastName {
		t.Errorf("this is the user: %v\n", user)
		return
	}

	// check if the user is created with the correct values
	if user.MiddleName != userData.MiddleName {
		t.Errorf("this is the user: %v\n", user)
		return
	}

	// check if the user is created with the correct values
	if user.Email != userData.Email {
		t.Errorf("this is the user: %v\n", user)
		return
	}

	// compare password with hashed password
	if err := userRepo.ComparePassword(user.Password, "password"); err != nil {
		t.Errorf("this is the error comparing the password: %v\n hashedPassword: %s \n password: %s\n", err, user.Password, "password")
		return
	}

	// change the password  ----------------------------------------------
	chPassUser, err := userRepo.ChangePassword(user, "newpassword")

	// check for errors
	if err != nil {
		t.Errorf(
			"this is the error changing the password: %v\n %v\n",
			err,
			chPassUser,
		)

		return
	}

	// compare password with hashed password
	if err := userRepo.ComparePassword(user.Password, "newpassword"); err != nil {
		t.Errorf("this is the error comparing the password: %v\n hashedPassword: %s \n password: %s\n", err, user.Password, "newpassword")

		return
	}

	// now edit the user data ----------------------------------------------

	// save the user
	updDataUser, err := userRepo.UpdateUser(user, int(user.ID))
	// check for errors
	if err != nil {
		t.Errorf("this is the error updating the user: %v\n", err)
		return
	}

	// check if the user is created with the correct values
	if updDataUser.FirstName != "Test2" {
		t.Errorf("this is the user: %v\n", user)
		return
	}

	// info that wasn't changed
	if updDataUser.LastName != userData.LastName {
		t.Errorf("this is the user: %v\n", user)
		return
	}

	// verify that the user id is not 1
	if updDataUser.ID != 1 {
		t.Errorf("this is the user: %v\n", user)
		return
	}

	// delete the user
	userRepo.DeleteUser(user)

}
