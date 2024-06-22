package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/joho/godotenv"
	"github.com/paresh23/go-bookstore-crud/pkg/config"
	"github.com/paresh23/go-bookstore-crud/pkg/routes"
)

func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS") // Include OPTIONS
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" { // Handle preflight
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	config.Connect()
	r := mux.NewRouter()
	r.Use(CORSMiddleware) // Apply CORS middleware to the entire router
	routes.RegisterBookStoreRoutes(r)
	routes.RegisterCartRoutes(r)
	routes.RegisterOrderRoutes(r)
	routes.UserRoutes(r)

	log.Println("Starting server on http://localhost:", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
