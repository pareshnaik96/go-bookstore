package routes

import (
	"github.com/gorilla/mux"
	"github.com/paresh23/go-bookstore-crud/pkg/controllers"
)

var RegisterCartRoutes = func(router *mux.Router) {
	router.HandleFunc("/cart", controllers.CreateCart).Methods("POST", "OPTIONS")
	router.HandleFunc("/cart/{userId}", controllers.GetCart).Methods("GET", "OPTIONS")
	router.HandleFunc("/cart/{bookId}", controllers.RemoveCartItem).Methods("DELETE", "OPTIONS")
}
