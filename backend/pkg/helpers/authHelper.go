package helper

import (
	"errors"
	"net/http"

	"github.com/gorilla/mux"
)

func MatchUserTypeToId(r *http.Request, userId string) error {
	vars := mux.Vars(r)
	userType := r.Context().Value("user_type").(string)
	id := vars["id"]

	if userType == "USER" && id != userId {
		return errors.New("Unauthorized to access this resource!")
	}

	return nil
}
