package routes

import (
	"github.com/gorilla/mux"
	"github.com/paresh23/go-bookstore-crud/pkg/controllers"
)

var RegisterBookStoreRoutes = func(router *mux.Router) {
	router.HandleFunc("/book", controllers.CreateBook).Methods("POST", "OPTIONS") // Handle OPTIONS
	router.HandleFunc("/book", controllers.GetBook).Methods("GET", "OPTIONS")
	router.HandleFunc("/book/{bookId}", controllers.GetBookById).Methods("GET", "OPTIONS")
	router.HandleFunc("/book/{bookId}", controllers.UpdateBook).Methods("PUT", "OPTIONS")
	router.HandleFunc("/book/{bookId}", controllers.DeleteBook).Methods("DELETE", "OPTIONS")
}
