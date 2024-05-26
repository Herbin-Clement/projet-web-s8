package pack;

public class InfoUserTitle {
    private String username;
    private String title;

    // Default constructor
    public InfoUserTitle() {}

    // Parameterized constructor
    public InfoUserTitle(String username, String title) {
        this.username = username;
        this.title = title;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
