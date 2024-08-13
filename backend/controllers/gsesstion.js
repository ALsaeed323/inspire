import crypto from 'crypto';

/**
 * Generate a secure random session ID.
 * @param {number} length - The length of the session ID.
 * @returns {string} - The generated session ID.
 */
function generateSessionId(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

export default generateSessionId;
