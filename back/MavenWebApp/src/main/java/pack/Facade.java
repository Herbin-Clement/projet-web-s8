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
import javax.ws.rs.WebApplicationException;
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
	@Path("/addQuizz")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addQuizz(Quizz quizz) {
        try {
            em.persist(quizz);
            em.flush();  // Ensure ID is generated
            return Response.status(Response.Status.CREATED).entity(quizz).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error adding quiz: " + e.getMessage()).build();
        }
    }
	 
	 
	 @GET
	 @Path("/getQuizzes")
	 @Produces(MediaType.APPLICATION_JSON)
	 public Response getQuizzes() {
	     try {
	         Collection<Quizz> quizzes = em.createQuery("SELECT q FROM Quizz q", Quizz.class).getResultList();
	         return Response.ok(quizzes).build();
	     } catch (Exception e) {
	         return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error retrieving quizzes: " + e.getMessage()).build();
	     }
	 }
	 
	 @GET
	 @Path("/getUsers")
	 @Produces(MediaType.APPLICATION_JSON)
	 public Response getUsers() {
	     try {
	         Collection<User> users = em.createQuery("SELECT u FROM User u", User.class).getResultList();
	         return Response.ok(users).build();  // Successfully return the list of users
	     } catch (Exception e) {
	         return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error retrieving users: " + e.getMessage()).build();
	     }
	 }
	
	 @GET
	 @Path("/stats/{quizId}")
	 @Produces(MediaType.APPLICATION_JSON)
	 public Stats getStatsQuizz(@PathParam("quizId") int quizId) {
         Stats stats = em.find(Stats.class, quizId);
         if (stats == null) {
             throw new WebApplicationException("Stats with ID " + quizId + " not found", Response.Status.NOT_FOUND);
         }
         return stats;
     }

	 
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
