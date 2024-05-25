package pack;


import java.util.Collection;
import java.util.LinkedList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class Quizz  extends Entite<Quizz> {
	
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
	private String link;
	
	@ManyToOne
	private User creator;
	
	@ManyToMany(mappedBy="answeredQuizzes")
	private Collection<User> participants;
	
	@OneToMany(mappedBy="quizzOfTheMcq")
	private Collection<Mcq> Mcqs; // les QCM du quizz
	
	@OneToOne
	Stats stats;
	
	// TODO : liens avec autres classes que User et Mcq (attributs, constructeur, méthodes)
	
	public Quizz() {};
	
	public Quizz(User creator, String link, Collection<Mcq> Mcqs) {
		setCreator(creator);
		setLink(link);
		this.participants = new LinkedList<User>();
		setMcqs(Mcqs);
		this.stats = new Stats();
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}
	
	public void setCreator(User creator) {
		this.creator = creator;
	}
	
	public User getCreator() {
		return this.creator;
	}
	
	public void setMcqs(Collection<Mcq> Mcqs) {
		this.Mcqs = Mcqs;
	}
	
	public Collection<Mcq> getMcqs() {
		return this.Mcqs;
	}
	
	public void setParticipants(Collection<User> p) {
		this.participants = p;
		
		
	}
	
	public Collection<User> getParticipants() {
		return this.participants;
		
	}
}
