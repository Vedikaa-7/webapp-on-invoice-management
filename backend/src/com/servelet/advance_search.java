package com.servelet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import CRUD.advance_search_class;

/**
 * Servlet implementation class advance_search
 */
@WebServlet("/advance_search")
public class advance_search extends HttpServlet {
	private static final long serialVersionUID = 1L;
    public advance_search() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.addHeader("Access-Control-Allow-Origin", "*");
		String doc_id="" , buisness_year="",invoice_id="",cust_number="";
		//getters
		 doc_id = request.getParameter("doc_id");
		 invoice_id = request.getParameter("invoice_id");
		 buisness_year = request.getParameter("buisness_year");
		 cust_number = request.getParameter("cust_number");
		
		
	    advance_search_class obj = new advance_search_class();
	    // stores response after advance search is performed
	    String respData =   obj.advance_search(doc_id, buisness_year, cust_number, invoice_id);
	    response.getWriter().print(respData);
	}

}
