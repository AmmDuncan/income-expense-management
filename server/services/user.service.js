import AuthHelper from '../helpers/auth.helper';
import User from '../models/user';
import GenServices from './generic.service';

const { compareHash, addTokenToData, hashPassword, verifyToken } = AuthHelper;
const { resolveAggregateQueryPagination } = GenServices;
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
   * @param {Object} body - request body
   * @returns {Object} - response object
   */
  static async signUp(body, token) {
    const userObj = verifyToken(token);
    if (userObj.superAdmin) {
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
    }
    return {
      status: 403,
      message: 'You do not have enough permissions',
      data: null
    };
  }

  /**
   * Creates a superuser
   * @param {Object} body - request body
   * @returns {Object} response
   */
  static async createSuperUser(body) {
    const { password, ...rest } = body;
    const { salt, hash } = hashPassword(password);
    const user = await User.create({
      salt,
      hashedPassword: hash,
      superAdmin: true,
      ...rest
    });
    return {
      status: 201,
      message: 'Superuser created successfully',
      data: user
    };
  }

  /**
   * Resets a user's password
   * @param {Object} body - request body
   * @param {String} token - token
   * @returns {Object} response object
   */
  static async resetPassword(body, token) {
    if (verifyToken(token)) {
      const { salt, hash } = hashPassword(body.password);
      const userObj = verifyToken(token);
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
    return {
      status: 403,
      message: "You don't have enough permissions",
      data: null
    };
  }

  /**
   * Fetches all users
   * @param {Number} page - page number
   * @returns {Promise | null}
   */
  static async fetchAllUsers(page) {
    return User.aggregate([
      {
        $match: {}
      },
      ...resolveAggregateQueryPagination(page)
    ]);
  }

  /**
   * Search feature
   * @param {String} keyword
   * @param {Number} page - page number
   * @returns {Promise | null}
   */
  static async searchAllUsers(keyword, page) {
    return User.aggregate([
      {
        $match: {
          username: { $regex: keyword, $options: 'i' }
        }
      },
      ...resolveAggregateQueryPagination(page)
    ]);
  }
}

export default UserServices;
