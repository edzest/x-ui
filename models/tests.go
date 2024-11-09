package models

import (
	"time"
)

type Test struct {
	Name      string     `json:"name"`
	Questions []Question `json:"questions"`
}

type AnswerSheet struct {
	StudentRollNo   string      `json:"student_roll_no"`
	TestName        string      `json:"test_name"`
	TakenAt         time.Time   `json:"taken_at"`
	SelectedAnswers []AnswerSet `json:"selected_answers"`
}

type ResultSheet struct {
	Test        `json:"test"`
	AnswerSheet `json:"answer_sheet"`
	Marks       int `json:"marks"`
}
