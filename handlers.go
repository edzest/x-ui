package main

import (
	"encoding/json"
	"log"
	"net/http"

	_ "embed"

	"github.com/labstack/echo/v4"
)

//go:embed data/sample_test.json
var sampleTest []byte

type HealthCheck struct {
	Up string `json:"up"`
}

// base handler for health check
func handleIndex(c echo.Context) error {
	return c.JSON(http.StatusOK, HealthCheck{Up: "true"})
}

func handleGetTest(c echo.Context) error {
	var result map[string]interface{}
	if err := json.Unmarshal(sampleTest, &result); err != nil {
		log.Printf("Unable to parse sample test data: %v", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to parse sample test data"})
	}

	return c.JSON(http.StatusOK, result)
}
