package CRUD;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.*;
import java.util.Map.Entry;
import data_base.*;
import com.google.gson.Gson;
import com.pojo.DataFields;

import data_base.myDatabaseConnection;  
public class advance_search_class {
	int sl_no , cust_number , posting_id , invoice_id , isOpen , is_deleted, buisness_year;
	 String business_code , clear_date  , doc_id,posting_date , 
	document_create_date, document_create_date1 , due_in_date,invoice_currency,document_type,area_business,
	cust_payment_terms,aging_bucket,baseline_create_date,business_name;  // local variables
	 double total_open_amount;
	 ArrayList<DataFields> allData = new ArrayList<DataFields>();
	 
	public String advance_search(String doc_id1,String buisness_year1,String cust_number1,String invoice_id1 ) {
		// to be finally returned
		String result = "advance search completed";
		// hashMap for user input 
		HashMap<String,String> map=new HashMap<String,String>();
		if(!doc_id1.isEmpty())
		map.put("doc_id", doc_id1);
		if(!buisness_year1.isEmpty())
		map.put("buisness_year", buisness_year1);
		if(!cust_number1.isEmpty())
        map.put("cust_number", cust_number1);
		if(!invoice_id1.isEmpty())
		map.put("invoice_id", invoice_id1);
		
		
		String query = " SELECT * FROM winter_internship NATURAL JOIN business NATURAL JOIN customer WHERE ";
		
		 // create an object of Iterator
		//extract keys and values that user enters 
		ArrayList<String> keys = new ArrayList<String>(
				Arrays.asList("cust_number", "invoice_id", "buisness_year", "doc_id"));
		for (HashMap.Entry<String, String> entry : map.entrySet()) {
			if (keys.contains(entry.getKey()))
				query += " " + entry.getKey() + " = " + entry.getValue() + " AND";

		}
		query = query.substring(0, query.length() - 3) + ";";
		System.out.println("*****");
		System.out.println(query);
		System.out.println("*****");
		
		try {
//	           
	           myDatabaseConnection mydatabase = new myDatabaseConnection();
	           Connection connection = mydatabase.getConnection();
	    	   PreparedStatement ps = connection.prepareStatement(query);
	    	   ResultSet rs = ps.executeQuery();
	    	   
	    	   while(rs.next())
	    	   {
	    		  // create data fields object
	    		   DataFields dataFields	= new DataFields();
	    		   //set all local variables with values
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
	    		   				business_name = rs.getString("business_name");
	    		   				
	    		   				// call to setters
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
	    		   				dataFields.setBusiness_name(business_name);
	    		   				dataFields.setName_customer(rs.getString("name_customer"));
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
		   		return respData;

		    	   
	    	   
	   
			}
			catch(Exception e) {
				e.printStackTrace();
				System.out.println("some error");
			}
			


		return result;
	}

}
