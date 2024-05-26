package pack;

import java.util.Collection;
import java.util.List;

public class QuestionResponse {
    private int id;
    private Collection<AnswerResponse> answers;

    // Default constructor
    public QuestionResponse() {}

    // Parameterized constructor
    public QuestionResponse(int id, Collection<AnswerResponse> answers) {
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

    public Collection<AnswerResponse> getAnswers() {
        return answers;
    }

    public void setAnswers(Collection<AnswerResponse> answers) {
        this.answers = answers;
    }
}
