package pack;

import java.util.List;

public class QuizzData {
    private String title;
    private List<QuestionData> questions;

    // Default constructor
    public QuizzData() {}

    // Parameterized constructor
    public QuizzData(String title, List<QuestionData> questions) {
        this.title = title;
        this.questions = questions;
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
}
