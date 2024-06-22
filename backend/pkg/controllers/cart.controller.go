package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/paresh23/go-bookstore-crud/pkg/models"
)

var NewCart models.Cart

func CreateCart(w http.ResponseWriter, r *http.Request) {
	CreateCart := &models.Cart{}
	// Parse the request body
	err := json.NewDecoder(r.Body).Decode(CreateCart)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	// Check if user_id is present in JSON body
	if CreateCart.UserID == 0 {
		// Try to extract user_id from form values
		userIDStr := r.FormValue("user_id")
		if userIDStr != "" {
			userID, err := strconv.ParseInt(userIDStr, 10, 64)
			if err != nil {
				http.Error(w, "Invalid user_id", http.StatusBadRequest)
				return
			}
			CreateCart.UserID = userID
		} else {
			http.Error(w, "user_id is required", http.StatusBadRequest)
			return
		}
	}
	// Create the cart item
	c := CreateCart.CreateCartItem()
	res, _ := json.Marshal(c)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetCart(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userIDStr := vars["userId"]
	if userIDStr == "" {
		http.Error(w, "userID is required", http.StatusBadRequest)
		return
	}
	userID, err := strconv.ParseInt(userIDStr, 10, 64)
	if err != nil {
		http.Error(w, "Invalid userID", http.StatusBadRequest)
		return
	}
	cartItems := models.GetAllCartItem(userID)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cartItems)
}

func RemoveCartItem(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r) //extracts variables
	bookId := vars["bookId"]
	BookID, err := strconv.ParseInt(bookId, 0, 0)
	if err != nil {
		fmt.Println("error while parsing")
	}
	book := models.DeleteCartItem(BookID)
	res, _ := json.Marshal(book)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
