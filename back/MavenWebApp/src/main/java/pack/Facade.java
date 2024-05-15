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
		    Long count = em.createQuery("SELECT COUNT(u) FROM User u WHERE u.username = :username", Long.class)
		                   .setParameter("username", username)
		                   .getSingleResult();
		    return count == 0;
				    
			 } catch (NullPointerException e) {
				 return false;
			 }
		    
	}
	 
	 @POST
	 @Path("/user")
	 @Consumes("application/json") 
	 public Response addUser(User user) {
		 
		 String username = user.getUsername();
		 if (UsernameNotUsed(username)) {
			 
			 em.persist(user); 
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
	 @Consumes("application/json")
	 public Response checkConnexion(User u) {
	     String username = u.getUsername();
	     String password = u.getPassword();
	     try {
	         User user = em.createQuery("SELECT u FROM User u WHERE u.username = :username AND u.password = :password", User.class)
	                       .setParameter("username", username)
	                       .setParameter("password", password)
	                       .getSingleResult();
	         return Response.ok(user).build();
	     } catch (NoResultException e) {
	         return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
	     } catch (Exception e) {
	         return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Server error").build();
	     }
	 }
    
	 @GET
	 @Path("/checkUsername")
	 @Produces("application/json")
	 public Response checkUsername(User u) {
	     String username = u.getUsername();
	     try {
	         User user = em.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class)
	                       .setParameter("username", username)
	                       .getSingleResult();
	         // If we reach here, the user exists, hence return false.
	         return Response.ok(false).build();
	     } catch (NoResultException e) {
	         // No user found, return true.
	         return Response.ok(true).build();
	     } catch (Exception e) {
	         // Handle other exceptions appropriately.
	         return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Server error").build();
	     }
	 }


}
