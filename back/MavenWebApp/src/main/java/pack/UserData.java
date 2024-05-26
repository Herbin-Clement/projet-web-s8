package pack;

import java.util.Collection;
import java.util.List;

import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

public class UserData {

	private String username;
	private String password;
	private List<QuizzData> createdQuizzes;
	private List<QuizzData> answeredQuizzes;

    // Default constructor
    public UserData() {}

    // Parameterized constructor
    public UserData(String username, String password, List<QuizzData> createdQuizzes, List<QuizzData> answeredQuizzes) {
        this.setUsername(username);
        this.setPassword(password);
        this.setCreatedQuizzes(createdQuizzes);
        this.setAnsweredQuizzes(answeredQuizzes);
    }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<QuizzData> getCreatedQuizzes() {
		return createdQuizzes;
	}

	public void setCreatedQuizzes(List<QuizzData> createdQuizzes) {
		this.createdQuizzes = createdQuizzes;
	}

	public List<QuizzData> getAnsweredQuizzes() {
		return answeredQuizzes;
	}

	public void setAnsweredQuizzes(List<QuizzData> answeredQuizzes) {
		this.answeredQuizzes = answeredQuizzes;
	}
    
}
