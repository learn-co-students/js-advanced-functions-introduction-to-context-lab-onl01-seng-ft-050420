// Your code here
function createEmployeeRecord(array){
  return {
    firstName: array[0],
    familyName: array[1],
    title:  array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(array){
  return array.map(element => createEmployeeRecord(element))
}

function createTimeInEvent(obj, ds){
  let dateTime = ds.split(' ')
  obj.timeInEvents.push(
    {
      type: 'TimeIn',
      hour: parseInt(dateTime[1]),
      date: dateTime[0]
    })
    return obj
}

function createTimeOutEvent(obj, ds){
  let dateTime = ds.split(' ')
  obj.timeOutEvents.push(
    {
      type: 'TimeOut',
      hour: parseInt(dateTime[1]),
      date: dateTime[0]
    })
    return obj
}

function hoursWorkedOnDate(obj, ds){
  function time(element){
    return (element.date === ds);
  }
  
  
  let timeIn = obj.timeInEvents.find(time)
  let timeOut = obj.timeOutEvents.find(time)
  
  return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(obj, ds){
  let hoursWorked = hoursWorkedOnDate(obj, ds)
  let pay = obj.payPerHour
  return (hoursWorked * pay)
}

function allWagesFor(obj){
  let days = obj.timeInEvents.map(element => element.date)
  let wages = days.map(element => wagesEarnedOnDate(obj, element))
  return wages.reduce(function(total, element){return element + total},0);
}

function findEmployeeByFirstName(srcArray, firstName){
  function match(element){
    return (element.firstName === firstName);
  }
  return srcArray.find(match)
}

function calculatePayroll(arr){
  return arr.reduce(function(total,element){return allWagesFor(element) + total}, 0);
}


