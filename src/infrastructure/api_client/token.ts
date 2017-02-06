let token = localStorage.getItem('token')

export default {
  get token() {
    return token
  },
  set token(newToken) {
    token = newToken
    if (!newToken) {
      localStorage.removeItem('token')
    } else {
      localStorage.setItem('token', newToken)
    }
  }
}
