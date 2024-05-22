package pack;

import java.io.IOException;
import java.util.Collection;
import java.util.LinkedList;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;

@WebServlet("/servlet")
public class Servlet extends HttpServlet {
	
	@EJB
	Facade facade;
	
	private static final long serialVersionUID = 1L;
      
	/* Va servir à convertir les données Json en objets Java */
	private ObjectMapper objectMapper = new ObjectMapper();
	
    public Servlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");	
		String op = request.getParameter("op");
		// classe User
		if (op.equals("addUser")) {
			User user = new Gson().fromJson(request.getReader(), User.class);
			boolean usernameNotUsed = facade.addUser(user);
			if (!usernameNotUsed) {
		        response.getWriter().write("{\"status\":\"ko\",\"message\":\"Username already used.\"}");
			} else {
                response.getWriter().write("{\"status\":\"ok\",\"message\":\"User added successfully.\"}");
			}
			
			
			
		} else if (op.equals("listUsers")) {
			Collection<User> listUsers = facade.listUsers();
			String jsonResponse = objectMapper.writeValueAsString(listUsers);
	        response.getWriter().write(jsonResponse);
	        
	        
		} else if (op.equals("getUserByName")) {
			String username = request.getParameter("username");
			User user = facade.getUserByUsername(username);
			String jsonResponse = objectMapper.writeValueAsString(user);
	        response.getWriter().write(jsonResponse);
	        
	    // Vérifie si l'username et le password est valide    
		} else if (op.equals("verifConnexion")) {
			
			
		} else if (op.equals("getCreatedQuizzes")) {
			// TODO
		} else if (op.equals("getAnsweredQuizzes")) {
			// TODO
		}
		// classe Quizz
		
		// Rejoint un quizz avec le lien 
		else if (op.equals("joinQuizzLink")) {
			
			
		} else if (op.equals("addQuizz")) {
			
		
		// Rejoint un quizz en cliquant sur un quizz qu'on a crée ou deja ajouté
		} else if (op.equals("joinQuizzID")) {
			
			// TODO
		// List de tous les quizz disponible
		} else if (op.equals("listQuizzesLibre")) {
			
		} else if (op.equals("getMyQuizzes")) {
			// TODO
		} else if (op.equals("getStatsQuizz")) {
			// TODO
			
		} else if (op.equals("getMyStats")) {
			
		// Lorsque l'on a fini de répondre a un quizz
		} else if (op.equals("addAnsQuizz")) {
			
		
		} else if (op.equals("getCorrectionQuizz")) {
			
		} else {
			// nothing
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
