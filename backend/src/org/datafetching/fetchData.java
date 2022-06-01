package org.datafetching;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.pojo.DataFields;

import data_base.myDatabaseConnection;

/**
 * Servlet implementation class fetchData
 */
@WebServlet("/fetchData")
public class fetchData extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	int sl_no , cust_number , posting_id , invoice_id , isOpen , is_deleted, buisness_year;
	
	 String business_code , clear_date  , doc_id,posting_date , 
	document_create_date, document_create_date1 , due_in_date,invoice_currency,document_type,area_business,
	cust_payment_terms,aging_bucket,baseline_create_date,name_customer;    
	 double total_open_amount;
	 ArrayList<DataFields> allData = new ArrayList<DataFields>();
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.addHeader("Access-Control-Allow-Origin", "*");
	       try {
//	           
	           myDatabaseConnection mydatabase = new myDatabaseConnection();
	           Connection connection = mydatabase.getConnection();
	    	   PreparedStatement ps = connection.prepareStatement("SELECT * FROM winter_internship JOIN business ON winter_internship.business_code = business.business_code JOIN customer ON winter_internship.cust_number= customer.cust_number");
	    	   ResultSet rs = ps.executeQuery();
	    	   
	    	   while(rs.next())
	    	   {
	    		 
	    		   DataFields dataFields	= new DataFields();
	    		                sl_no = rs.getInt("sl_no");
	    		   				cust_number = rs.getInt("cust_number");
	    		   				posting_id  = rs.getInt("posting_id");
	    		   				invoice_id = rs.getInt("invoice_id");
	    		   				isOpen = rs.getInt("isOpen");
	    		   				is_deleted = rs.getInt("is_deleted");
	    		   				business_code = rs.getString("business_code");
	    		   				
	    		   				clear_date  = rs.getString("clear_date");
	    		   				buisness_year = rs.getInt("buisness_year");
	    		   				doc_id = rs.getString("doc_id");
	    		   				posting_date  = rs.getString("posting_date");
	    		   				document_create_date = rs.getString("document_create_date");
	    		   				document_create_date1 = rs.getString("document_create_date1");
	    		   				due_in_date = rs.getString("due_in_date");
	    		   				invoice_currency = rs.getString("invoice_currency");
	    		   				document_type = rs.getString("document_type");
	    		   				area_business = rs.getString("area_business");
	    		   				cust_payment_terms = rs.getString("cust_payment_terms");
	    		   				total_open_amount = rs.getDouble("total_open_amount");
	    		   				aging_bucket = rs.getString("aging_bucket");
	    		   				baseline_create_date = rs.getString("baseline_create_date");
	    		   				name_customer = rs.getString("name_customer");
	    		   				
	    		   				
	    		   				dataFields.setSl_no(sl_no);
	    		   				dataFields.setCust_number(cust_number);
	    		   				dataFields.setPosting_id(posting_id);
	    		   				dataFields.setInvoice_id(invoice_id);
	    		   				dataFields.setIsOpen(isOpen);
	    		   				dataFields.setIs_deleted(is_deleted);
	    		   				dataFields.setBusiness_code(business_code);
	    		   				dataFields.setClear_date(clear_date);
	    		   				dataFields.setBuisness_year(buisness_year);
	    		   				dataFields.setDoc_id(doc_id);
	    		   				dataFields.setPosting_date(posting_date);
	    		   				dataFields.setDocument_create_date(document_create_date);
	    		   				dataFields.setDocument_create_date1(document_create_date1);
	    		   				dataFields.setDue_in_date(due_in_date);
	    		   				dataFields.setInvoice_currency(invoice_currency);
	    		   				dataFields.setDocument_type(document_type);
	    		   				dataFields.setArea_business(area_business);
	    		   				dataFields.setCust_payment_terms(cust_payment_terms);
	    		   				dataFields.setTotal_open_amount(total_open_amount);
	    		   				dataFields.setName_customer(name_customer);
	    		   				
	    		   				if(aging_bucket == null) {
	    		   					dataFields.setAging_bucket("");
	    		   				}
	    		   				else {
	    		   					dataFields.setAging_bucket(aging_bucket);
	    		   				}
	    		   				
	    		   				dataFields.setBaseline_create_date(baseline_create_date);
					allData.add(dataFields);
				}
				

	    	   Gson gson = new Gson(); 
	   		String respData = gson.toJson(allData);
	   		response.getWriter().print(respData);
//				}
	    	   
	   
			}
			catch(Exception e) {
				e.printStackTrace();
				System.out.println("some error");
			}
			
			
			System.out.print(allData.size());
			allData.clear();
			
			
		}

	    	 
}


