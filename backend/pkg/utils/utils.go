package utils

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

// ParseBody parses the JSON body of the request into the given struct.
func ParseBody(r *http.Request, x interface{}) error {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Printf("Error reading body: %v\n", err)
		return err
	}
	err = json.Unmarshal(body, x)
	if err != nil {
		fmt.Printf("Error unmarshaling JSON: %v\nBody: %s\n", err, body)
		return err
	}
	return nil
}
