package CRUD;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import data_base.myDatabaseConnection;

public class Delete_data {
	public String delete_data(int sl_no)
	{
		 myDatabaseConnection myconnection = new myDatabaseConnection(); 
    	 Connection connect = myconnection.getConnection();
    	 String result = "data deleted successfully";
 		
 		String sql = "delete from winter_internship where sl_no =?";
 		
 		try {
 			PreparedStatement ps = connect.prepareStatement(sql);
 			
 			ps.setInt(1, sl_no);
 			
 			ps.executeUpdate();
 		}
 		catch (SQLException e) {
 			// TODO: handle exception
 			e.printStackTrace();
 			result = "data not deleted";
 		}
 		// either data updated or not 
 		return result;
 		
	}

}
