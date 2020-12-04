from .config.sqlconfig import db_config
from flask import jsonify
import psycopg2

class AboutUsDAO:

    def __init__(self):
        #Extract relational database credentials.
        connection_url = "dbname={} user={} password={} host={} ".format(
        db_config['database'],
        db_config['username'],
        db_config['password'],
        db_config['host']
        )
        
        #Establish a connection with the relational database.
        self.conn = psycopg2.connect(connection_url) 

    def addAboutUs(self, hdmember, title, major, picture, htype):
        """
        Summary:
            Creates a aboutus record with the given title, content, type of AboutUs, and author,
            and inserts it into the database returning the id of the newly created an aboutus record if succesful,
            or an error if otherwise.

        Params:
            title: the position in the directive among Huella members
            hdmember: Member of the directive of Huella
            htype: the type of Aboutus record.
            picture: profile picture of the member.
            major: Study concentration.

        Returns:
            The id of the newly added record
        """
        cursor = self.conn.cursor() 

        query = "insert into aboutus (hdmember, title, major, is_invalid, picture, type)"\
                "values (%s, %s, %s, false, %s, %s) returning hdid;"

        hdID = None
        
        try:
            
            cursor.execute(query, (hdmember, title, major, picture, htype,))       
            hdID = cursor.fetchone()[0]
            cursor.close()
            if not hdID:
                return "Occurrió un error interno tratando de añadir un aboutus record."       
        except psycopg2.DatabaseError as e:
            print(e)
            return "Occurrió un error interno tratando de añadir un aboutus record."
        
        #Commits the changes done on the database after insertion
        try:
            self._commitChanges()                   
        except:
            return "Occurrió un error interno tratando de añadir un aboutus record."
        
        #Return id of the newly created aboutus record
        return hdID

    def getAllAboutUs(self):
        """
        Summary:
            Returns a list of all aboutus records that are valid in the database with their corresponding information.

        Returns:
            A list containing all the valid aboutus records with their information.
        """

        cursor = self.conn.cursor()

        query = """select hdid, hdmember, title, major, picture, type
                   from aboutus
                   where is_invalid = false
                """
        
        result = []
        
        try:
            cursor.execute(query)
            for row in cursor:
                result.append(row)
            return result
        except psycopg2.DatabaseError as e:
            print(e)
            return "Ocurrió un error interno buscando todos los records de aboutus"

    def getAboutUsByID(self, hdID):
        """
        Summary:
            Returns a single aboutus record that is valid in the database with their corresponding information
            with the given aboutus id.

        Params:
            hdID: the id of the aboutus to be fetched.

        Returns:
            A list containing all the information of the valid aboutus with the given aboutus record id.
        """
        
        cursor = self.conn.cursor()
        
        query = """select hdid, hdmember, title, major, picture, type
                   from aboutus
                   where hdid = %s
                   and is_invalid = false
                """
        
        try:
            cursor.execute(query,(hdID,))
            result = cursor.fetchone()
            return result
        except psycopg2.DatabaseError as e:
            print(e)
            return "Ocurrió un error interno buscando un record de aboutus por su identificador."
    
    def getAboutUsByType(self, hType):
        """
        Summary:
            Returns a a list of aboutus records that are valid in the database with their corresponding information
            and are of the given type.

        Params:
            hType: the type of aboutus record.

        Returns:
            A list containing all the valid aboutus records with their information and are of the given type.
        """

        cursor = self.conn.cursor()

        query = """select hdid, hdmember, title, major, picture, type
                   from aboutus
                   where type = %s
                   and is_invalid = false
                """

        result = []
        
        try:
            cursor.execute(query, (hType,))
            for row in cursor:
                result.append(row)
            return result
        except psycopg2.DatabaseError as e:
            print(e)
            return "Occurrió un error interno buscando publicaciones del tipo de aboutus dado." 

    def editAboutUs(self, hdID, hdmember, title, major, picture):
        """
        Summary:
            Updates an existing aboutus record in the database using the given title, major, type of aboutus record, 
            and hdmember, returning the id of the updated aboutus if succesful, or an error if otherwise.

        Params:
            hID: the id of the aboutus to be updated.
            title: Position of the Huella member.
            major: Study concentration of the member.
            hType: the type of aboutus record.
            hdmember: Member of directiva of Huella

        Returns:
            The id of the newly updated AboutUs record.
        """

        cursor = self.conn.cursor()
        
        query = """update aboutus
                   set hdmember = %s,
                       title = %s,
                       major = %s,
                       picture = %s
                   where hdid = %s
                   returning hdid
                """
        
        result = None
        
        try:
            cursor.execute(query,(hdmember, title, major, picture, hdID,))
            result = cursor.fetchone()
            if not result:
                return "Occurrió un error interno editando un record de aboutus existente."
        except Exception as e:
            print(e)
            return "Ocurrió un error interno editando unrecord de aboutus existente."             
        
        try:
            self._commitChanges()                  
        except:
            return "Ocurrió un error interno editando un aboutus existente."            
       
        #Return id of the newly updated aboutus
        return result[0] 
    
    def removeAboutUs(self, hdID):
        """
        Summary:
            Sets as invalid a aboutus record in the database with the given aboutus id.
            This effectively acts as a removal of the aboutus from the system.

        Params:
            hdID: The id of the aboutus record to invalidate.

        Returns:
            The id of the updated and invalid aboutus.
        """
        
        cursor = self.conn.cursor()
        
        query = """update aboutus
                   set is_invalid = true
                   where hdid = %s
                   returning hdid;
                """
        
        result = None
        
        try:
            cursor.execute(query, (hdID, ))
            result = cursor.fetchone()
            if not result:
                return "Occurrió un error interno removiendo un record de AboutUs existente."
        except Exception as e:
            print(e)
            return "Ocurrió un error interno removiendo un record de AboutUs existente."             
        
        try:
            self._commitChanges()                  
        except:
            return "Ocurrió un error interno removiendo un record de AboutUs existente."  

        #Return id of the newly updated aboutus record
        return result[0] 

    def aboutUsExists(self, hdID):
        """
        Summary:
            Confirms the existence of am aboutus in the database by the aboutus id given.

        Params:
            hdID: the id of the AboutUs record in question.

        Returns:
            True if the AboutUs record exists, false otherwise.
        """
        
        cursor = self.conn.cursor()
        
        exists = True
        
        query = """select hdID
                   from aboutus
                   where hdID = %s
                   and is_invalid = false
                """
        try:
            cursor.execute(query,(hdID,))
            if not cursor.fetchone():
                exists = False
        except Exception as e:
            print(e)
            exists = False
        
        return exists

    def _commitChanges(self):
        """
        Summary:
            Commits the changes done on the database after
            insertion and update queries.
        """
        self.conn.commit()

    def _closeConnection(self):
        """
        Summary:
            Closes the connection with the database.
        """
        if self.conn is not None:
            self.conn.close()
