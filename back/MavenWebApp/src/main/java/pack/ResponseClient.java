package pack;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class ResponseClient extends Entite<ResponseClient> {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
	private boolean value;
	private String response;
	private int rank; 
	
	@ManyToOne
	private Mcq qcm;
	
	@OneToMany 
	private Collection<Input> inputs;
	
	public ResponseClient() {
		
	}
	

	
	

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

	public boolean isValue() {
		return value;
	}

	public void setValue(boolean value) {
		this.value = value;
	}



	public int getRank() {
		return rank;
	}



	public void setRank(int rank) {
		this.rank = rank;
	}
	
	public void setQcm(Mcq qcm) {
		this.qcm = qcm;
	}
	
	public Mcq getQcm() {
		return this.qcm;
	}
	
	public Collection<Input> getInputs() {
		return this.inputs; 
	}
	
	public void setInputs(Collection<Input> inputs) {
		this.inputs = inputs;
	}	
	
	public int getId() {
		return this.id;
	}
	
}
