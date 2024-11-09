package models

import "testing"

func TestMultiChoiceMultiSelectQuestion_checkAnswer(t *testing.T) {
	q := MultiChoiceMultiSelectQuestion{
		QuestionType:   MultiChoiceMultiSelect,
		Text:           "Which of the following are fruits botanically?",
		Options:        NewAnswerSet("Apple", "Banana", "Carrot", "Tomato"),
		CorrectAnswers: NewAnswerSet("Apple", "Banana", "Tomato"),
	}

	tests := []struct {
		name            string
		selectedAnswers AnswerSet
		correct         bool
		mark            int
	}{
		{"Correct Answers", NewAnswerSet("Apple", "Banana", "Tomato"), true, 1},
		{"Incorrect Answers", NewAnswerSet("Apple", "Banana", "Carrot"), false, 0},
		{"Extra Answers", NewAnswerSet("Apple", "Banana", "Tomato", "Carrot"), false, 0},
		{"Missing Answers", NewAnswerSet("Apple", "Banana"), false, 0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			correct, mark := q.CheckAnswer(tt.selectedAnswers)
			if correct != tt.correct && mark != tt.mark {
				t.Errorf("Name = %v, got (%v,%v), want (%v,%v)", tt.name, correct, mark, tt.correct, tt.mark)
			}
		})
	}
}

func TestMultiChoiceSingleSelectQuestion_checkAnswer(t *testing.T) {
	q := MultiChoiceSingleSelectQuestion{
		QuestionType:   MultiChoiceSingleSelect,
		Text:           "Which of the following is a fruit botanically?",
		Options:        NewAnswerSet("Apple", "Spinach", "Cauliflower", "Potato"),
		CorrectAnswers: NewAnswerSet("Apple"),
	}

	tests := []struct {
		name            string
		selectedAnswers AnswerSet
		correct         bool
		mark            int
	}{
		{"Correct Answer", NewAnswerSet("Apple"), true, 1},
		{"Incorrect Answer", NewAnswerSet("Spinach"), false, 0},
		{"Extra Answer", NewAnswerSet("Apple", "Spinach"), false, 0},
		{"Missing Answer", NewAnswerSet(), false, 0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			correct, mark := q.CheckAnswer(tt.selectedAnswers)
			if correct != tt.correct && mark != tt.mark {
				t.Errorf("Name = %v, got (%v,%v), want (%v,%v)", tt.name, correct, mark, tt.correct, tt.mark)
			}
		})
	}
}

func TestMatchTheFollowingQuestion_checkAnswer(t *testing.T) {
	q := MatchTheFollowingQuestion{
		QuestionType:   MatchTheFollowing,
		Text:           "Match the following programming languages with their creators",
		Options:        NewAnswerSet("Python//Guido van Rossum", "Ruby//Yukihiro Matsumoto", "Go//Robert Griesemer", "Rust//Graydon Hoare"),
		CorrectAnswers: NewAnswerSet("Python//Guido van Rossum", "Ruby//Yukihiro Matsumoto", "Go//Robert Griesemer", "Rust//Graydon Hoare"),
	}

	tests := []struct {
		name            string
		selectedAnswers AnswerSet
		correct         bool
		mark            int
	}{
		{"Correct Answers", NewAnswerSet("Python//Guido van Rossum", "Ruby//Yukihiro Matsumoto", "Go//Robert Griesemer", "Rust//Graydon Hoare"), true, 1},
		{"Incorrect Answers", NewAnswerSet("Python//Yukihiro Matsumoto", "Ruby//Guido van Rossum", "Go//Robert Griesemer", "Rust//Graydon Hoare"), false, 0},
		{"Extra Answers", NewAnswerSet("Python//Guido van Rossum", "Ruby//Yukihiro Matsumoto", "Go//Robert Griesemer", "Rust//Graydon Hoare", "C++//Bjarne Stroustrup"), false, 0},
		{"Missing Answers", NewAnswerSet("Python//Guido van Rossum", "Ruby//Yukihiro Matsumoto", "Go//Robert Griesemer"), false, 0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			correct, mark := q.CheckAnswer(tt.selectedAnswers)
			if correct != tt.correct && mark != tt.mark {
				t.Errorf("Name = %v, got (%v,%v), want (%v,%v)", tt.name, correct, mark, tt.correct, tt.mark)
			}
		})
	}
}
