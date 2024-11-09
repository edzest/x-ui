package models

import "strings"

type Question interface {
	CheckAnswer(selectedAnswers AnswerSet) (isCorrect bool, marks int)
}

type QuestionType string

const (
	MultiChoiceMultiSelect  QuestionType = "multi_choice_multi_select"
	MultiChoiceSingleSelect QuestionType = "multi_choice_single_select"
	MatchTheFollowing       QuestionType = "match_the_following"
)

type MultiChoiceMultiSelectQuestion struct {
	QuestionType   QuestionType        `json:"question_type"`
	Text           string              `json:"text"`
	Options        AnswerSet           `json:"options"`
	CorrectAnswers AnswerSet           `json:"correct_answers,omitempty"`
	Tags           map[string][]string `json:"tags"`
}

func (q MultiChoiceMultiSelectQuestion) CheckAnswer(selectedAnswers AnswerSet) (isCorrect bool, marks int) {
	if len(q.CorrectAnswers) != len(selectedAnswers) {
		return false, 0
	}
	for a := range selectedAnswers {
		if !q.CorrectAnswers.contains(a) {
			return false, 0
		}
	}
	return true, 1
}

type MultiChoiceSingleSelectQuestion struct {
	QuestionType   QuestionType        `json:"question_type"`
	Text           string              `json:"text"`
	Options        AnswerSet           `json:"options"`
	CorrectAnswers AnswerSet           `json:"correct_answers,omitempty"`
	Tags           map[string][]string `json:"tags"`
}

func (q MultiChoiceSingleSelectQuestion) CheckAnswer(selectedAnswers AnswerSet) (isCorrect bool, marks int) {
	if len(selectedAnswers) != 1 {
		return false, 0
	}
	for a := range selectedAnswers {
		if !q.CorrectAnswers.contains(a) {
			return false, 0
		}
	}
	return true, 1
}

type MatchTheFollowingQuestion struct {
	QuestionType   QuestionType        `json:"question_type"`
	Text           string              `json:"text"`
	Options        AnswerSet           `json:"options"` // match pairs are stored as key//value pairs
	CorrectAnswers AnswerSet           `json:"correct_answers,omitempty"`
	Tags           map[string][]string `json:"tags"`
}

const KEY_VALUE_SEPARATOR = "//"

func (q MatchTheFollowingQuestion) CheckAnswer(selectedAnswers AnswerSet) (isCorrect bool, marks int) {
	if len(selectedAnswers) != len(q.CorrectAnswers) {
		return false, 0
	}
	correctAnswerPairs := make(map[string]string)
	for a := range q.CorrectAnswers {
		// todo: handle errors
		pairs := strings.Split(a, KEY_VALUE_SEPARATOR)
		correctAnswerPairs[pairs[0]] = pairs[1]
	}

	for a := range selectedAnswers {
		pairs := strings.Split(a, KEY_VALUE_SEPARATOR)
		if correctAnswerPairs[pairs[0]] != pairs[1] {
			return false, 0
		}
	}
	return true, 1
}
