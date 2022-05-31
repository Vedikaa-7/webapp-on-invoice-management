package com.servelet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pojo.DataFields;

import CRUD.edit_data;

/**
 * Servlet implementation class edit_data_servelet
 */
@WebServlet("/edit_data_servelet")
public class edit_data_servelet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public edit_data_servelet() {
        super();
        //  Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.addHeader("Access-Control-Allow-Origin", "*");
		int sl_no;
		 String cust_payment_terms , invoice_currency;
		 cust_payment_terms = request.getParameter("cust_payment_terms");
		 invoice_currency = request.getParameter("invoice_currency");
		 sl_no = Integer.parseInt(request.getParameter("sl_no"));
		 
		 DataFields dataFields = new DataFields(sl_no  ,invoice_currency,cust_payment_terms );
		 // object of CRUD class
		 edit_data edit = new edit_data();
		 // storing response after edit function is performed 
		String res =  edit.Edit_data(dataFields);
		response.getWriter().print(res);
	}

}
