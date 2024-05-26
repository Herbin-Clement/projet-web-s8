package pack;

import java.util.List;

public class QuizzDataReview {
    private String title;
    private List<QuestionReview> questions;
    
    public QuizzDataReview(String title, List<QuestionReview> questions) {
        this.title = title;
        this.questions = questions;
    }
    
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public List<QuestionReview> getQuestions() {
		return questions;
	}
	public void setQuestions(List<QuestionReview> questions) {
		this.questions = questions;
	}

}