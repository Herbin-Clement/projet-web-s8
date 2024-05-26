package pack;

import java.util.Collection;

public class StatusQuizzDataList {
	
	private String status; 
	
	
	private Collection<QuizzData> quizzDataList; 
	
	
	public StatusQuizzDataList( String status, Collection<QuizzData> quizzDataList) {
		this.setStatus(status);
		this.setQuizzDataList(quizzDataList);
		
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public Collection<QuizzData> getQuizzDataList() {
		return quizzDataList;
	}


	public void setQuizzDataList(Collection<QuizzData> quizzDataList) {
		this.quizzDataList = quizzDataList;
	}
	


}
