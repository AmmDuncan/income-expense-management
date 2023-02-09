import bcrypt from 'bcrypt';
import { sha256 } from 'js-sha256';
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET
/**
 * @Class AuthHelper
 * @Brief Defines all the methods for authorization utilities
 */
class AuthHelper {
  /**
   * generateHash - generates the hash for a string
   * @param {String} salt - String value
   * @returns {String} - hashed string
   */
  static generateHash(salt, plain) {
    const hash = sha256.hmac.create(salt);
    hash.update(plain);
    return hash.hex();
  }

  /**
   * hashPassword - hashes the password
   * @param {String} plainPassword - String password
   * @returns {Object} - {salt, hash}
   */
  static async hashPassword(plainPassword) {
    const salt = await bcrypt.genSalt(10);
    return {
      salt,
      hash: this.generateHash(salt, plainPassword)
    };
  }

  /**
   * compareHash
   * @param {String} plain - Plain string text
   * @param {String} hash - String to compare hash to
   * @param {String} salt - Salt
   * @returns {Boolean} - True if correct , false if wrong
   */
  static compareHash(plain = '', hash = '', salt = '') {
    const hashMatch = this.generateHash(salt, plain);
    return hash === hashMatch;
  }

  /**
   * generateToken
   * @param {String} payload - String
   * @param {String} expiresIn - String to indicate time for expire
   * @returns {Object} - Jwt Signed object
   */
  static generateToken(payload, expiresIn = '10h') {
    return jwt.sign(payload, SECRET, { expiresIn });
  }

  /**
   * generateResetPasswordToken - generates reset token
   * @returns {String} - password token
   */
  static generateResetPasswordToken() {
    return chance.string({ length: 10, alpha: true, numeric: true });
  }

  /**
   * verifyToken  - verifies the token
   * @param {String} token - String
   * @returns {Boolean} - True if correct, false is wrong
   */
  static verifyToken(token) {
    return jwt.verify(token, SECRET);
  }

  /**
   * addTokenToData
   * @param {Object} data - Object data
   * @returns {Object} - Object with token attached
   */
  static addTokenToData(data) {
    return this.generateToken(data);
  }

  /**
   * generateUniquePassword - generates new string password for user
   * @returns {String} - String
   */
  static generateUniquePassword() {
    return `${Math.random().toString(32).substr(2, 9)}`;
  }

  /**
   * checkDefaultAdmin - checks default admin
   * @param {Object} defaultAdmin
   * @returns {Boolean} True if default admin
   */
  static checkDefaultAdmin(userObj) {
    return userObj.superAdmin
  }

  /**
   * sanitizeToken - sanitizes the token
   * @param {String} str - String to be sanitized
   * @returns {String}
   */
  static sanitizeToken(str) {
    /* eslint-disable */
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, '');
    return str.trim();
  }
}

export default AuthHelper;
