package repositories

import (
	"workspace/models"

	"gorm.io/gorm"
)

type CategoryRepository struct {
	DB *gorm.DB
}

func NewCategoryRepository(db *gorm.DB) *CategoryRepository {
	return &CategoryRepository{
		DB: db,
	}
}

// get a list of categories
func (categoryRepo *CategoryRepository) GetAllCategories() ([]*models.ProductCategory, error) {
	// create a list of categories
	categories := []*models.ProductCategory{}
	// get the categories
	result := categoryRepo.DB.Find(&categories)
	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the categories
	return categories, nil
}

// get a list of pet types
func (categoryRepo *CategoryRepository) GetAllPetTypes() ([]*models.ProductPetType, error) {
	// create a list of pet types
	PetTypes := []*models.ProductPetType{}

	// get the pet types
	result := categoryRepo.DB.Find(&PetTypes)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the pet types
	return PetTypes, nil
}
