package pack;

import java.util.List;

public class QuestionData {
    private String question;
    private int id;
    private List<AnswerData> answers;

    // Getters and setters
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

    public List<AnswerData> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AnswerData> answers) {
        this.answers = answers;
    }
}
