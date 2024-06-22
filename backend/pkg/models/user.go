package models

import (
	"errors"

	"github.com/jinzhu/gorm"
	"github.com/paresh23/go-bookstore-crud/pkg/config"
)

type User struct {
	gorm.Model
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Phone     int64  `json:"phone"`
	Password  string `json:"password"`
	UserType  string `json:"user_type"`
	Token     string `json:"token"`
}

func init() {
	db := config.GetDB()
	db.AutoMigrate(&User{})
}

func (user *User) CreateUser() *User {
	db := config.GetDB()
	db.NewRecord(user)
	db.Create(&user)
	return user
}

func GetUserByUserEmail(email string) (*User, error) {
	db := config.GetDB()
	var user User
	result := db.Where("email = ?", email).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("user not found")
		}
		return nil, result.Error
	}
	return &user, nil
}

func (u *User) CheckPassword(password string) bool {
	return u.Password == password
}
