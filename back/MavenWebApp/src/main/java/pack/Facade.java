package pack;

import java.util.LinkedList;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.ManyToMany;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

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
	 
	 private boolean quizzNameNotUsed(String link) {
		    Long count = em.createQuery("SELECT COUNT(q) FROM Quizz q WHERE q.link = :link", Long.class)
		                   .setParameter("link", link)
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
		 Collection<User> listUsers = em.createQuery("select u from User u", User.class).getResultList();
		 return copyCollection(listUsers,User.class);
	 }
	 
	 // FONCTIONNE
	 public User getUserByUsername(String username) {
		 System.out.println(username);
		 User u = em.createQuery("SELECT u FROM User u WHERE u.username = '" + username +"'", User.class).getSingleResult();
		 return u.copyExcludingID();
	 }
	 
	 public Quizz getQuizzByTitle(String title) {
	        System.out.println("Searching for quiz with title: " + title);
	        Quizz quizz = em.createQuery("SELECT q FROM Quizz q WHERE q.link = '" + title + "'", Quizz.class).getSingleResult();
	  
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
	 
	 
	 
	 public static <T extends Entite<T>> Collection<T> copyCollection(Collection<? extends Entite<?>> collection, Class<T> clazz) {
	        Collection<T> resultat = new LinkedList<>();
	        for (Entite<?> entite : collection) {
	            if (clazz.isInstance(entite)) {
	                resultat.add(clazz.cast(entite).copyExcludingID());
	            } else {
	                throw new IllegalArgumentException("Tous les éléments de la collection ne sont pas du type " + clazz.getName());
	            }
	        }
	        return resultat;
	     }
	 
	 
	 /* Interactions with class Quizz */
	 
    
	 public Collection<QuizzData> listQuizzes() {
		 Collection<Quizz> listQuizzes = em.createQuery("SELECT q FROM Quizz q", Quizz.class).getResultList();
		 Collection<QuizzData> listQuizzesData = new LinkedList<QuizzData>();
		 for (Quizz quizz : listQuizzes) {
			 List<QuestionData> questionDataList = new ArrayList<>();
		        for (Mcq mcq : quizz.getMcqs()) {
		            List<AnswerData> answerDataList = new ArrayList<>();
		            for (ResponseClient response : mcq.getResponses()) {
		                answerDataList.add(new AnswerData(response.getResponse(), response.getId(), false)); // Don't include 'ok' value
		            }
		            questionDataList.add(new QuestionData(mcq.getQuestion(), mcq.getId(), answerDataList));
		        }
			  listQuizzesData.add(new QuizzData(quizz.getLink(), questionDataList, quizz.getCreator().getUsername()));
		 }
		 return listQuizzesData;
	 }
    
	 public Collection<QuizzData> getListQuizzesUser(String username) {
		 Collection<Quizz> listQuizzes = em.createQuery("SELECT q FROM Quizz q", Quizz.class).getResultList();
		 Collection<QuizzData> listQuizzesData = new LinkedList<QuizzData>();
		 for (Quizz quizz : listQuizzes) {
			 System.out.println(quizz.getCreator().getUsername() + " | " + username);
			 if (!quizz.getCreator().getUsername().equals(username)) {
				 List<QuestionData> questionDataList = new ArrayList<>();
			        for (Mcq mcq : quizz.getMcqs()) {
			            List<AnswerData> answerDataList = new ArrayList<>();
			            for (ResponseClient response : mcq.getResponses()) {
			                answerDataList.add(new AnswerData(response.getResponse(), response.getId(), false)); // Don't include 'ok' value
			            }
			            questionDataList.add(new QuestionData(mcq.getQuestion(), mcq.getId(), answerDataList));
			        }
				  listQuizzesData.add(new QuizzData(quizz.getLink(), questionDataList, username));
			 }
		 }
		 return listQuizzesData;
			 
	 }
	 
	 public Collection<QuizzData> getCreatedQuizzesUser(String username) {
		 Collection<Quizz> listQuizzes = em.createQuery("SELECT q FROM Quizz q WHERE q.creator.username = '" + username + "'", Quizz.class).getResultList();
		 Collection<QuizzData> listQuizzesData = new LinkedList<QuizzData>();
		 for (Quizz quizz : listQuizzes) {
			 System.out.println(quizz.getCreator().getUsername() + " | " + username);
			 List<QuestionData> questionDataList = new ArrayList<>();
		        for (Mcq mcq : quizz.getMcqs()) {
		            List<AnswerData> answerDataList = new ArrayList<>();
		            for (ResponseClient response : mcq.getResponses()) {
		                answerDataList.add(new AnswerData(response.getResponse(), response.getId(), false)); // Don't include 'ok' value
		            }
		            questionDataList.add(new QuestionData(mcq.getQuestion(), mcq.getId(), answerDataList));
		        }
			  listQuizzesData.add(new QuizzData(quizz.getLink(), questionDataList, username));
		 }
		 return listQuizzesData;
	 }
	
	 /*{
	 public Collection<QuizzResponse> getListQuizzesResponseUser(String username) {
		 Collection<Input> listInputsUser = em.createQuery("SELECT i FROM Input i WHERE i.user.username = '" + username + "'", Input.class).getResultList();
		 Collection<QuizzResponse> listQuizzesResponse = new LinkedList<QuizzResponse>();
		 for (Input input : listInputsUser) {
			 //System.out.println(input.getUser().getUsername() + " | " + username);
			 List<QuestionResponse> questionResponseList = new ArrayList<QuestionResponse>();
		        for () {
		            List<AnswerResponse> answerResponseList = new ArrayList<AnswerResponse>();
		            for (ResponseClient response : mcq.getResponses()) {
		                answerResponseList.add(new AnswerResponse(id, res)); // Don't include 'ok' value
		            }
		            questionResponseList.add(new QuestionResponse(id, answerResponseList));
		        }
			  listQuizzesResponse.add(new QuizzResponse(quizz.getLink(), questionDataList, username));
		 }
		 return listQuizzesData;
	 }
	 ]*/
	 
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
		
		 Collection<User> listUsers = em.createQuery("select u from User u", User.class).getResultList();
	    for (User user : listUsers) {
	        if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
	            return true;
	        }
	    }
	   
	    return false;
	 }
	 
	 public boolean addQuizz(QuizzData quizzData) {
		 
		 	if (quizzNameNotUsed(quizzData.getTitle())) {
		        try {
		            // Créer un nouvel objet Quizz
		        	Quizz quizz = new Quizz();
		            quizz.setLink(quizzData.getTitle()); // Utiliser le titre comme lien pour cet exemple
		            quizz.setMcqs(new LinkedList<>());
		            User u = em.createQuery("SELECT u FROM User u WHERE username = '" + quizzData.getCreatorUsername() + "'", User.class).getSingleResult();
		            quizz.setCreator(u);
	
		            // Parcourir les questions et les ajouter au quizz
		            for (QuestionData questionData : quizzData.getQuestions()) {
		                Mcq mcq = new Mcq();
		                mcq.setQuestion(questionData.getQuestion());
		                mcq.setRank(questionData.getId());
		                mcq.setQuizz(quizz);
		                mcq.setResponses(new LinkedList<>());
		                mcq.setInputs(new LinkedList<>());
		                quizz.addMcq(mcq);
		                em.persist(mcq);
	
		                // Parcourir les réponses et les associer à la question (Mcq)
		                for (AnswerData answerData : questionData.getAnswers()) {
		                    ResponseClient responseClient = new ResponseClient();
		                    responseClient.setResponse(answerData.getText());
		                    responseClient.setRank(answerData.getId());
		                    responseClient.setValue(answerData.isOk());
		                    responseClient.setQcm(mcq);
		                    responseClient.setInputs(new LinkedList<>());
		                    
		                    mcq.addResponse(responseClient);
		                    
		                    em.persist(responseClient);
		                }
		            }
	
		            // Persister le quizzC
		            em.persist(quizz);
	
		            return true;
	        } catch (Exception e) {
	            e.printStackTrace();
	            return false;
	        }
		 	} else {
	        	return false;
		 	}
	    }
	 
	 
	 public boolean processQuizzAnswers(QuizzResponse quizzData) {
		 
		 try {
			 
			 User user = em.createQuery("SELECT u FROM User u WHERE u.username = '" + quizzData.getUsername()+"'", User.class).getSingleResult();
			 
			 
			 Quizz quizzRep = em.createQuery("SELECT q FROM Quizz q WHERE q.link = '" + quizzData.getTitle() + "'", Quizz.class).getSingleResult();
			  
			 
			 
			
			 
	            for (QuestionResponse questionData : quizzData.getQuestions()) {
	            	Mcq mcq = em.createQuery("SELECT m FROM Mcq m WHERE m.rank = :rank AND m.quizzOfTheMcq.link = :quizzId", Mcq.class)
	                        .setParameter("rank", questionData.getId())
	                        .setParameter("quizzId", quizzRep.getLink())
	                        .getSingleResult();
	                if (mcq == null) {
	                	System.out.println("mcq est null");
	                    return false; // Mcq not found
	                }

	                for (AnswerResponse ans : questionData.getAnswers()) {
	                	ResponseClient responseClient = em.createQuery("SELECT r FROM ResponseClient r WHERE r.rank = :rank AND r.qcm.id = :mcqId", ResponseClient.class)
                                .setParameter("rank", ans.getId())
                                .setParameter("mcqId", mcq.getId())
                                .getSingleResult();
	                    if (responseClient == null) {
	                    	System.out.println("responseClient est null");
	                        return false; // ResponseClient not found
	                    }

	                    Input input = new Input();
	                    input.setQcm(mcq);
	                    input.setReponse(responseClient);
	                    input.setSaisie(ans.isRes());
	                    input.setUser(user);

	                    em.persist(input);

	                    // Add the input to the corresponding collections
	                    mcq.getInputs().add(input);
	                    responseClient.getInputs().add(input);
	                    user.getInputs().add(input);
	                    
	                    em.merge(input);

	                    em.merge(mcq);
	                    em.merge(responseClient);
	                    em.merge(user);
	                }
	            }
	            
	            user.getAnsweredQuizzes().add(quizzRep);
				quizzRep.getParticipants().add(user);
				em.merge(user);
	            em.merge(quizzRep);
	            return true;
	        } catch (Exception e) {
	        	System.out.println("Exception detecté");
	            e.printStackTrace();
	            return false;
	        }
	    }
	 
	 
	 public QuizzData getQuizzByIdOrLink(Integer id, String link) {
	        Quizz quizz = null;

	        if (id != null) {
	            quizz = em.find(Quizz.class, id);
	        } else if (link != null) {
	            TypedQuery<Quizz> query = em.createQuery("SELECT q FROM Quizz q WHERE q.link = :link", Quizz.class);
	            query.setParameter("link", link);
	            quizz = query.getSingleResult();
	        }

	        if (quizz == null) {
	            return null;
	        }

	        List<QuestionData> questionDataList = new ArrayList<>();
	        for (Mcq mcq : quizz.getMcqs()) {
	            List<AnswerData> answerDataList = new ArrayList<>();
	            for (ResponseClient response : mcq.getResponses()) {
	                answerDataList.add(new AnswerData(response.getResponse(), response.getRank(), response.isValue())); // Don't include 'ok' value
	            }
	            questionDataList.add(new QuestionData(mcq.getQuestion(), mcq.getRank(), answerDataList));
	        }

	        return new QuizzData(quizz.getLink(), questionDataList, quizz.getCreator().getUsername());
	    }
	 
	 
	 
	 public StatusProfil getProfile(String username) {
	        TypedQuery<User> query = em.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class);
	        query.setParameter("username", username);
	        User user = query.getSingleResult();

	        if (user == null) {
	            return new StatusProfil("error", "User not found", 0, 0, 0);
	        }

	        int createdQuizzesCount = user.getCreatedQuizzes().size();
	        int answeredQuizzesCount = user.getAnsweredQuizzes().size();

	        long correctAnswersCount = user.getInputs().stream()
	                .filter(input -> (input.isSaisie() && input.getReponse().isValue())|| (!input.isSaisie() && !input.getReponse().isValue()))
	                .count();
	        long totalAnswersCount = user.getInputs().size();

	        int correctAnswerPercentage = totalAnswersCount == 0 ? 0 : (int) ((double) correctAnswersCount / totalAnswersCount * 100);

	        return new StatusProfil("ok", user.getUsername(), createdQuizzesCount, answeredQuizzesCount, correctAnswerPercentage);
	    }
	 
	 
	 public QuizzDataReview getCorrectionQuizz(String quizzTitle,String username) {
			 Quizz quizz = em.createQuery("SELECT q FROM Quizz q WHERE q.link = '" + quizzTitle +"'", Quizz.class).getSingleResult();
			 
			 TypedQuery<User> query = em.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class);
		        query.setParameter("username", username);
		        User user = query.getSingleResult();

		        if (user == null) {
		            return null;
		        }
		        
		        
	        if (quizz == null) {
	            return null;
	        }

	        List<QuestionReview> questionReviewList = new ArrayList<>();
	        for (Mcq mcq : quizz.getMcqs()) {
	            List<AnswerReview> answerReviewList = new ArrayList<>();
	            for (ResponseClient response : mcq.getResponses()) {
	            	
	            	boolean res = response.getInputs().stream()
                            .filter(input -> input.getUser().getUsername().equals(user.getUsername()))
                            .findFirst()
                            .map(Input::isSaisie)
                            .orElse(false);
	                answerReviewList.add(new AnswerReview(response.getResponse(), response.getId(), res, response.isValue()));
	            }
	            questionReviewList.add(new QuestionReview(mcq.getQuestion(), mcq.getId(), answerReviewList));
	        }

	        return new QuizzDataReview(quizz.getLink(), questionReviewList);
	    }
	 
	 
	 public Collection<QuizzResponse> getAnsweredQuizzesList(String username) {
	        TypedQuery<User> query = em.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class);
	        query.setParameter("username", username);
	        User user = query.getSingleResult();

	        if (user == null) {
	            return null;
	        }

	        Collection<QuizzResponse> quizzResponses = new ArrayList<>();
	        for (Quizz quizz : user.getAnsweredQuizzes()) {
	            Collection<QuestionResponse> questionResponses = new ArrayList<>();
	            for (Mcq mcq : quizz.getMcqs()) {
	            	Collection<AnswerResponse> answerResponses = new ArrayList<>();
	                for (ResponseClient response : mcq.getResponses()) {
	                	boolean res = response.getInputs().stream()
	                            .filter(input -> input.getUser().getUsername().equals(user.getUsername()))
	                            .findFirst()
	                            .map(Input::isSaisie)
	                            .orElse(false);
	                    answerResponses.add(new AnswerResponse(response.getId(), res));
	                }
	                questionResponses.add(new QuestionResponse(mcq.getId(), answerResponses));
	            }
	            quizzResponses.add(new QuizzResponse(user.getUsername(), quizz.getLink(), questionResponses));
	        }

	        return quizzResponses;
	    }
	 
	 
	 
}
