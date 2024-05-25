package pack;

public class StatusQuizzData {
	
	private String status; 
	
	
	private QuizzData quizzData; 
	
	
	public StatusQuizzData( String status, QuizzData quizzData) {
		this.setStatus(status);
		this.setQuizzData(quizzData);
		
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public QuizzData getQuizzData() {
		return quizzData;
	}


	public void setQuizzData(QuizzData quizzData) {
		this.quizzData = quizzData;
	}
	


}
