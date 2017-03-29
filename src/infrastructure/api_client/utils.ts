// jwt-decode is just a simple function, but it's provided by auth0, the group which crafted jwt.
import jwtDecoder from 'jwt-decode'

export default class Utils {
  static decodeToken( token: string ) {
    return jwtDecoder( token )
  }
}
