/**
 * Vuex store for multimedias, with actions, mutations, getters, and state.
 * @module aboutus
 */

export default{

    /**
     * Mutation to set the loaded about us element's data in the state.
     * @param {*} state vuex state object
     * @param {*} aboutus loaded about us element object with data
     */
    SET_ABOUTUS(state,aboutus){
        state.aboutus = aboutus
    },

    /**
     * Mutation to set the loaded about us elemnets list in the state.
     * @param {*} state vuex state object
     * @param {*} aboutuss loaded about us elements list with objects containing about us element data
     */

    SET_ABOUTUSS(state,aboutuss){
        state.aboutuss = aboutuss
    },

    /**
     * Mutation to filter the state's about us elements effectively deleting them.
     * @param {*} state vuex state object
     * @param {*} hdid id of the about us element being deleted
     */
    DELETE_ABOUTUS(state,hdid){
        state.aboutuss = state.aboutuss.filter(aboutuss => aboutuss.hdid !== hdid)
    },

    /**
     * Mutation to add a new about us element to the state's about us element list.
     * @param {*} state vuex state object
     * @param {*} aboutus Object with the information of the about us element being added.
     */
    ADD_ABOUTUS(state,aboutus){
        state.aboutuss.push(aboutus)
    },

    /**
     * Mutation to set the information of the updated about us element in the state's about us elements list.
     * @param {*} state vuex state object
     * @param {*} aboutus Object with the information of the about us element being updated
     */
    UPDATE_ABOUTUS(state,aboutus){
        const index = state.aboutuss.findIndex(arraboutus => arraboutus.hdid === aboutus.hdid)
        if(index !== -1){
            state.aboutuss.splice(index,1,aboutus)
        }
    }
}
