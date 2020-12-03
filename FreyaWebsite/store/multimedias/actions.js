/**
 * Vuex store for multimedias, with actions, mutations, getters and state.
 * @module multimedias
 */

export default {

    /**
     * Action to fetch all multimedia posts from the database
     * @param {*} param0  destructuring of vuex context object
     */
    async getMultimedias({ commit, dispatch }) {
        try {

            const response = await this.$axios.get('multimedia')
            commit("SET_MULTIMEDIAS", response.data.Multimedias)


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
    async getMultimediasByType({ commit, dispatch }, type) {
        try {
            const response = await this.$axios.get('multimedia/' + type)
            commit("SET_MULTIMEDIAS", response.data.Multimedias)

        } catch (error) {
            if (!!error.response.data) {
                dispatch('notifications/setSnackbar', { text: error.response.data.Error, color: 'error' }, { root: true })
                return 'error'

            }else{
                dispatch('notifications/setSnackbar', {text: error.message, color: 'error'}, {root: true})

            } 
        }
    },

    async getMultimediasText({ commit, dispatch }, type) {
        try {
            const response = await this.$axios.get('multimedia/' + type)
            console.log(response)
            commit("SET_TEXT", response.data.Multimedias)

        } catch (error) {
            if (!!error.response.data) {
                dispatch('notifications/setSnackbar', { text: error.response.data.Error, color: 'error' }, { root: true })
                return 'error'

            }else{
                dispatch('notifications/setSnackbar', {text: error.message, color: 'error'}, {root: true})

            } 
        }
    },
    
    async getMultimediasLive({ commit, dispatch }, type) {
        try {
            const response = await this.$axios.get('multimedia/' + type)
            console.log(response)
            commit("SET_LIVE", response.data.Multimedias)

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
     * Action to fetch a multimedia post by their id from the database.
     * @param {*} param0 destructuring of vuex context object
     * @param {*} mid id of the multimedia post being fetched
     */
    async getMultimediaByID({ commit, dispatch }, mid){
        try{
            
            const response = await this.$axios.get('multimedia/' + mid)
            commit("SET_MULTIMEDIA",response.data.Multimedia)
            
        } catch (error) {
            if (!!error.response.data) {
                dispatch('notifications/setSnackbar', { text: error.response.data.Error, color: 'error' }, { root: true })
                return 'error'

            }else{
                dispatch('notifications/setSnackbar', {text: error.message, color: 'error'}, {root: true})

            } 
        }
    }
}

