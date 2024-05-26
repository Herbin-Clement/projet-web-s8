package pack;

import java.util.List;

public class QuizzData {
    private String title;
    private List<QuestionData> questions;
    private String creatorUsername;

    // Default constructor
    public QuizzData() {}

    // Parameterized constructor
    public QuizzData(String title, List<QuestionData> questions) {
        this.title = title;
        this.questions = questions;
    }
    
    public QuizzData(String title, List<QuestionData> questions, String creatorUsername) {
        this.title = title;
        this.questions = questions;
        this.setCreatorUsername(creatorUsername);
    }

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<QuestionData> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionData> questions) {
        this.questions = questions;
    }

	public String getCreatorUsername() {
		return creatorUsername;
	}

	public void setCreatorUsername(String creatorUsername) {
		this.creatorUsername = creatorUsername;
	}
    
}

	
