/**
 * Vuex store for multimedias, with actions, mutations, getters and state.
 * @module multimedias
 */

export default{
    /**
     * Getter for loaded multimedia post state.
     */
    multimedia: state => state.multimedia,
    /**
     * Getter for loaded multimedia posts state.
     */
    multimedias: state => state.multimedias,

    text: state => state.text,

    live: state => state.live,

}