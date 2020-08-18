function createEmployeeRecord(array) {
    const employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee;
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord);
}

function createTimeInEvent(emp, time) {
    const dateTime = time.split(" ")
    const timeObj = {type: "TimeIn", date: dateTime[0], hour: parseInt(dateTime[1], 10)};
    emp.timeInEvents.push(timeObj);
    return emp;
}

function createTimeOutEvent(emp, time) {
    const dateTime = time.split(" ")
    const timeObj = {type: "TimeOut", date: dateTime[0], hour: parseInt(dateTime[1], 10)};
    emp.timeOutEvents.push(timeObj);
    return emp;
}

function hoursWorkedOnDate(emp, date) {
    const dateIn = emp.timeInEvents.find(x => x.date === date);
    const dateOut = emp.timeOutEvents.find(x => x.date === date);
    return (dateOut.hour - dateIn.hour) * 0.01;
}

function wagesEarnedOnDate(emp, date) {
    const hours = hoursWorkedOnDate(emp, date);
    return hours * emp.payPerHour;
}

function allWagesFor(emp) {
    // let pay = 0;
    // for (const day of emp.timeInEvents) {
    //     pay += wagesEarnedOnDate(emp, day.date);
    // }
    // return pay;
    return emp.timeInEvents.reduce((acc, cur) => acc + wagesEarnedOnDate(emp, cur.date), 0)
}

function calculatePayroll(emps) {
    return emps.reduce((acc, cur) => acc + allWagesFor(cur), 0)
}

function findEmployeeByFirstName(emps, name) {
    return emps.find(x => x.firstName === name);
}
