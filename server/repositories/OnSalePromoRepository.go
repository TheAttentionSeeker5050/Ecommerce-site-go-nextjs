package repositories

import (
	"workspace/models"

	"gorm.io/gorm"
)

type PromoRepository struct {
	DB *gorm.DB
}

func NewPromoRepository(db *gorm.DB) *PromoRepository {
	return &PromoRepository{
		DB: db,
	}
}

// our repo methods

// create a new sale promo 
func (promoRepo *PromoRepository) CreateNewPromo(promo *models.OnSalePromo) (*models.OnSalePromo, error) {
	// create the promo
	result := promoRepo.DB.Create(&promo)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the promo
	return promo, nil
}

// create a new sale promo item
func (promoRepo *PromoRepository) CreateNewPromoItem(promoItem *models.OnSalePromoItem) (*models.OnSalePromoItem, error) {
	// create the promo item
	result := promoRepo.DB.Create(&promoItem)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the promo item
	return promoItem, nil
}

// get a list of sale promos
func (promoRepo *PromoRepository) GetAllPromos(limit int, offset int) ([]*models.OnSalePromo, error) {
	// create a list of promos
	promos := []*models.OnSalePromo{}

	// make the query
	result := promoRepo.DB.Limit(limit).Offset(offset).Find(&promos)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the promos
	return promos, nil
}

// get all the promo items for a promo
func (promoRepo *PromoRepository) GetAllPromoItems(promoID int) ([]*models.OnSalePromoItem, error) {
	// create a list of promo items
	promoItems := []*models.OnSalePromoItem{}

	// make the query
	result := promoRepo.DB.Where("promo_id = ?", promoID).Find(&promoItems)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the promo items
	return promoItems, nil
}

// get a list of the products in a promo
func (promoRepo *PromoRepository) GetAllPromoProducts(promoID int) ([]*models.Product, error) {
	// create a list of products
	products := []*models.Product{}

	// use our repo function to get all the promo items
	promoItems, err := promoRepo.GetAllPromoItems(promoID)

	// check for errors
	if err != nil {
		return nil, err
	}

	// initiate the product repo
	productRepo := NewProductRepository(promoRepo.DB)

	// loop through the promo items
	for _, promoItem := range promoItems {
		// get the product
		product, err := productRepo.GetSingleProductByID(int(promoItem.ProductID))

		// check for errors
		if err != nil {
			return nil, err
		}

		// append the product to the list
		products = append(products, product)
	}

	// return the products
	return products, nil
	
}

// get a single promo
func (promoRepo *PromoRepository) GetSinglePromoByID(id int) (*models.OnSalePromo, error) {
	// create a promo
	promo := &models.OnSalePromo{}

	// get the promo
	result := promoRepo.DB.First(&promo, id)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the promo
	return promo, nil
}

// get a single promo item
func (promoRepo *PromoRepository) GetSinglePromoItemByID(id int) (*models.OnSalePromoItem, error) {
	// create a promo item
	promoItem := &models.OnSalePromoItem{}

	// get the promo item
	result := promoRepo.DB.First(&promoItem, id)

	// check for errors
	if result.Error != nil {
		return nil, result.Error
	}

	// return the promo item
	return promoItem, nil
}