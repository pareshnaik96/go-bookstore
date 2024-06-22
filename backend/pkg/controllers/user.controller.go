package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/paresh23/go-bookstore-crud/pkg/models"
	"github.com/paresh23/go-bookstore-crud/pkg/utils"
)

var NewUser models.User

func CreateUser(w http.ResponseWriter, r *http.Request) {
	CreateUser := &models.User{}
	utils.ParseBody(r, CreateUser)
	c := CreateUser.CreateUser()
	res, _ := json.Marshal(c)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

type Response struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	User    models.User `json:"user"`
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	var credentials models.User
	err := utils.ParseBody(r, &credentials)
	if err != nil {
		response := Response{Status: http.StatusBadRequest, Message: "Invalid request"}
		res, _ := json.Marshal(response)
		w.WriteHeader(http.StatusBadRequest)
		w.Write(res)
		return
	}
	user, err := models.GetUserByUserEmail(credentials.Email)
	if err != nil {
		response := Response{Status: http.StatusNotFound, Message: "User not found"}
		res, _ := json.Marshal(response)
		w.WriteHeader(http.StatusNotFound)
		w.Write(res)
		return
	}
	if !user.CheckPassword(credentials.Password) {
		response := Response{Status: http.StatusUnauthorized, Message: "Invalid credentials"}
		res, _ := json.Marshal(response)
		w.WriteHeader(http.StatusUnauthorized)
		w.Write(res)
		return
	}
	response := Response{Status: http.StatusOK, Message: "Login successful", User: *user}
	res, _ := json.Marshal(response)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
