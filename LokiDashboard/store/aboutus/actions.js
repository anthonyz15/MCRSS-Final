/**
 * Vuex store for about us, with actions, mutations, getters, and state.
 * @module aboutus
 */

export default {

    /**
     * Action to fetch all about us elements from the database
     * @param {*} param0  destructuring of vuex context object
     */
    async getAboutUs({ commit, dispatch }) {
        try {

            const response = await this.$axios.get('aboutus')
            commit("SET_ABOUTUSS", response.data.AboutUs)


        }catch(error){
            if(!!error.response.data){
                dispatch('notifications/setSnackbar', {text: error.response.data.Error, color: 'error'}, {root: true})
                
            }else{
                dispatch('notifications/setSnackbar', {text: error.message, color: 'error'}, {root: true})                

            }
        }
    },

    /**
     * Action to fetch about us elements by their type from the database.
     * @param {*} param0 destructuring of vuex context object
     * @param {*} type type of the about us element being fetched
     */
    async getAboutUsByType({ commit, dispatch }, type) {
        try {
            const response = await this.$axios.get('aboutus/' + type)
            commit("SET_ABOUTUSS", response.data.AboutUs)

        } catch (error) {
            if (!!error.response.data) {
                dispatch('notifications/setSnackbar', { text: error.response.data.Error, color: 'error' }, { root: true })
                return 'error'

            }else{
                dispatch('notifications/setSnackbar', {text: error.message, color: 'error'}, {root: true})

            } 
        }
    },

    /**
     * Action to add a new about us element to the system given the information
     * in the about us creation form
     * @param {*} param0 destructuring of vuex context object
     * @param {*} aboutusJSON Object containing the information of the about us element to be added.
     */
    async addAboutUs({ commit, dispatch }, aboutusJSON) {
        try {
            const response = await this.$axios.post('aboutus', aboutusJSON)
            commit("ADD_ABOUTUS", response.data.AboutUs)
            dispatch('notifications/setSnackbar', { text: "Se añadió una nueva descripción a Sobre Nosotros", color: 'success' }, { root: true })

        } catch (error) {
            if (!!error.response.data) {
                dispatch('notifications/setSnackbar', { text: error.response.data.Error, color: 'error' }, { root: true })
                return 'error'
            } else {
                dispatch('notifications/setSnackbar', { text: error.message, color: 'error' }, { root: true })
            }
        }
    },

    /**
     * Action to edit a about us element's information by their id and information given
     * in the about us edit form.
     * @param {*} param0 destructuring of vuex context object
     * @param {*} aboutusJSON Object containing the information of the about us element to be edited.
     */
    async editAboutUs({ commit, dispatch }, aboutusJSON) {
        try {

            const response = await this.$axios.put('aboutus/' + aboutusJSON.aboutus_id, aboutusJSON)
            commit("UPDATE_ABOUTUS", response.data.AboutUs)
            dispatch('notifications/setSnackbar', { text: `La descripción del Sobre Nosotros con identificador: ${aboutusJSON.aboutus_id} ha sido editada.`, color: 'success' }, { root: true })

        } catch (error) {
            console.log(error)
            if (!!error.response.data) {
                dispatch('notifications/setSnackbar', { text: error.response.data.Error, color: 'error' }, { root: true })
                'return error'
            } else {
                dispatch('notifications/setSnackbar', { text: error.message, color: 'error' }, { root: true })
            }
        }
    },

    /**
     * Action to remove an about us element from the system given their id.
     * @param {*} param0 destructuring of vuex context object
     * @param {*} hdid id of the about us element being removed
     */
    async removeAboutUs({ commit, dispatch }, hdid) {
        try {

            const response = await this.$axios.delete('aboutus/' + hdid)
            commit("DELETE_ABOUTUS", hdid)
            dispatch('notifications/setSnackbar', { text: response.data.Multimedia, color: 'success' }, { root: true })

        } catch (error) {
            if (!!error.response.data) {
                dispatch('notifications/setSnackbar', { text: error.response.data.Error, color: 'error' }, { root: true })
                return 'error'
            } else {
                dispatch('notifications/setSnackbar', { text: error.message, color: 'error' }, { root: true })
            }
        }
    },
}
