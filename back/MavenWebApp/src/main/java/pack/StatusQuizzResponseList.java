package pack;

import java.util.Collection;

public class StatusQuizzResponseList {
	
	private String status; 
	
	
	private Collection<QuizzResponse> quizzResponseList; 
	
	
	public StatusQuizzResponseList( String status, Collection<QuizzResponse> quizzResponseList) {
		this.setStatus(status);
		this.setQuizzDataList(quizzResponseList);
		
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public Collection<QuizzResponse> getQuizzDataList() {
		return quizzResponseList;
	}


	public void setQuizzDataList(Collection<QuizzResponse> quizzResponseList) {
		this.quizzResponseList = quizzResponseList;
	}
	


}
