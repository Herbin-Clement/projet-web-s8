package pack;

public class StatusProfil {
	
	private String status;
	
	private String username; 
	
	private int nb_quizz_cree;
	
	private int nb_quizz_repondu;
	
	private int pourcentage_bonne_reponse;
	
	
	public StatusProfil(String status, String username,int nb_quizz_cree,int nb_quizz_repondu,int pourcentage_bonne_reponse) {
		this.status = status;
        this.username = username;
        this.nb_quizz_cree = nb_quizz_cree;
        this.nb_quizz_repondu = nb_quizz_repondu;
        this.pourcentage_bonne_reponse = pourcentage_bonne_reponse;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getNb_quizz_cree() {
		return nb_quizz_cree;
	}

	public void setNb_quizz_cree(int nb_quizz_cree) {
		this.nb_quizz_cree = nb_quizz_cree;
	}

	public int getNb_quizz_repondu() {
		return nb_quizz_repondu;
	}

	public void setNb_quizz_repondu(int nb_quizz_repondu) {
		this.nb_quizz_repondu = nb_quizz_repondu;
	}

	public int getPourcentage_bonne_reponse() {
		return pourcentage_bonne_reponse;
	}

	public void setPourcentage_bonne_reponse(int pourcentage_bonne_reponse) {
		this.pourcentage_bonne_reponse = pourcentage_bonne_reponse;
	} 
	
	

}
