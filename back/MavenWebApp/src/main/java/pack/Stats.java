package pack;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Stats extends Entite<Stats> {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
	/* Booléen représentant l'état de la stat : 
	 * True : la stat est active (au moins un personne a répondu au quizz de la stat.
	 * False : la stat est inactive (personne n'a encore répondu au quizz de la stat. 
	*/
	private boolean activated;
	
	@OneToOne
	Quizz quizz;
	
	public Stats() {
		turnOff();
	}


	public boolean isActivated() {
		return activated;
	}


	public void turnOn() {
		this.activated = true;
	};
	
	public void turnOff() {
		this.activated = false;
	};
	
}
