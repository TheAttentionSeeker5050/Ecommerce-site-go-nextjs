package models

// the sale promotions model struct
type OnSalePromo struct {
	ID                  uint   `gorm:"primarykey" json:"id"`
	PromoName           string `json:"name"`
	PromoDescription    string `json:"description"`
	HighlightedDiscount string `json:"discount"`
	ImageURL            string `json:"image_url"`
	ImageAltText        string `json:"image_alt_text"`
	PromoItems          []OnSalePromoItem `json:"promo_items" gorm:"foreignkey:ID; not null; onDelete:CASCADE"`
}

// the sale promo items model struct
type OnSalePromoItem struct {
	ID        uint        `gorm:"primarykey;" json:"id"`
	PromoID   uint ` json:"promo_id"`
	ProductID uint ` json:"product_id"`
	Product   Product    
	Discount  float32     `json:"discount"`
}
