from flask import jsonify
from .dao.about_us_dao import AboutUsDAO
from .dao.user_dao import UserDAO

class AboutUsHandler:
    
    def mapAboutUsToDict(self, record):
        """
        Summary:
            Converts a multimedia post record returned by the MultimediaDAO into a dictionary and returns it.

        Params:
            record: a multimedia post record in the database with its information.
        
        Returns:
            A dictionay containing the multimedia post information given in the record.
        """

        result = {}
        result['hdid'] = record[0]
        result['hdmember'] = record[1]
        result['title'] = record[2]
        result['major'] = record[3]
        result['picture'] = record[4]
        result['type'] = record[5]
        
        return result

    # def addMultimedia(self, attributes):
    def addAboutUs(self, attributes):
        """
        Summary:
            Adds a new multimedia post with the information given and maps the result to a JSON object that 
            contains the information of the newly added multimedia post
        
        Params:
            attributes: a dictionary containing the attributes of the multimedia post to be added.
        
        Returns:
            A JSON object containing the information of the newly added multimedia post.
        """
        
        #Validate request json attributes comply with the system specifications
        validationResult = self._validateInsertAttributes(attributes)
        if isinstance(validationResult, str):
            return jsonify(Error = validationResult), 400

        dao = AboutUsDAO()

        try:
            #Add multimedia post using DAO
            result = dao.addAboutUs(attributes['hdmember'], attributes['title'], attributes['major'], attributes['picture'], attributes['type'])

            #Fetch newly created multimedia post by its id to return
            aboutUs = dao.getAboutUsByID(result)
            dao._closeConnection()

            #Convert multimedia post record into a dictionary
            mappedResult = self.mapAboutUsToDict(aboutUs)
            return jsonify(AboutUs = mappedResult), 201
        except Exception as e:
            print(e)
            dao._closeConnection()
            return jsonify(Error = "Ocurrió un error interno tratando de añadir una nueva publicación multimedia."), 500

    def getAllAboutUs(self):
        """
        Summary:
            Gets a list of all multimedia posts that are valid in the database and maps the result to a JSON
            object containing all the valid multimedia posts and their information. The JSON objects is then 
            returned or an error if otherwise. 

        Returns:
            A JSON object containing all valid multimedia posts and their information.
        """
    
        dao = AboutUsDAO()
        
        try:
            #Get all multimedia posts using DAO
            result = dao.getAllAboutUs()
            dao._closeConnection()
            if not result:
                return jsonify(Error = "Ninguna publicación multimedia fue encontrada."), 404

            #Convert multimedia post records into a list of dictionaries
            mappedResult = []
            for aboutus in result:
                mappedResult.append(self.mapAboutUsToDict(aboutus))
            return jsonify(AboutUs = mappedResult), 200
        except Exception as e:
            print(e)
            dao._closeConnection()
            return jsonify(Error = "Ocurrió un error interno buscando todas las publicaciones multimedia."), 500

    def getAboutUsByID(self, hdID):
        """
        Summary:
            Gets a single multimedia post specified by the given multimedia post id that is valid in the 
            database and maps the result to a JSON object containing its information. The JSON objects is 
            then returned or an error if otherwise. 

        Params:
            mID: the id of the multimedia post id to be fetched.

        Returns:
            A JSON object containing all the information of the valid multimedia post with the given multimedia post id.
        """

        #Validate multimedia post id is an intenger greater than 0
        # if not isinstance(hdID, int) or mID < 1:
        #     return jsonify(Error = "El identificador de la publicación multimedia no es válido."), 400
        
        dao = AboutUsDAO()
        
        try:
            #Check if multimedia post with given id exists-----------------------------------------------------------------------------
            if not dao.aboutUsExists(hdID):
                dao._closeConnection()
                return jsonify(Error = "No existe una publicación multimedia con el identificador: {}".format(hdID)), 404

            #Get multimedia post given its id using DAO
            aboutUs = dao.getAboutUsByID(hdID)
            dao._closeConnection()

            #Convert multimedia post record into a dictionary
            mappedResult = self.mapAboutUsToDict(aboutUs)
            return jsonify(AboutUs = mappedResult), 200
        except Exception as e:
            print(e)
            dao._closeConnection()
            return jsonify(Error = "Ocurrió un error interno buscando una publicación multimedia por su identificador."), 500

    def getAboutUsByType(self, hType):
        """
        Summary:
            Gets a list of multimedia posts specified by the given multimedia type that are valid in the 
            database and maps the result to a JSON object containing its information. The JSON objects is 
            then returned or an error if otherwise. 

        Params:
            mType: the type of the multimedia post to be fetched.

        Returns:
            A JSON object containing all valid multimedia posts and their information of the given type.        
        """

        #Validate that the type of multimedia exists
        if not (hType == 'description' or hType == 'captain' or hType == 'member'): 
            return jsonify(Error = "El identificador del tipo de multimedia dado no es válido."), 400
        
        dao = AboutUsDAO()
        
        try:  
            #Get multimedia post given its type using DAO
            result = dao.getAboutUsByType(hType) 
            dao._closeConnection()
            if not result:
                return jsonify(Error = "Ninguna publicación del tipo de multimedia dado fue encontrada."), 404

            #Convert multimedia post records of the given type into a list of dictionaries
            mappedResult = []
            for aboutUs in result:
                mappedResult.append(self.mapAboutUsToDict(aboutUs))
            return jsonify(AboutUs = mappedResult), 200        
        except Exception as e:
            print(e)
            dao._closeConnection()
            return jsonify(Error = "Occurrió un error interno buscando publicaciones del tipo de multimedia dado."), 500

    def editAboutUs(self, hdID, attributes):
        """
        Summary:
            Edits the attributes of an existing multimedia post that is valid in the database with the given 
            multimedia post id and maps the result to a JSON object that contains the information of the newly
            updated multimedia post
        
        Params:
            mID: the id of the multimedia post to be edited.
            attributes: a dictionary containing the attributes of the multimedia post to be edited.
        
        Returns:
            A JSON object containing the information of the edited multimedia post.
        """
        
        #Validate multimedia post id is an intenger greater than 0-------------------------------------- comentarios real-----------------
        # if not isinstance(mID, int) or mID < 1:
        #     return jsonify(Error = "El identificador de la publicación multimedia dado no es válido."), 400

        #Validate request json attributes comply with the system specifications----------------- comentarios real-------------
        validationResult = self._validateUpdateAttributes(attributes)
        if isinstance(validationResult, str):
            return jsonify(Error = validationResult), 400

        dao = AboutUsDAO()
        
        try:
            #Check if multimedia post with given id exists----------------- comentarios real-------------
            if not dao.aboutUsExists(hdID):
                dao._closeConnection()
                return jsonify(Error = "No existe una publicación multimedia con identificador: {}".format(hdID)), 404

            #Edit multimedia post using DAO
            result = dao.editAboutUs(hdID, attributes['hdmember'], attributes['title'], attributes['major'], attributes['picture'])

            #Fetch newly updated multimedia post by its id to return
            aboutUs = dao.getAboutUsByID(result)
            dao._closeConnection()

            #Convert multimedia post record into a dictionary
            mappedResult = self.mapAboutUsToDict(aboutUs)
            return jsonify(AboutUs = mappedResult), 200
        except Exception as e:
            print(e)
            dao._closeConnection()
            return jsonify(Error = "Ocurrió un error interno editando una publicación multimedia existente."), 500
    
    def removeAboutUs(self, hdID):
        """
        Summary:
            Invalidates in the database a multimedia post with the given multimedia post id.
            This effectively acts as a removal of the multimedia post from the system.
        
        Params:
            mID: the id of the multimedia post to invalidate.
        
        Returns:
            A JSON object containing the id of the updated and invalid multimedia post.
        """
        
        #Validate multimedia post id is an intenger greater than 0
        # if not isinstance(mID, int) or mID < 1:
        #     return jsonify(Error = "El identificador de la publicación multimedia dado no es válido."), 400

        dao = AboutUsDAO()
        
        try:
            #Check if multimedia post with given id exists
            if not dao.aboutUsExists(hdID):
                dao._closeConnection()
                return jsonify(Error = "No existe una publicación multimedia con identificador: {}".format(hdID)), 404

            #Remove multimedia post using DAO
            result = dao.removeAboutUs(hdID)
            dao._closeConnection()
            if not result:
                return jsonify(Error = "Occurrió un error interno removiendo una publicación multimedia existente"), 500
            return jsonify(Multimedia = "Se removió la publicación multimedia con identificador: {}".format(result)), 200
        except Exception as e:
            print(e)
            dao._closeConnection()
            return jsonify(Error = "Ocurrió un error interno removiendo una publicación multimedia existente"), 500

    def _validateInsertAttributes(self,attributes):
        """
        Summary:
            Validates the attributes dictionary given to add a multimedia post.

        Params:
            attributes: a dictionary containing the attributes of the multimedia post to be added.
        
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
                return "El identificador del tipo de multimedia dado no es válido."

        except Exception as e:
            print(e)
            return "Los argumentos dados no son válidos." 
        
        #If succesful return 1
        return 1  

    def _validateUpdateAttributes(self,attributes):
        """
        Summary:
            Validates the attributes dictionary given to edit a multimedia post.

        Params:
            attributes: a dictionary containing the attributes of the multimedia post to be edited.
        
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