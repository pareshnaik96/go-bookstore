package models

import (
	"encoding/json"

	"github.com/jinzhu/gorm"
	"github.com/paresh23/go-bookstore-crud/pkg/config"
)

type Order struct {
	gorm.Model
	UserID    int64   `json:"user_id"`
	BookID    []int64 `json:"book_id" gorm:"-"`
	BookIDRaw string  `json:"-" gorm:"type:text"`
	Books     []Book  `json:"books" gorm:"-"`
}

func init() {
	db := config.GetDB()
	db.AutoMigrate(&Order{})
}

func (ord *Order) CreateOrder() *Order {
	db := config.GetDB()
	db.NewRecord(ord)
	db.Create(&ord)
	return ord
}

func (o *Order) BeforeCreate(scope *gorm.Scope) error {
	bookIDJSON, err := json.Marshal(o.BookID)
	if err != nil {
		return err
	}
	return scope.SetColumn("BookIDRaw", string(bookIDJSON))
}
func (o *Order) AfterFind() error {
	return json.Unmarshal([]byte(o.BookIDRaw), &o.BookID)
}

func GetAllOrders(userID int64) []Order {
	db := config.GetDB()
	var Orders []Order
	db.Where("user_id = ?", userID).Order("created_at desc").Find(&Orders)

	for i := range Orders {
		var books []Book
		for _, bookID := range Orders[i].BookID {
			book, _ := GetBookById(bookID)
			books = append(books, *book)
		}
		Orders[i].Books = books
	}

	return Orders
}
