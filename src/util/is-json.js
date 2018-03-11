module.exports = function(data) {
  try {
    JSON.parse(data)
    return true
  } catch(err) {  
    return false
  }
}