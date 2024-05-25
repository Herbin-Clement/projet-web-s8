package pack;

public class AnswerData {
    private String text;
    private int id;
    private boolean ok;

    // Default constructor
    public AnswerData() {}

    // Parameterized constructor
    public AnswerData(String text, int id, boolean ok) {
        this.text = text;
        this.id = id;
        this.ok = ok;
    }

    // Getters and Setters
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isOk() {
        return ok;
    }

    public void setOk(boolean ok) {
        this.ok = ok;
    }
}
