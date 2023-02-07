import jwtDecode from 'jwt-decode';
import AuthHelper from '../helpers/auth.helper';
import User from '../models/user';

const { compareHash, addTokenToData, hashPassword, verifyToken } = AuthHelper;
/**
 * @Class UserServices
 * @Brief contains all services for user
 */
class UserServices {
  /**
   * Logs in a user
   * @param {Object} body - request body
   * @returns {Object} - response object
   */
  static async login(body) {
    const { username, password } = body;
    const { hashedPassword, salt, ...user } = await User.findOne({ username });
    if (user && compareHash(password, hashedPassword, salt)) {
      const token = addTokenToData({
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        superAdmin: user.superAdmin,
        local: user.local
      });
      return {
        status: 200,
        message: 'User logged in successfully',
        data: { user, token }
      };
    }
    return {
      status: 401,
      message: 'Invalid credentials',
      data: null
    };
  }

  /**
   * Creates a new user
   * @param {Object} body
   * @returns {Object} - response object
   */
  static async signUp(body) {
    try {
      const { password, ...rest } = body;
      const { salt, hash } = hashPassword(password);
      const user = await User.create({
        salt,
        hashedPassword: hash,
        ...rest
      });

      return {
        status: 201,
        message: 'User created successfully',
        data: user
      };
    } catch (e) {
      return {
        status: 400,
        message: e.message,
        data: null
      };
    }
  }

  /**
   * Resets a user's password
   * @param {Object} body - request body
   * @param {String} token - token
   * @returns {Object} response object
   */
  static async resetPassword(body, token) {
    try {
      if (verifyToken(token)) {
        const { salt, hash } = hashPassword(body.password);
        const userObj = jwtDecode(token);
        const user = await User.findOneAndUpdate(
          { username: userObj.username },
          {
            salt,
            hashedPassword: hash
          }
        );
        return {
          status: 201,
          message: 'Password reset successfully',
          data: user
        };
      }
    } catch (e) {
      return {
        status: 400,
        message: e.message,
        data: null
      };
    }
  }
}

export default UserServices;
