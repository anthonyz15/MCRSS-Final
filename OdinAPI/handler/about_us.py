from flask import jsonify
from .dao.about_us_dao import AboutUsDAO
from .dao.user_dao import UserDAO

class AboutUsHandler:
    
    def mapAboutUsToDict(self, record):
        """
        Summary:
            Converts the AboutUs records returned by the AbourUsDAO into a dictionary and returns it.
        Params:
            record - An AboutUs record in the database with its information.
        
        Returns:
            A dictionay containing the aboutus information in the given record.
        """

        result = {}
        result['hdid'] = record[0]
        result['hdmember'] = record[1]
        result['title'] = record[2]
        result['major'] = record[3]
        result['picture'] = record[4]
        result['type'] = record[5]
        
        return result

    def addAboutUs(self, attributes):
        """
        Summary:
            Adds an AboutUs card with the information given
        
        Params:
            Attributes: This contains the information used in the dictionary.
        
        Returns:
            A JSON object containing the information of new AboutUs object.
        """
        
        #Validate request json attributes comply with the system specifications
        validationResult = self._validateInsertAttributes(attributes)
        if isinstance(validationResult, str):
            return jsonify(Error = validationResult), 400

        dao = AboutUsDAO()

        try:
            #Add an AboutUs using DAO
            result = dao.addAboutUs(attributes['hdmember'], attributes['title'], attributes['major'], attributes['picture'], attributes['type'])

            #Fetch newly created AboutUs by its id to return
            aboutUs = dao.getAboutUsByID(result)
            dao._closeConnection()

            #Convert AboutUs record into a dictionary
            mappedResult = self.mapAboutUsToDict(aboutUs)
            return jsonify(AboutUs = mappedResult), 201
        except Exception as e:
            print(e)
            dao._closeConnection()
            return jsonify(Error = "Ocurrió un error interno tratando de añadir una nuevo record."), 500

    def getAllAboutUs(self):
        """
        Summary:
            Gets a list of all aboutus info that are valid in the database and maps the result to a JSON
            object containing all the valid aboutus'. The JSON objects is then 
            returned or an error if otherwise. 
        Returns:
            A JSON object containing all valid aboutus'.
        """
    
        dao = AboutUsDAO()
        
        try:
            #Get all AboutUs records using DAO
            result = dao.getAllAboutUs()
            dao._closeConnection()
            if not result:
                return jsonify(Error = "Ningun record de AboutUs fue encontrado."), 404

            #Convert About Us records into a list of dictionaries
            mappedResult = []
            for aboutus in result:
                mappedResult.append(self.mapAboutUsToDict(aboutus))
            return jsonify(AboutUs = mappedResult), 200
        except Exception as e:
            print(e)
            dao._closeConnection()
            return jsonify(Error = "Ocurrió un error interno buscando todos los records de AboutUs."), 500

    def getAboutUsByID(self, hdID):
        """
        Summary:
            Gets a single aboutus record specified by the given aboutus id that is valid in the 
            database and maps the result to a JSON object containing its information. The JSON objects is 
            then returned or an error if otherwise. 
        Params:
            hdID: the id of AboutUs to be fetched.
        Returns:
            A JSON object containing all the information of the valid AboutUs with the given record id.
        """

        #Validate AboutUs id is an intenger greater than 0
        # if not isinstance(hdID, int) or hdID < 1:
        #     return jsonify(Error = "El identificador del AboutUs no es válido."), 400
        
        dao = AboutUsDAO()
        
        
        try:
            #Check if AboutUs record with given id exists
            if not dao.aboutUsExists(hdID):
                dao._closeConnection()
                return jsonify(Error = "No existe eel AboutUs con el identificador: {}".format(hdID)), 404

            #Get AboutUs record by using its Id in the DAO
            aboutUs = dao.getAboutUsByID(hdID)
            dao._closeConnection()

            #Convert AboutUs record into a dictionary
            mappedResult = self.mapAboutUsToDict(aboutUs)
            return jsonify(AboutUs = mappedResult), 200
        except Exception as e:
            print(e)
            dao._closeConnection()
            return jsonify(Error = "Ocurrió un error interno buscando un record de AboutUs por su identificador."), 500

    def getAboutUsByType(self, hType):
        """
        Summary:
            Gets a list of ABoutus records specified by the given ABoutUs type that are valid in the 
            database and maps the result to a JSON object containing its information. The JSON objects is 
            then returned or an error if otherwise. 
        Params:
            mType: the type of the ABoutUs to be fetched.
        Returns:
            A JSON object containing all valid AboutUs records and their information of the given type.        
        """

        #Validate that the type of ABoutUs exists
        if not (hType == 'description' or hType == 'captain' or hType == 'member'): 
            return jsonify(Error = "El identificador del tipo de aboutus dado no es válido."), 400
        
        dao = AboutUsDAO()
        
        try:  
            #Get AboutUs record given its type using DAO
            result = dao.getAboutUsByType(hType) 
            dao._closeConnection()
            if not result:
                return jsonify(Error = "Ningun record de aboutus, con su tipo especificado fue encontrada."), 404

            #Convert AboutUs records of the given type into a list of dictionaries
            mappedResult = []
            for aboutUs in result:
                mappedResult.append(self.mapAboutUsToDict(aboutUs))
            return jsonify(AboutUs = mappedResult), 200        
        except Exception as e:
            print(e)
            dao._closeConnection()
            return jsonify(Error = "Occurrió un error interno buscando un record de aboutus, con su tipo especificado dado."), 500

    def editAboutUs(self, hdID, attributes):
        """
        Summary:
            Edits the attributes of an existing aboutus that is valid in the database with the given 
            aboutus id and maps the result to a JSON object that contains the information of the newly
            updated aboutusrecord.
        
        Params:
            hdID: the id of the aboutus record to be edited.
            attributes: a dictionary containing the attributes of the aboutus to be edited.
        
        Returns:
            A JSON object containing the information of the edited aboutus.
        """
        
        #Validate aboutus id is an intenger greater than 0
        # if not isinstance(hdID, int) or hdID < 1:
        #     return jsonify(Error = "El identificador del aboutus record dado no es válido."), 400

        #Validate request json attributes comply with the system specifications
        validationResult = self._validateUpdateAttributes(attributes)
        if isinstance(validationResult, str):
            return jsonify(Error = validationResult), 400

        dao = AboutUsDAO()
        
        try:
            if not dao.aboutUsExists(hdID):
                dao._closeConnection()
                return jsonify(Error = "No existe un record de aboutus con identificador: {}".format(hdID)), 404

            #Edit aboutus record using DAO
            result = dao.editAboutUs(hdID, attributes['hdmember'], attributes['title'], attributes['major'], attributes['picture'])

            #Fetch updated aboutus record by its id to return
            aboutUs = dao.getAboutUsByID(result)
            dao._closeConnection()

            #Convert aboutus record into a dictionary
            mappedResult = self.mapAboutUsToDict(aboutUs)
            return jsonify(AboutUs = mappedResult), 200
        except Exception as e:
            print(e)
            dao._closeConnection()
            return jsonify(Error = "Ocurrió un error interno editando un record de aboutus existente."), 500
    
    def removeAboutUs(self, hdID):
        """
        Summary:
            Invalidates in the database an aboutus with the given aboutus id.
        
        Params:
            hdID: the id of the aboutus post to invalidate.
        
        Returns:
            A JSON object containing the id of the updated and invalid AboutUs record.
        """
        
        #Validate aboutus id is an intenger greater than 0
        # if not isinstance(hdID, int) or hdID < 1:
        #     return jsonify(Error = "El identificador del AboutUs dado no es válido."), 400

        dao = AboutUsDAO()
        
        try:
            #Check if AboutUs record with given id exists
            if not dao.aboutUsExists(hdID):
                dao._closeConnection()
                return jsonify(Error = "No existe un AboutUs con identificador: {}".format(hdID)), 404

            #Remove aboutus using DAO
            result = dao.removeAboutUs(hdID)
            dao._closeConnection()
            if not result:
                return jsonify(Error = "Occurrió un error interno removiendo un record de AboutUs existente"), 500
            return jsonify(AboutUs = "Se removió el AboutUs con identificador: {}".format(result)), 200
        except Exception as e:
            print(e)
            dao._closeConnection()
            return jsonify(Error = "Ocurrió un error interno removiendo un record de aboutus existente"), 500

    def _validateInsertAttributes(self,attributes):
        """
        Summary:
            Validates the attributes dictionary given to add an aboutus record.
        Params:
            attributes: a dictionary containing the attributes of the aboutus record to be added.
        
        Returns:
            A string with an error message if the validation fails an integer otherwise.        
        """
        
        #Validate that attributes is a dictionary
        if not isinstance(attributes, dict):
            return "Los attributos dados no son válidos."       
        
        try:
            hdmember = attributes['hdmember']
            title = attributes['title']
            major = attributes['major']
            picture = attributes['picture']
            hType = attributes['type']
   
            #Title must be string with maximum length of 300 characters
            if not hdmember or not isinstance(hdmember, str) or len(hdmember) > 30:
                return "El título dado no es válido."

            #Title must be string with maximum length of 300 characters
            if not title or not isinstance(title, str) or len(title) > 20000:
                return "El título dado no es válido."

            #Content must be string with maximum length of 63206 characters
            if not major or not isinstance(major, str) or len(major) > 50:
                return "El contenido dado no es válido."

            #Title must be string with maximum length of 300 characters
            if not picture or not isinstance(picture, str) or len(picture) > 1000:
                return "El título dado no es válido."

            #Type can take the value of: text, image, video, or livestream. 
            if not hType or not (hType == 'description' or hType == 'captain' or hType == 'member'): 
                print(hType)
                return "El identificador del tipo de AboutUs dado no es válido."

        except Exception as e:
            print(e)
            return "Los argumentos dados no son válidos." 
        
        #If succesful return 1
        return 1  

    def _validateUpdateAttributes(self,attributes):
        """
        Summary:
            Validates the attributes dictionary given to edit an Aboutus record.
        Params:
            attributes: a dictionary containing the attributes of the aboutus record to be edited.
        
        Returns:
            A string with an error message if the validation fails an integer otherwise.        
        """
        
        #Validate that attributes is a dictionary
        if not isinstance(attributes, dict):
            return "Los attributos dados no son válidos."       
        
        try:
            hdmember = attributes['hdmember']
            title = attributes['title']
            major = attributes['major']
            picture = attributes['picture']
   
            #Title must be string with maximum length of 300 characters
            if not hdmember or not isinstance(hdmember, str) or len(hdmember) > 30:
                return "El título dado no es válido."

            #Title must be string with maximum length of 300 characters
            if not title or not isinstance(title, str) or len(title) > 20000:
                return "El título dado no es válido."

            #Content must be string with maximum length of 63206 characters
            if not major or not isinstance(major, str) or len(major) > 50:
                return "El contenido dado no es válido."

            #Title must be string with maximum length of 300 characters
            if not picture or not isinstance(picture, str) or len(picture) > 1000:
                return "El título dado no es válido."

        except Exception as e:
            print(e)
            return "Los argumentos dados no son válidos."
        
        #If succesful return 1
        return 1
