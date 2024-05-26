package pack;

public class StatusQuizzDataReview {
	
	private String status; 
	
	
	private QuizzDataReview quizzData; 
	
	
	public StatusQuizzDataReview( String status, QuizzDataReview quizzData) {
		this.setStatus(status);
		this.setQuizzDataReview(quizzData);
		
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public QuizzDataReview getQuizzDataReview() {
		return quizzData;
	}


	public void setQuizzDataReview(QuizzDataReview quizzData) {
		this.quizzData = quizzData;
	}
	


}
