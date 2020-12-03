export default{
    /**
     * Action to fetch all events from the datadase
     * @param {*} param0 destructuring of vuex context object
     */
    async getEvents({commit}) {
        try {
            const response = await this.$axios.get('events/')
            commit("SET_EVENTS", response.data.Events)
            commit("SET_EVENT",null)
            

        }catch(error){
            
            if(!!error.response.data){
                console.log(error)
                //dispatch('notifications/setSnackbar', {text: error.response.data.Error, color: 'error'}, {root: true})
                return 'error'
            }else{
                console.log(error)
                return 'error'
                //dispatch('notifications/setSnackbar', {text: error.message, color: 'error'}, {root: true})
            }

        }
    },
    async getImages({ commit, dispatch }) {
        try {
            const response = await this.$axios.get('sports?branch=Masculino');
            console.log(response);
            commit("SET_IMG", response.data.SPORTS)
        } catch (error) {
            if (!!error.response) {
                dispatch('notifications/setSnackbar', { text: error.response.data.Error, color: 'error' }, { root: true })
            } else {
                dispatch('notifications/setSnackbar', { text: error.message, color: 'error' }, { root: true })
            }
        }
    },

}

