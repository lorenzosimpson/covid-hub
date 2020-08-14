export const formatDate = function(date) {
    const arr = date.split('-')
    const year = arr[0]
    const month = arr[1]
    const day = arr[2]
  
    return `${month}/${day}/${year}`
  }
  var covid_world_timeline = window.covid_world_timeline;
      
  var worldLen = covid_world_timeline.length
  var mapData = covid_world_timeline[worldLen - 1].list // Data from the latest day
  export const dataDate = formatDate(covid_world_timeline[worldLen-1].date)