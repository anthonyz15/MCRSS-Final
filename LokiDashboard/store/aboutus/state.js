/**
 * Vuex store for multimedias, with actions, mutations, getters, and state.
 * @module aboutus
 */

export default() =>({
    /**
     * Loaded about us element
     */

    aboutus: null, //Used in the single about us element viewer page.
    /**
     * List of all about us elements.
     */
    aboutuss: [],//Used in in the all about us elements viewer page.
})
