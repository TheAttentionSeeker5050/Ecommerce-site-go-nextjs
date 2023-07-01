package repositories

// the repository for the crud operations for the user model
import (
	"workspace/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// create a user repository struct
type UserRepository struct {
	DB *gorm.DB
}

// create a new user repository
func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{
		DB: db,
	}
}

// create a new user but hashing the password first
func (userRepo *UserRepository) CreateUser(user *models.User) (*models.User, error) {
	// hash the password using bcrypt using salt
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	// check for errors
	if err != nil {
		return nil, err
	}

	// assign the hashed password to the user password
	user.Password = string(hashedPassword)
	user.Role = "customer"
	// nullify the preferred address, addresses, and wishlists
	user.PreferredAddress = nil
	user.Addresses = nil
	user.Wishlists = nil

	// create the user
	result := userRepo.DB.Create(&user)
	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the user
	return user, nil
}

// run the beforeSave method before saving the user to validate if any errors
func (userRepo *UserRepository) BeforeSave(user *models.User) error {
	// hash the password using bcrypt using salt
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	// check for errors
	if err != nil {
		return err
	}

	// assign the hashed password to the user password
	user.Password = string(hashedPassword)

	// return nil
	return nil
}

// create a method to retrieve a user by id
func (userRepo *UserRepository) GetUserById(id uint64) (*models.User, error) {
	// create a user model
	user := &models.User{}

	// find the user by id
	result := userRepo.DB.First(&user, id)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the user
	return user, nil
}

// create a method to retrieve a user by email
func (userRepo *UserRepository) GetUserByEmail(email string) (*models.User, error) {
	// create a user model
	user := &models.User{}

	// find the user by email
	result := userRepo.DB.Where("email = ?", email).First(&user)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the user
	return user, nil
}

// method to compare the password with the hashed password
func (userRepo *UserRepository) ComparePassword(hashedPassword string, password string) error {
	// compare the password with the hashed password
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

// ---------------------------other methods--------------------------------

// update user data, but only information that is stated in the request
func (userRepo *UserRepository) UpdateUser(newUserData *models.User) (*models.User, error) {
	// // find user by id and save new data
	// result := userRepo.DB.Model(&models.User{}).Where("id = ?", userID).Updates(newUserData)

	// update the user
	result := userRepo.DB.Model(&newUserData).Where("id = ?", newUserData.ID).Updates(newUserData)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the user
	return newUserData, nil
}

// delete user data
func (userRepo *UserRepository) DeleteUser(user *models.User) (*models.User, error) {
	// delete the user
	result := userRepo.DB.Delete(&user)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the user
	return user, nil
}

// change user password but hashing the password first from username
func (userRepo *UserRepository) ChangePassword(user *models.User, password string) (*models.User, error) {
	// hash the password using bcrypt using salt
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	// check for errors
	if err != nil {
		return nil, err
	}

	// assign the hashed password to the user password
	user.Password = string(hashedPassword)

	// update the user
	result := userRepo.DB.Model(&user).Where("id = ?", user.ID).Update("password", user.Password)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the user
	return user, nil
}
