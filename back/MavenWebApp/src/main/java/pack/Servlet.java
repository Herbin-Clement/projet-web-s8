package pack;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.logging.Logger;
import java.util.logging.Level;

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
	private static final Logger LOGGER = Logger.getLogger(Servlet.class.getName());
    
      
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
		if (op.equals("listUsers")) {
			
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
		response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String op = request.getParameter("op");

        if (op == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Operation parameter is missing.");
            return;
        }

        switch (op) {
            case "addUser":
                addUser(request, response);
                break;
            case "addQuizz":
                // TODO
                break;
            default:
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid operation.");
                break;
        }
  
    
	}
	
	
	private void addUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try (InputStream is = request.getInputStream()) {
            User user = objectMapper.readValue(is, User.class);
            LOGGER.log(Level.INFO, "User object created: {0}", user);

            boolean usernameNotUsed = facade.addUser(user);
            if (!usernameNotUsed) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Username already used.");
                LOGGER.log(Level.WARNING, "Username already used: {0}", user.getUsername());
            } else {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("{\"message\":\"User added successfully.\"}");
                LOGGER.log(Level.INFO, "User added successfully: {0}", user.getUsername());
            }
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JSON format.");
            LOGGER.log(Level.SEVERE, "Error parsing JSON or adding user", e);
        }
    }

}
