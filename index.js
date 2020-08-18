// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour] ){
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arr){
  return arr.map(createEmployeeRecord)
}

function createTimeInEvent(guy,dateStamp){
  let hour = parseInt(dateStamp.split(" ")[1])
  let date = dateStamp.split(" ")[0]
  guy.timeInEvents.push({type: "TimeIn", hour: hour, date: date})
  return guy
}

function createTimeOutEvent(guy,dateStamp){
  let hour = parseInt(dateStamp.split(" ")[1])
  let date = dateStamp.split(" ")[0]
  guy.timeOutEvents.push({type: "TimeOut", hour: hour, date: date})
  return guy
}

function hoursWorkedOnDate(guy,dateStamp){
  let date = dateStamp.split(" ")[0]
  let inEvent = guy.timeInEvents.find((e)=>{
    return (e.date === date)
  })

  let outEvent = guy.timeOutEvents.find((e)=> (e.date === date))

  let hours = parseInt(outEvent.hour) - parseInt(inEvent.hour)
  
  return hours / 100
  
}

function wagesEarnedOnDate(guy, dateStamp){
  let hours = hoursWorkedOnDate(guy,dateStamp)
  return guy.payPerHour * hours
}

function allWagesFor(guy){
  return guy.timeInEvents.reduce((tot,val)=>{
    return tot + wagesEarnedOnDate(guy,val.date)
  },0)
}

function findEmployeeByFirstName(arr, firstName){
  return arr.find((e)=> e.firstName === firstName)
}

function calculatePayroll(arr){
  return arr.reduce((tot,man)=>{
      return tot + allWagesFor(man)
  },0)
}