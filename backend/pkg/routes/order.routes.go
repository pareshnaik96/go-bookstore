package routes

import (
	"github.com/gorilla/mux"
	"github.com/paresh23/go-bookstore-crud/pkg/controllers"
)

var RegisterOrderRoutes = func(router *mux.Router) {
	router.HandleFunc("/order", controllers.CreateOrder).Methods("POST", "OPTIONS")
	router.HandleFunc("/order/{userId}", controllers.GetAllOrder).Methods("GET", "OPTIONS")
}
