export const formatDate = function(date) {
    const arr = date.split('-')
    const year = arr[0]
    const month = arr[1]
    const day = arr[2]
  
    return `${month}/${day}/${year}`
  }