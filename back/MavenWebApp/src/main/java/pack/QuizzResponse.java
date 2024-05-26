package pack;

import java.util.List;

public class QuizzResponse {
	private String username; 
    private String title;
    private List<QuestionResponse> questions;

    public QuizzResponse(String title, List<QuestionResponse> questions) {
    	this.title = title;
    	this.questions = questions;
    }
    
    public QuizzResponse(String username, String title, List<QuestionResponse> questions) {
        this.username = username;
        this.title = title;
        this.questions = questions;
    }
    
    // Getters and setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<QuestionResponse> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionResponse> questions) {
        this.questions = questions;
    }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}