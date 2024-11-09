package core

import "org.edzest.exams/x/models"

func evaluateTest(test models.Test, answer_sheet models.AnswerSheet) models.ResultSheet {
	var marks int
	for i, q := range test.Questions {
		isCorrect, qMarks := q.CheckAnswer(answer_sheet.SelectedAnswers[i])
		if isCorrect {
			marks += qMarks
		}
	}
	return models.ResultSheet{
		Test:        test,
		AnswerSheet: answer_sheet,
		Marks:       marks,
	}
}
