/**
 * Vuex store for multimedias, with actions, mutations, getters and state.
 * @module AboutUs
 */

export default {

    /**
     * Action to fetch all multimedia posts from the database
     * @param {*} param0  destructuring of vuex context object
     */
    async getAllAboutUs({ commit }) {
        try {

            const response = await this.$axios.get('aboutus')
            commit("SET_ABOUTUS", response.data.Aboutus)


        }catch(error){
            if(!!error.response.data){
                dispatch('notifications/setSnackbar', {text: error.response.data.Error, color: 'error'}, {root: true})
                
            }else{
                dispatch('notifications/setSnackbar', {text: error.message, color: 'error'}, {root: true})                

            }
        }
    },

    /**
     * Action to fetch multimedia post by their type from the database.
     * @param {*} param0 destructuring of vuex context object
     * @param {*} type type of the multimedia posts being fetched
     */
    async getAboutUsByTypeCaptain({ commit, dispatch }, type) {
        try {
            const response = await this.$axios.get('aboutus/captain')
            console.log(response)
            commit("SET_CAPTAIN", response.data.AboutUs)

        } catch (error) {
            if (!!error.response.data) {
                dispatch('notifications/setSnackbar', { text: error.response.data.Error, color: 'error' }, { root: true })
                return 'error'

            }else{
                dispatch('notifications/setSnackbar', {text: error.message, color: 'error'}, {root: true})

            } 
        }
    },

    async getAboutUsByTypeDescription({ commit, dispatch }, type) {
        try {
            const response = await this.$axios.get('aboutus/description')
            console.log(response)
            commit("SET_DESCRIPTION", response.data.AboutUs)

        } catch (error) {
            if (!!error.response.data) {
                dispatch('notifications/setSnackbar', { text: error.response.data.Error, color: 'error' }, { root: true })
                return 'error'

            }else{
                dispatch('notifications/setSnackbar', {text: error.message, color: 'error'}, {root: true})

            } 
        }
    },

    async getAboutUsByTypeMembers({ commit, dispatch }, type) {
        try {
            const response = await this.$axios.get('aboutus/member')
            console.log(response)
            commit("SET_MEMBERS", response.data.AboutUs)

        } catch (error) {
            if (!!error.response.data) {
                dispatch('notifications/setSnackbar', { text: error.response.data.Error, color: 'error' }, { root: true })
                return 'error'

            }else{
                dispatch('notifications/setSnackbar', {text: error.message, color: 'error'}, {root: true})

            } 
        }
    },
}
