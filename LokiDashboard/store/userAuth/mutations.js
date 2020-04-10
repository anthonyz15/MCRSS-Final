//Mutations are how you modify the state of the app.
export default {
  SET_USER_DATA(state, userData) {
    //Set user data
    state.user = this.$auth.user.User

    console.log(this.$auth.loggedIn)

    //Set axios headers to contain the auth token by editing default axios config.
    this.$axios.defaults.headers.common['Authorization'] = `${userData.auth.token}`
  },
  CLEAR_USER_DATA() {
    console.log('logout commit')
    this.$auth.logout()
    // //Clear userdata in local storage.
    localStorage.removeItem('user')
  },
}