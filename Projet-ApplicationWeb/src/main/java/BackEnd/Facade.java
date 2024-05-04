package BackEnd;
import javax.ejb.*;
import javax.persistence.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.Collection;
import java.util.List;

@Singleton
@Path("/rest")	// TODO: à configurer
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
