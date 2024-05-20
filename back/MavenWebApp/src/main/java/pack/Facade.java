package pack;

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
		 return em.createQuery("SELECT q FROM Quizz q", Quizz.class).getResultList();
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
	 
}
