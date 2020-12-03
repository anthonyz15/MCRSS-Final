/**
 * Vuex store for multimedias, with actions, mutations, getters and state.
 * @module aboutus
 */

export default() =>({
    /**
     * Loaded multimedia post
     */
    aboutus: null, //Used in the single multimedia post viewer page.
    /**
     * List of all multimedia posts.
     */
    aboutuss: [],//Used in in the all multimedia posts viewer page.
})