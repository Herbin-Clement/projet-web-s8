package BackEnd;
import javax.ejb.*;
import javax.persistence.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;


import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;


import java.util.List;

@Singleton
@Path("/")	// TODO: à configurer
public class Facade {

	 @PersistenceContext
     EntityManager em;

	 private boolean UsernameNotUsed(String username) {
		 String sqlQuery = "SELECT u FROM User u";
	     Collection<User> users = this.em.createQuery(sqlQuery, User.class).getResultList();
	     Boolean notUsed = true;
		 for (User user : users) {
			 if (user.getUsername().equals(username))  {
				 notUsed = false;
			 }
		 }
		 return notUsed;
	 }
	 
	 @POST
	 @Consumes(MediaType.APPLICATION_JSON) //TODO : bon ?
	 public void addUser(String username, String password) {
		 if (UsernameNotUsed(username)) {
			 User user = new User(username, password);
			 em.persist(user);
			 return Response.status(Response.Status.CREATED).build();
		 } else {
			 return Response.status(Response.Status.BAD_REQUEST).entity("Username already used.").build();
		 }

	 }
	 
	 
	@GET
	@Path("/checkConnexion")
    @Consumes({ "application/json" })
    public User checkConnexion(User u) {
    	String pseudo = u.getPseudo();
    	String motdepasse = u.getMotdepasse();
    	User user = em.createQuery("select u from User u where pseudo:=pseudo and motdepasse:=motdepasse", 
    			User.class).setParameter("pseudo", pseudo).setParameter("motdepasse", motdepasse).getSingleResult();
    	return user; 
    }
    
    @GET
    @Path("/checkPseudo")
    @Produces({ "application/json" })
    public boolean checkPseudo(User u){
    	String pseudo = u.getPseudo();
    	User user = em.createQuery("select u from User u where pseudo:=pseudo", 
    			User.class).setParameter("pseudo", pseudo).getSingleResult();
    	return (user==null); // profil non trouvé ?  
    }
    
    
	 /*{
	 public void ajoutQuizz(Collection<Mcq> liste_qcm, String link, int id_user_createur)
	 majStats(int id_quizz)
	 ajoutReponsesQuizz(Collection<Reponse> reponses, int id_quizz)
	 listeQuizzs()
	 listeUsers()
	 associerCreateur(int id_quizz, int id_user)
	 getStatistiquesSondage(int id_sondage)
	 }*/

}
