package pack;

import java.util.List;

public class QuestionResponse {
    private int id;
    private List<AnswerResponse> answers;

    // Default constructor
    public QuestionResponse() {}

    // Parameterized constructor
    public QuestionResponse(int id, List<AnswerResponse> answers) {
        this.id = id;
        this.answers = answers;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<AnswerResponse> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AnswerResponse> answers) {
        this.answers = answers;
    }
}
