package CRUD;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.pojo.DataFields;

import data_base.myDatabaseConnection;

public class edit_data {
	public String Edit_data(DataFields datafields)
	{
		 myDatabaseConnection myconnection = new myDatabaseConnection(); 
    	 Connection connect = myconnection.getConnection();
    	 String result = "data updated successfully";
 		
 		String sql = "update winter_internship set invoice_currency=?,cust_payment_terms=? where sl_no=?";
 		
 		try{
 			PreparedStatement ps = connect.prepareStatement(sql);
 			ps.setString(1, datafields.getInvoice_currency());
 			ps.setString(2, datafields.getCust_payment_terms());
 			ps.setInt(3, datafields.getSl_no());
 			
 			ps.executeUpdate();
 		}
 		catch(SQLException e){
 			e.printStackTrace();
 			result= "data not updated";
 			
 		}
 		
 		return result;
	}


}
