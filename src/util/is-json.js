/**
 * Dirty wrapper to check if data is json format
 */

module.exports = function(data) {
  try {
    JSON.parse(data)
    return true
  } catch(err) {  
    return false
  }
}