package pack;

import java.util.List;

public class QuestionReview {
    private String question;
    private int id;
    private List<AnswerReview> answers;
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public List<AnswerReview> getAnswers() {
		return answers;
	}
	public void setAnswers(List<AnswerReview> answers) {
		this.answers = answers;
	}
}
