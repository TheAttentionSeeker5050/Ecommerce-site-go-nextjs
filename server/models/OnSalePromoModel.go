package models

// the sale promotions model struct
type OnSalePromo struct {
	ID                  uint   `gorm:"primarykey" json:"id"`
	PromoName           string `json:"name"`
	PromoDescription    string `json:"description"`
	HighlightedDiscount string `json:"discount"`
	ImageURL            string `json:"image_url"`
	ImageAltText        string `json:"image_alt_text"`
}

// the sale promo items model struct
type OnSalePromoItem struct {
	ID        uint        `gorm:"primarykey" json:"id"`
	PromoID   OnSalePromo `gorm:"foreignkey:ID" json:"promo_id"`
	ProductID Product     `gorm:"foreignkey:ID" json:"product_id"`
	Discount  float32     `json:"discount"`
}
