/**
 * Vuex store for multimedias, with actions, mutations, getters and state.
 * @module multimedias
 */

//These mutations allow you to modify the state of the application.
export default{

    /**
     * Mutation to set the loaded multimedia post's data in the state.
     * @param {*} state vuex state object
     * @param {*} aboutus loaded multimedia post object with data
     */
    SET_ABOUTUS(state,aboutus){
        //Set multimedia post data
        state.aboutus = aboutus
    },

    /**
     * Mutation to set the loaded multimedia posts list in the state.
     * @param {*} state vuex state object
     * @param {*} aboutuss loaded multimedia posts list with objects containing multimedia post data
     */

    SET_ABOUTUSS(state,aboutuss){
        //Set loaded multimedia posts list
        state.aboutuss = aboutuss
    },

    /**
     * Mutation to filter the state's multimedia posts effectively deleting them.
     * @param {*} state vuex state object
     * @param {*} hdid id of the multimedia post being deleted
     */
    DELETE_ABOUTUS(state,hdid){
        state.aboutuss = state.aboutuss.filter(aboutuss => aboutuss.hdid !== hdid)
    },

    /**
     * Mutation to add a new multimedia post to the state's multimedia post list.
     * @param {*} state vuex state object
     * @param {*} aboutus Object with the information of the multimedia post being added.
     */
    ADD_ABOUTUS(state,aboutus){
        state.aboutuss.push(aboutus)
    },

    /**
     * Mutation to set the information of the updated multimedia post in the state's multimedia posts list.
     * @param {*} state vuex state object
     * @param {*} aboutus multimedia post Object with the information of the multimedia post being updated
     */
    UPDATE_ABOUTUS(state,aboutus){
        const index = state.aboutuss.findIndex(arraboutus => arraboutus.hdid === aboutus.hdid)
        if(index !== -1){
            //Substitute the old multimedia post with the update multimedia post
            state.aboutuss.splice(index,1,aboutus)
        }
    }
}