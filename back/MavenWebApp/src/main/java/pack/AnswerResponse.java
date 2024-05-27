package pack;

public class AnswerResponse {
    private int id;
    private boolean res;
    

    // Default constructor
    public AnswerResponse() {}

    // Parameterized constructor
    public AnswerResponse(int id, boolean res) {
        this.id = id;
        this.res = res;
    }


    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isRes() {
        return res;
    }

    public void setRes(boolean res) {
        this.res = res;
    }
}
