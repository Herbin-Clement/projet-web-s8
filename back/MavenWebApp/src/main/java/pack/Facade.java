package pack;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Singleton
public class Facade {

	@PersistenceContext(name="MaPU")
	EntityManager em;
	
	 /* Interactions with class User */
	 
	 private boolean UsernameNotUsed(String username) {
		    Long count = em.createQuery("SELECT COUNT(u) FROM User u WHERE u.username = :username", Long.class)
		                   .setParameter("username", username)
		                   .getSingleResult();
		    return count == 0;
	}
	 
	// FONCTIONNE
	 public boolean addUser(User user) {
		 boolean usernameNotUsed = UsernameNotUsed(user.getUsername());
		 if (usernameNotUsed) {
			 em.persist(user);
			 // em.flush();  // Ensure ID is generated
			 return true;
		 }
		 return usernameNotUsed;
	 }
	 
	 // FONCTIONNE
	 public Collection<User> listUsers() {
		 Collection<User> listUsersAux = em.createQuery("select u from User u", User.class).getResultList();
		 Collection<User> listUsers = new LinkedList<User>();
		 for (User u : listUsersAux) {
			 listUsers.add(u.copyExcludingID());
		 }
		 return listUsers;
	 }
	 
	 // FONCTIONNE
	 public User getUserByUsername(String username) {
		 System.out.println(username);
		 User u = em.createQuery("SELECT u FROM User u WHERE u.username = '" + username +"'", User.class).getSingleResult();
		 return u.copyExcludingID();
	 }
	 
	 public Quizz getQuizzByTitle(String title) {
	        System.out.println("Searching for quiz with title: " + title);
	        Quizz quizz = em.createQuery("SELECT q FROM Quizz q WHERE q.link = :title", Quizz.class).getSingleResult();
	  
	        return quizz.copyExcludingID();
	    }
	 
	 public Collection<Quizz> getCreatedQuizzes(String username) {
		 User u = em.createQuery("SELECT u FROM User u WHERE u.username = :" + username, User.class).setParameter("username", username).getSingleResult();
		 return u.getCreatedQuizzes();
	 }
	 
	 public Collection<Quizz> getAnsweredQuizzes(String username) {
		 User u = em.createQuery("SELECT u FROM User WHERE u.username = :" + username, User.class).setParameter("username", username).getSingleResult();
		 return u.getAnsweredQuizzes();
	 }
	 
	 /* Interactions with class Quizz */
	 
    public void addQuizz(Quizz quizz) {
            em.persist(quizz);
            // em.flush();  // Ensure ID is generated
    }
    
	 public Collection<Quizz> listQuizzes() {
		 Collection<Quizz> listQuizzesAux = em.createQuery("SELECT q FROM Quizz q", Quizz.class).getResultList();
		 Collection<Quizz> listQuizzes = new LinkedList<Quizz>();
		 for (Quizz q : listQuizzesAux) {
			 listQuizzes.add(q.copyExcludingID());
		 }
		 return listQuizzes;
	 }
    
	 public Stats getStatsQuizz(int quizzId) {
         Stats stats = em.find(Stats.class, quizzId);
         /*{
         if (stats == null) {
             throw new WebApplicationException("Stats with ID " + quizzId + " not found", Response.Status.NOT_FOUND);
         }
         }*/
         return stats;
     }
	 
	 // JUlIEN 
	 
	 public boolean verfiLogin(String username,String password) {
		
		 Collection<User> listUsersAux = this.listUsers();
	    for (User user : listUsersAux) {
	        if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
	            return true;
	        }
	    }
	   
	    return false;
	 }
	 
	 public boolean addQuizz(QuizzData quizzData) {
	        try {
	            // Créer un nouvel objet Quizz
	            Quizz quizz = new Quizz();
	            quizz.setLink(quizzData.getTitle()); // Utiliser le titre comme lien pour cet exemple
	            quizz.setMcqs(new ArrayList<>());

	            // Parcourir les questions et les ajouter au quizz
	            for (QuestionData questionData : quizzData.getQuestions()) {
	                Mcq mcq = new Mcq();
	                mcq.setQuestion(questionData.getQuestion());
	                mcq.setRank(questionData.getId());
	                mcq.setQuizz(quizz);
	                mcq.setResponses(new ArrayList<>());
	                quizz.getMcqs().add(mcq);
	                em.persist(mcq);

	                // Parcourir les réponses et les associer à la question (Mcq)
	                for (AnswerData answerData : questionData.getAnswers()) {
	                    ResponseClient responseClient = new ResponseClient();
	                    responseClient.setResponse(answerData.getText());
	                    responseClient.setRank(answerData.getId());
	                    responseClient.setValue(answerData.isOk());
	                    responseClient.setQcm(mcq);
	                    mcq.getResponses().add(responseClient);
	                    em.persist(responseClient);
	                }
	            }

	            // Persister le quizz
	            em.persist(quizz);

	            return true;
	        } catch (Exception e) {
	            e.printStackTrace();
	            return false;
	        }
	    }
	 
	 
	 
}
