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

// constants for the sort order
const (
	ASCENDING  = "asc"
	DESCENDING = "desc"
	BY_PRICE   = "price"
)

// get a list of products
func (productRepo *ProductRepository) GetAllProducts(
	limit int,
	offset int,
	sortOrder string,
	sortedBy string,
) ([]*models.Product, error) {
	// create a list of products
	products := []*models.Product{}

	// get sort string
	sortString := getSortedByString(sortedBy, sortOrder)

	// now make the query
	result := productRepo.DB.Order(sortString).Limit(limit).Offset(offset).Find(&products)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the products
	return products, nil
}

// get a single product
func (productRepo *ProductRepository) GetSingleProductByID(id int) (*models.Product, error) {
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
func (productRepo *ProductRepository) GetProductsByCategory(
	categoryName string,
	limit int,
	offset int,
	sortOrder string,
	sortedBy string,
) ([]*models.Product, error) {
	// create a list of products
	products := []*models.Product{}

	category := models.ProductCategory{}

	// find the category id from the name
	categoryQueryResult := productRepo.DB.Where("url_formatted_name = ?", categoryName).First(&category)
	if categoryQueryResult.Error != nil {
		return nil, categoryQueryResult.Error
	}

	// get the field ID value
	categoryID := category.ID

	// get sort string
	sortString := getSortedByString(sortedBy, sortOrder)

	// get the products
	productsQueryResult := productRepo.DB.Where("product_category_id = ?", categoryID).Order(sortString).Limit(limit).Offset(offset).Find(&products)

	// check for errors
	if productsQueryResult.Error != nil {
		return nil, productsQueryResult.Error
	}

	// return the products
	return products, nil
}

// get products by pet type
func (productRepo *ProductRepository) GetProductsByPetType(
	petName string,
	limit int,
	offset int,
	sortOrder string,
	sortedBy string,
) ([]*models.Product, error) {
	// create a product list struct
	products := []*models.Product{}

	// create a pet type struct
	petType := models.ProductPetType{}

	// find the pet type id from the name
	petTypeQueryResult := productRepo.DB.Where("url_formatted_name = ?", petName).First(&petType)

	// check for errors
	if petTypeQueryResult.Error != nil {
		return nil, petTypeQueryResult.Error
	}

	// get the field ID value
	petTypeID := petType.ID

	// get sort string
	sortString := getSortedByString(sortedBy, sortOrder)

	// get the products
	result := productRepo.DB.Where("product_pet_type_id = ?", petTypeID).Order(sortString).Limit(limit).Offset(offset).Find(&products)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the products
	return products, nil
}

func getSortedByString(sortedBy string, sortOrder string) string {
	// first get the sort order
	sortString := ""
	switch sortedBy {
	case BY_PRICE:
		sortString = "price"
	default:
		sortString = "id" /// we will add something like popularity later
	}

	// get the sort order
	switch sortOrder {
	case ASCENDING:
		sortString += " asc"
	case DESCENDING:
		sortString += " desc"
	default:
		sortString += " asc"
	}

	return sortString
}
