package pack;

import java.util.Collection;
import java.util.LinkedList;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.persistence.*;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Singleton
@Path("/")	
public class Facade {

	 @PersistenceContext
     EntityManager em;

	 /* Interactions with class User */
	 
	 private boolean UsernameNotUsed(String username) {
		 try {
			 String sqlQuery = "SELECT u FROM User u";
		     Collection<User> users = this.em.createQuery(sqlQuery, User.class).getResultList();
		     Boolean notUsed = true;
			 for (User user : users) {
				 if (user.getUsername().equals(username))  {
					 notUsed = false;
				 }
			 }
			 return notUsed;
		 } catch (NullPointerException e) {
			 return true;
		 }
	 }
	 
	 @POST
	 @Path("/user")
	 @Consumes(MediaType.APPLICATION_JSON) 
	 public Response addUser(String username, String password) {
		 if (UsernameNotUsed(username)) {
			 User user = new User(username, password);
			 em.persist(user); // TODO: em est null
			 return Response.status(Response.Status.CREATED).build();
		 } else {
			 return Response.status(Response.Status.BAD_REQUEST).entity("Username already used.").build();
		 }

	 }
	 
	 @GET
	 @Path("/user")
	 @Produces(MediaType.APPLICATION_JSON)
	 public Collection<User> listUsers() {
		 try {
			 Collection <User> listUsers = em.createQuery("SELECT u FROM User u", User.class).getResultList();
			 return listUsers;
		 } catch (NullPointerException e) {
			 return new LinkedList<User>();
		 }
	 }
	 
	 /*{
	 @GET
	 @Path("/user")
	 @Produces(MediaType.APPLICATION_JSON)
	 public Collection<Quizz> getCreatedQuizzes(String username) {
		 User u = em.createQuery("SELECT u FROM User u WHERE u.username = :" + username, User.class).setParameter("username", username).getSingleResult();
		return u.getCreatedQuizzes();
	 }
	 
	 @GET
	 @Path("/user")
	 @Produces(MediaType.APPLICATION_JSON)
	 public Collection<Quizz> getAnsweredQuizzes(String username) {
		 User u = em.createQuery("SELECT u FROM User WHERE u.username = :" + username, User.class).setParameter("username", username).getSingleResult();
		return u.getAnsweredQuizzes();
	 }
}	}*/
	 
	 
	 /* Interactions with class Quizz */
	 
	 @POST
	 @Path("/quizz")
	 @Consumes(MediaType.APPLICATION_JSON) 
	 public Response addQuizz(@PathParam("username_creator") String username_creator, String link, Collection<Mcq> Mcqs) {
		 User creator = em.createQuery("SELECT u FROM User u WHERE u.username = :username_creator", User.class).setParameter("username", username_creator).getSingleResult();
		 Quizz quizz = new Quizz(creator, link, Mcqs);
		 em.persist(quizz);
		 return Response.status(Response.Status.CREATED).build();
	 }
	 
	 /*{
	 @GET
	 @Path("/quizz")
	 // TODO : annotations
	 public Collection<Quizz> getQuizzs() {
		 // TODO
		 return null;
	 }
	 
	 @GET
	 @Path("/user")
	 // TODO : annotations
	 public Collection<User> getUsers() {
		 // TODO
		 return null;
	 }
	
	 @GET
	 @Path("/stats")
	 // TODO : annotations
	 public Stats getStatsQuizz(int id_sondage) {
		 // TODO
		return null;
	 }
	}*/	 
	 
	 /*{
	 majStats(int id_quizz)
	 ajoutReponsesQuizz(Collection<Reponse> reponses, int id_quizz)
	 }*/
	 
	// Tests de l'échange de données
	 
	 @GET
	 @Path("/userTest")
	 @Produces(MediaType.APPLICATION_JSON)
	 public User testUser() {
		 User u = new User("rcrico", "1234");
		 return u;
	 }
	 
	@GET
	@Path("/checkConnexion")
    @Consumes({ "application/json" })
    public User checkConnexion(User u) {
    	String username = u.getUsername();
    	String password = u.getPassword();
    	User user = em.createQuery("select u from User u where u.username = " + username + " and password = " + password, 
    			User.class).setParameter("username", username).setParameter("password", password).getSingleResult();
    	return user; 
    }
    
    @GET
    @Path("/checkUsername")
    @Produces({ "application/json" })
    public boolean checkUsername(User u){
    	String username = u.getUsername();
    	User user = em.createQuery("select u from User u where u.username = "+ username, 
    			User.class).setParameter("username", username).getSingleResult();
    	return (user==null); // profil non trouvé ?  
    }

}
