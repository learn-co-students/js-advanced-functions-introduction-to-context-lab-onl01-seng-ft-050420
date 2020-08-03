// Your code here
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arr) {
  return arr.map(el => createEmployeeRecord(el));
}

function createTimeInEvent(record, dateTimeStr) {
  const timeInObj = createTimeObj(dateTimeStr, 'TimeIn');
  record.timeInEvents.push(timeInObj);
  return record;
}

function createTimeOutEvent(record, dateTimeStr) {
  const timeOutObj = createTimeObj(dateTimeStr, 'TimeOut');
  record.timeOutEvents.push(timeOutObj);
  return record;
}

function createTimeObj(dateTimeStr, type) {
  const dateTimeArr = dateTimeStr.split(' ');
  return {
    type: type,
    hour: parseInt(dateTimeArr[1], 10),
    date: dateTimeArr[0]
  }
}

function hoursWorkedOnDate(record, date) {
  const timeInEvent = record.timeInEvents.find(el => el.date === date);
  const timeOutEvent = record.timeOutEvents.find(el => el.date === date);
  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(record, date) {
  const hours = hoursWorkedOnDate(record, date);
  return record.payPerHour * hours;
}

function allWagesFor(record) {
  const dateArr = record.timeInEvents.map(el => el.date);
  return dateArr.reduce(function(memo, i) {
    return memo + wagesEarnedOnDate(record, i);
  }, 0)
}

function calculatePayroll(recordsArr) {
  return recordsArr.reduce(function(memo, i) {
    return memo + allWagesFor(i);
  }, 0)
}

function findEmployeeByFirstName(recordsArr, str) {
  return recordsArr.find(el => el.firstName === str);
}