package core

import (
	"testing"

	"org.edzest.exams/x/models"
)

func TestEvaluateTest(t *testing.T) {
	questions := []models.Question{
		models.MultiChoiceMultiSelectQuestion{
			QuestionType:   models.MultiChoiceMultiSelect,
			Text:           "Which of the following are programming languages?",
			Options:        models.NewAnswerSet("Python", "Java", "HTML", "CSS"),
			CorrectAnswers: models.NewAnswerSet("Python", "Java"),
		},
		models.MultiChoiceSingleSelectQuestion{
			QuestionType:   models.MultiChoiceSingleSelect,
			Text:           "What is the capital of France?",
			Options:        models.NewAnswerSet("Berlin", "Madrid", "Paris", "Rome"),
			CorrectAnswers: models.NewAnswerSet("Paris"),
		},
		models.MatchTheFollowingQuestion{
			QuestionType:   models.MatchTheFollowing,
			Text:           "Match the countries with their capitals",
			Options:        models.NewAnswerSet("USA//Washington", "UK//London", "Japan//Tokyo"),
			CorrectAnswers: models.NewAnswerSet("USA//Washington", "UK//London", "Japan//Tokyo"),
		},
	}

	test := models.Test{
		Questions: questions,
	}

	fullyCorrectAnswerSheet := models.AnswerSheet{
		SelectedAnswers: []models.AnswerSet{
			models.NewAnswerSet("Python", "Java"),
			models.NewAnswerSet("Paris"),
			models.NewAnswerSet("USA//Washington", "UK//London", "Japan//Tokyo"),
		},
	}

	partiallyCorrectAnswerSheet := models.AnswerSheet{
		SelectedAnswers: []models.AnswerSet{
			models.NewAnswerSet("Python", "Java"),
			models.NewAnswerSet("Paris"),
			models.NewAnswerSet("USA//Washington", "UK//London"),
		},
	}

	halfAttemptedAnswerSheet := models.AnswerSheet{
		SelectedAnswers: []models.AnswerSet{
			models.NewAnswerSet("Python", "Java"),
			models.NewAnswerSet(),
			models.NewAnswerSet("USA//Washington", "UK//London", "Japan//Tokyo"),
		},
	}

	tests := []struct {
		name        string
		answerSheet models.AnswerSheet
		marks       int
	}{
		{"Fully Correct Answer Sheet", fullyCorrectAnswerSheet, 3},
		{"Partially Correct Answer Sheet", partiallyCorrectAnswerSheet, 2},
		{"Half Attempted Answer Sheet", halfAttemptedAnswerSheet, 2},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resultSheet := evaluateTest(test, tt.answerSheet)
			if resultSheet.Marks != tt.marks {
				t.Errorf("Name = %v, got %v, want %v", tt.name, resultSheet.Marks, tt.marks)
			}
		})
	}

}
