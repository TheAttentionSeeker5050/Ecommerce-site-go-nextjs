package repositories

import (
	"workspace/models"

	"gorm.io/gorm"
)

type ProductRepository struct {
	DB *gorm.DB
}

func NewProductRepository(db *gorm.DB) *ProductRepository {
	return &ProductRepository{
		DB: db,
	}
}

// get a list of products
func (productRepo *ProductRepository) GetAllProducts(
	limit int,
	offset int,
) ([]*models.Product, error) {
	// create a list of products
	products := []*models.Product{}

	// get the products
	result := productRepo.DB.Limit(limit).Offset(offset).Find(&products)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the products
	return products, nil
}

// get a single product
func (productRepo *ProductRepository) GetSingleProduct(id uint64) (*models.Product, error) {
	// create a product
	product := &models.Product{}

	// get the product
	result := productRepo.DB.First(&product, id)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the product
	return product, nil
}

// get products by category
func (productRepo *ProductRepository) GetProductsByCategory(categoryID uint64) ([]*models.Product, error) {
	// create a list of products
	products := []*models.Product{}

	// get the products
	result := productRepo.DB.Where("product_category_id = ?", categoryID).Find(&products)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the products
	return products, nil
}

// get products by pet type
func (productRepo *ProductRepository) GetProductsByPetType(
	petTypeID uint64,
) ([]*models.Product, error) {
	// create a list of products
	products := []*models.Product{}

	// get the products
	result := productRepo.DB.Where("product_pet_type_id = ?", petTypeID).Find(&products)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the products
	return products, nil
}
