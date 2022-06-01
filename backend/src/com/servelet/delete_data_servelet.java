package com.servelet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import CRUD.Delete_data;

/**
 * Servlet implementation class delete_data_servelet
 */
@WebServlet("/delete_data_servelet")
public class delete_data_servelet extends HttpServlet {
	private static final long serialVersionUID = 1L;
 

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.addHeader("Access-Control-Allow-Origin", "*");
		 String sl_no = request.getParameter("sl_no");
		 String [] values = sl_no.split(",");
		 Delete_data delete = new Delete_data();
		 for(int i=0;i<values.length;i++)
		 {
			 // store response after delete is performed
			 String res = delete.delete_data(Integer.parseInt(values[i]));
			 //send response back to server
			  response.getWriter().print(res);
		 }
		  
		
		
	}


}

