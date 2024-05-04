package BackEnd;

import java.util.Collection;
import java.util.LinkedList;

import javax.persistence.*;

@Entity
public class User {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
	private String username;
	private String password;
	
	@OneToMany(mappedBy="creator", fetch = FetchType.EAGER)
	Collection<Quizz> createdQuizzes;
	@ManyToMany(mappedBy="participant", fetch = FetchType.EAGER) // TODO : bon ?
	Collection<Quizz> answeredQuizzes;
	
	public User() {};
	
	public User(String username, String password) {
		this.setUsername(username);
		this.setPassword(password);
	   	this.createdQuizzes = new LinkedList<Quizz>();
	   	this.answeredQuizzes = new LinkedList<Quizz>(); // TODO : bon ?
	}

	public Collection<Quizz> getCreatedQuizzes() {
		return this.createdQuizzes;
	}
	
	public Collection<Quizz> getAnsweredQuizzes() {
		return this.answeredQuizzes;
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
	
}
