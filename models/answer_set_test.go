package models

import (
	"encoding/json"
	"testing"
)

func TestUnmarshalJSON(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected AnswerSet
	}{
		{
			"Empty AnswerSet",
			"[]",
			NewAnswerSet(),
		},
		{
			"Single AnswerSet",
			`["Python"]`,
			NewAnswerSet("Python"),
		},
		{
			"Multiple AnswerSet",
			`["Python", "Java", "C++"]`,
			NewAnswerSet("Python", "Java", "C++"),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s := make(AnswerSet)
			if err := json.Unmarshal([]byte(tt.input), &s); err != nil {
				t.Errorf("got error %v", err)
			}
			t.Logf("s = %v; len(s)=%v", s, len(s))
			for k := range tt.expected {
				if _, ok := s[k]; !ok {
					t.Errorf("expected key %v not found", k)
				}
			}
		})
	}
}

func TestMarshalJSON(t *testing.T) {
	tests := []struct {
		name     string
		input    AnswerSet
		expected string
	}{
		{
			name:     "multiple answers",
			input:    NewAnswerSet("answer1", "answer2", "answer3"),
			expected: `["answer1","answer2","answer3"]`,
		},
		{
			name:     "empty set",
			input:    NewAnswerSet(),
			expected: `[]`,
		},
		{
			name:     "single answer",
			input:    NewAnswerSet("singleAnswer"),
			expected: `["singleAnswer"]`,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			data, err := json.Marshal(tt.input)
			if err != nil {
				t.Errorf("got error %v", err)
			}
			if string(data) != tt.expected {
				t.Errorf("expected %s, got %s", tt.expected, data)
			}
		})
	}
}
