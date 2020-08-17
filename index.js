// Your code here
function createEmployeeRecord(record) {
  return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(record => createEmployeeRecord(record))
}

function createTimeEvent(type, dateTimeStamp) {
  const [date, time] = dateTimeStamp.split(' ')
  return { type: type, hour: parseInt(time, 10), date: date }
}

function createTimeInEvent(record, dateTimeStamp) {
  record.timeInEvents.push(createTimeEvent('TimeIn', dateTimeStamp))
  return record
}

function createTimeOutEvent(record, dateTimeStamp) {
  record.timeOutEvents.push(createTimeEvent('TimeOut', dateTimeStamp))
  return record
}

function hoursWorkedOnDate(record, dateStamp) {
  const timeIn = record.timeInEvents.find(e => e.date === dateStamp)
  const timeOut = record.timeOutEvents.find(e => e.date === dateStamp)
  return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(record, dateStamp) {
  return hoursWorkedOnDate(record, dateStamp) * record.payPerHour
}

function allWagesFor(record) {
  return record.timeOutEvents.reduce((total, timeEvent) => {
    return total + wagesEarnedOnDate(record, timeEvent.date)
  }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(record => record.firstName === firstName)
}

function calculatePayroll(records) {
  return records.reduce((total, record) => total + allWagesFor(record), 0)
}
