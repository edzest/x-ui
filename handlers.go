package main

import (
	"encoding/json"
	"log"
	"net/http"

	_ "embed"

	"github.com/labstack/echo/v4"
	"org.edzest.exams/x/models"
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

func handleTest(c echo.Context) error {
	test := models.Test{
		Name: "Sample Test",
		Questions: []models.Question{
			models.MultiChoiceMultiSelectQuestion{
				QuestionType:   models.MultiChoiceMultiSelect,
				Text:           "Which of the following are programming languages?",
				Options:        models.NewAnswerSet("Python", "Java", "HTML", "CSS"),
				CorrectAnswers: models.NewAnswerSet("Python", "Java"),
				Tags:           map[string][]string{"difficulty": {"easy"}, "topic": {"programming"}},
			},
			models.MultiChoiceSingleSelectQuestion{
				QuestionType:   models.MultiChoiceSingleSelect,
				Text:           "What is the capital of France?",
				Options:        models.NewAnswerSet("Berlin", "Madrid", "Paris", "Rome"),
				CorrectAnswers: models.NewAnswerSet("Paris"),
				Tags:           map[string][]string{"difficulty": {"easy"}, "topic": {"geography"}},
			},
			models.MatchTheFollowingQuestion{
				QuestionType:   models.MatchTheFollowing,
				Text:           "Match the countries with their capitals",
				Options:        models.NewAnswerSet("USA//Washington", "UK//London", "Japan//Tokyo"),
				CorrectAnswers: models.NewAnswerSet("USA//Washington", "UK//London", "Japan//Tokyo"),
				Tags:           map[string][]string{"difficulty": {"easy"}, "topic": {"geography"}},
			},
		},
	}
	return c.JSON(http.StatusOK, test)
}
