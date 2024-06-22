package routes

import (
	"github.com/gorilla/mux"
	"github.com/paresh23/go-bookstore-crud/pkg/controllers"
)

var UserRoutes = func(router *mux.Router) {
	router.HandleFunc("/user/signup", controllers.CreateUser).Methods("POST", "OPTIONS")
	router.HandleFunc("/user/login", controllers.LoginUser).Methods("POST", "OPTIONS")
}
