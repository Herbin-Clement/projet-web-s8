package pack;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Mcq  extends Entite<Mcq> {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
	private String question;
	private int rank;
	
	@ManyToOne
	private Quizz quizzOfTheMcq;

	public Mcq() {};
	
	public Mcq(String question, int rank, Quizz quizz) {
		setQuestion(question);
		setRank(rank);
		setQuizz(quizz);
	}
	
	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
	}
	
	public void setQuizz(Quizz quizz) {
		this.quizzOfTheMcq = quizz;
	}
	
	public Quizz getQuizz() {
		return this.quizzOfTheMcq;
	}
	
}
