package data_base;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
public class myDatabaseConnection {
	 private final String DB_URL = "jdbc:mysql://localhost/grey_goose";
	    private final String USERNAME = "root";
	    private final String PASSWORD = "mysql@073";

		private Connection connection = null;
	    
	    public myDatabaseConnection() {
	  	  try {
	  		  Class.forName("com.mysql.cj.jdbc.Driver");
	  		  System.out.println("------- Databse Connected -------");
	  		  connection = DriverManager.getConnection(DB_URL,USERNAME,PASSWORD);
	  		  }
	  	   catch(SQLException | ClassNotFoundException e)
	  	  {
	  		   e.printStackTrace();
	  	  }
	        
	    }
	   
	 
		public Connection getConnection() {
		           Connection connect=null;
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
		    	
		  	  return connect;
		}
	
	
}
