package pack;

import java.io.IOException;
import java.util.Collection;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;


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
			String jsonParam = request.getParameter("json"); 
			User user = objectMapper.readValue(jsonParam, User.class);
			boolean usernameNotUsed = facade.addUser(user);
			if (!usernameNotUsed) {
				response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Username already used.");
			} else {
				response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("{\"message\":\"User added successfully.\"}");
			}
		} else if (op.equals("listUsers")) {
			Collection<User> listUsers = facade.listUsers();
			String jsonResponse = objectMapper.writeValueAsString(listUsers);
	        response.getWriter().write(jsonResponse);
		} else if (op.equals("getCreatedQuizzes")) {
			// TODO
		} else if (op.equals("getAnsweredQuizzes")) {
			// TODO
		}
		// classe Quizz
		else if (op.equals("addQuizz")) {
			// TODO
		} else if (op.equals("listQuizzes")) {
			// TODO
		} else if (op.equals("getStatsQuizz")) {
			// TODO
		} else {
			// nothing
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
