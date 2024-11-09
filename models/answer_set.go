package models

import (
	"encoding/json"
	"log"
)

type AnswerSet map[string]struct{}

func NewAnswerSet(a ...string) AnswerSet {
	s := make(AnswerSet)
	s.add(a...)
	return s
}

func (s AnswerSet) contains(a string) bool {
	if _, ok := s[a]; ok {
		return true
	}
	return false
}

func (s AnswerSet) add(a ...string) {
	for _, answer := range a {
		s[answer] = struct{}{}
	}
}

func (s AnswerSet) String() string {
	var answers string
	for a := range s {
		answers += a + ", "
	}
	return answers
}

func (s AnswerSet) MarshalJSON() ([]byte, error) {
	keys := make([]string, 0, len(s))
	for k := range s {
		keys = append(keys, k)
	}
	return json.Marshal(keys)
}

func (s AnswerSet) UnmarshalJSON(data []byte) error {
	var keys []string
	if err := json.Unmarshal(data, &keys); err != nil {
		return err
	}
	log.Println("keys", keys)
	s.add(keys...)
	log.Println("s", s)
	return nil
}
