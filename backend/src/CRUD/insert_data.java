package CRUD;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.pojo.DataFields;

public class insert_data {
	private final String DB_URL = "jdbc:mysql://localhost/grey_goose";
    private final String USERNAME = "root";
    private final String PASSWORD = "mysql@073";
    Connection connect = null;
     public String Insert(DataFields datafields) {
    	  try {
  			 Class.forName("com.mysql.cj.jdbc.Driver");
 			connect = DriverManager.getConnection(DB_URL,USERNAME,PASSWORD);
 		} catch (SQLException e) {
 			//  Auto-generated catch block
 			e.printStackTrace();
 		} catch (ClassNotFoundException e) {
 			//  Auto-generated catch block
 			e.printStackTrace();
 		}
     	
    	 String result = "data inserted successfully";
 		 String sql = "INSERT INTO winter_internship values (? , ?, ? , ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)";
 		 String customerTable = "INSERT INTO customer SELECT * FROM (SELECT ?, ?) AS tmp WHERE NOT EXISTS ( SELECT * FROM customer WHERE cust_number = ?);";
 		 String businessTable = "INSERT INTO business SELECT * FROM (SELECT ?, ?) AS tmp WHERE NOT EXISTS ( SELECT * FROM business WHERE business_code = ?);";
 		 boolean res1 = false;
 		 boolean res2 = false;
 		 try {
 			 //passing the query,storing output  and filling missing values
 			PreparedStatement ps = connect.prepareStatement(customerTable);
 			ps.setInt(1, datafields.getCust_number());
 			ps.setString(2,datafields.getName_customer());
 			ps.setInt(3, datafields.getCust_number());
 			ps.executeUpdate();
 			res1= true;
 			 
 		 }catch(SQLException  e)
 		 {
 			 e.printStackTrace();
 			result = "data not inserted";
 			res1=false;
 		 }
 		 if(res1)
 		 {
	 		 try {
	 			 
	 			PreparedStatement ps = connect.prepareStatement(businessTable);
	 			ps.setString(1, datafields.getBusiness_code());
	 			ps.setString(2,datafields.getBusiness_name());//business name 
	 			ps.setString(3, datafields.getBusiness_code());
	 			ps.executeUpdate();
	 			
	 			res2= true;
	 			 
	 		 }catch(SQLException e) {
	 			 e.printStackTrace();
	 			result = "data not inserted";
	 			res2= false;
	 		 }
 		 }
 		 if(res1 &&  res2)
 		 {
 		 
 		  try {
 			  
			PreparedStatement ps = connect.prepareStatement(sql);
			ps.setInt(1, datafields.getSl_no());
			ps.setString(2, datafields.getBusiness_code());
			ps.setInt(3, datafields.getCust_number());
			ps.setString(4, datafields.getClear_date());
			ps.setInt(5, datafields.getBuisness_year());
			ps.setString(6, datafields.getDoc_id());
			ps.setString(7, datafields.getPosting_date());
			ps.setString(8, datafields.getDocument_create_date());
			ps.setString(9, datafields.getDocument_create_date1());
			ps.setString(10, datafields.getDue_in_date());
			ps.setString(11, datafields.getInvoice_currency());
			ps.setString(12, datafields.getDocument_type());
			ps.setInt(13, datafields.getPosting_id());
			ps.setString(14, datafields.getArea_business());
			ps.setDouble(15, datafields.getTotal_open_amount());
			ps.setString(16, datafields.getBaseline_create_date());
			ps.setString(17, datafields.getCust_payment_terms());
			ps.setInt(18, datafields.getInvoice_id());
			ps.setInt(19, datafields.getIsOpen());
			ps.setString(20, datafields.getAging_bucket()); 
			ps.setInt(21, datafields.getIs_deleted());
			ps.executeUpdate();
		}
		catch (SQLException e) {
			//  handle exception
			e.printStackTrace();
			result = "data not inserted";
		}
 		}
		return result;
 		 
     }

}
