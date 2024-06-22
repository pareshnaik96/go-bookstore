package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/paresh23/go-bookstore-crud/pkg/models"
)

var NewOrder models.Order

func CreateOrder(w http.ResponseWriter, r *http.Request) {
	CreateOrder := &models.Order{}
	// Parse the request body
	err := json.NewDecoder(r.Body).Decode(CreateOrder)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if CreateOrder.UserID == 0 {
		userIDStr := r.FormValue("user_id")
		if userIDStr != "" {
			userID, err := strconv.ParseInt(userIDStr, 10, 64)
			if err != nil {
				http.Error(w, "Invalid user_id", http.StatusBadRequest)
				return
			}
			CreateOrder.UserID = userID
		} else {
			http.Error(w, "user_id is required", http.StatusBadRequest)
			return
		}
	}
	c := CreateOrder.CreateOrder()
	res, _ := json.Marshal(c)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetAllOrder(w http.ResponseWriter, r *http.Request) {
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
	orders := models.GetAllOrders(userID)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(orders)
}
