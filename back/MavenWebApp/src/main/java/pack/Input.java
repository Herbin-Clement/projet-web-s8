package pack;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Input extends Entite<Input> {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
	
	private boolean saisie; 
	
	@ManyToOne 
	private ResponseClient reponse;
	
	@ManyToOne 
	private Mcq qcm;
	
	
	
	public Input() {
		
	}
	
	
	
	public void setId(int id) {
		this.id = id;
	}

	public boolean isSaisie() {
		return saisie;
	}

	public void setSaisie(boolean saisie) {
		this.saisie = saisie;
	}
	
	
	public void setReponse(ResponseClient reponse) {
		this.reponse = reponse; 
		
	}
	
	public ResponseClient getReponse() {
		return this.reponse;
	}
	
	
	public void setQcm(Mcq qcm) {
		this.qcm = qcm; 
		
	}
	
	public Mcq getQcm() {
		return this.qcm;
	}
	
	
}
