package models

import (
	"github.com/jinzhu/gorm"
	"github.com/paresh23/go-bookstore-crud/pkg/config"
)

type Cart struct {
	gorm.Model
	UserID      int64  `json:"user_id"`
	BookID      int64  `json:"book_id"`
	Name        string `json:"name"`
	Author      string `json:"author"`
	Publication string `json:"publication"`
	Price       int64  `json:"price"`
}

func init() {
	db := config.GetDB()
	db.AutoMigrate(&Cart{})
}

func (c *Cart) CreateCartItem() *Cart {
	db := config.GetDB()
	db.NewRecord(c)
	db.Create(&c)
	return c
}

func GetAllCartItem(userID int64) []Cart {
	db := config.GetDB()
	var cartItems []Cart
	db.Where("user_id = ?", userID).Find(&cartItems)
	return cartItems
}

func DeleteCartItem(BookID int64) Cart {
	db := config.GetDB()
	var cartItem Cart
	db.Where("book_id = ?", BookID).Delete(&cartItem)
	return cartItem
}
