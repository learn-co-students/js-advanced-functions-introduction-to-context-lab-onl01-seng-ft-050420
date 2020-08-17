function createEmployeeRecord(ary) {
    return {
        firstName: ary[0],
        familyName: ary[1],
        title: ary[2],
        payPerHour: ary[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(element =>  createEmployeeRecord(element))
}

function createTimeInEvent(record, dateTime) {
    const dateTimeAry = dateTime.split(' ')
    const timeInObj = {
        date: dateTimeAry[0],
        hour: parseInt(dateTimeAry[1], 10),
        type: 'TimeIn'
    }
    record.timeInEvents.push(timeInObj)
    return record
}

function createTimeOutEvent(record, dateTime) {
    const dateTimeAry = dateTime.split(' ')
    const timeOutObj = {
        date: dateTimeAry[0],
        hour: parseInt(dateTimeAry[1], 10),
        type: 'TimeOut'
    }
    record.timeOutEvents.push(timeOutObj)
    return record
}

function hoursWorkedOnDate(record, date) {
    const timeInEvent = record.timeInEvents.find(element => element.date === date)
    const timeOutEvent = record.timeOutEvents.find(element => element.date === date)
    return (timeOutEvent.hour - timeInEvent.hour) / 100
}

function wagesEarnedOnDate(record, date) {
    const hours = hoursWorkedOnDate(record, date)
    return record.payPerHour * hours;
}

function allWagesFor(record) {
    const dateAry = record.timeInEvents.map(element => element.date)
    return dateAry.reduce(function(memo, i) {
         return memo + wagesEarnedOnDate(record, i)
        }, 0)
}

function findEmployeeByFirstName(recordsAry, fName) {
    return recordsAry.find(element => element.firstName = fName)
}

function calculatePayroll(recordsAry) {
    return recordsAry.reduce(function(memo, i) {
         return memo + allWagesFor(i) }, 0)
}
// Returns
// Sum of pay owed to all employees for all dates, as a number
// Behavior
// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.