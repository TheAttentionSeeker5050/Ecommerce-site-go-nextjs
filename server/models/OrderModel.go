package models

// the product order model struct
type Order struct {
	ID                  uint        `gorm:"primaryKey; auto_increment" json:"id"`
	OrderNumber         string      `json:"order_number"`
	OrderDate           string      `json:"order_date"`
	OrderStatus         string      `json:"order_status"`
	User                User        `gorm:"foreignkey:ID; not null; onDelete:CASCADE" json:"user_id"`
	DeliveryAddress     Address     `gorm:"foreignkey:ID; not null; onDelete:CASCADE" json:"delivery_address_id"`
	SubTotal            float32     `json:"sub_total"`
	ShippingFee         float32     `json:"shipping_fee"`
	Taxes               float32     `json:"taxes"`
	ExpectedArrivalDate string      `json:"expected_arrival_date"`
	ArrivalDate         string      `json:"arrival_date"`
	OrderItems          []OrderItem `gorm:"foreignkey:ID; not null; onDelete:CASCADE" json:"order_items"`
}

// the order item model struct
type OrderItem struct {
	ID        uint    `gorm:"primaryKey; auto_increment" json:"id"`
	ProductID Product `gorm:"foreignkey:ID; not null; onDelete:CASCADE" json:"product_id"`
	Quantity  uint    `json:"quantity"`
	UnitPrice float32 `json:"unit_price"`
	Discount  float32 `json:"discount"`
	// OrderID   Order   `gorm:"foreignkey:ID; not null; onDelete:CASCADE" json:"order_id"`
}
