function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}

function createEmployeeRecords(array) {
  return array.map((employee) => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const timeArray = dateStamp.split(' ')
  const timeObj = {
    type: 'TimeIn',
    hour: parseInt(timeArray[1]),
    date: timeArray[0],
  }
  employeeRecord.timeInEvents.push(timeObj)
  return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  const timeArray = dateStamp.split(' ')
  const timeObj = {
    type: 'TimeOut',
    hour: parseInt(timeArray[1]),
    date: timeArray[0],
  }
  employeeRecord.timeOutEvents.push(timeObj)
  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find((event) => event.date === date)
  const timeOutEvent = employeeRecord.timeOutEvents.find((event) => event.date === date)
  return (timeOutEvent.hour - timeInEvent.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
  const payPerHour = employeeRecord.payPerHour
  return hoursWorked * payPerHour
}

function allWagesFor(employeeRecord) {
  const dates = employeeRecord.timeInEvents.map((event) => event.date)
  return dates.reduce(function (acc, curr) {
    return acc + wagesEarnedOnDate(employeeRecord, curr)
  }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName)
}

function calculatePayroll(srcArray) {
  return srcArray.reduce(function (acc, curr) {
    return acc + allWagesFor(curr)
  }, 0)
}
