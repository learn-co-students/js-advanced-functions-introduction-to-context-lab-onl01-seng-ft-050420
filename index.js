function createEmployeeRecord(arr){
    let employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee;
};

function createEmployeeRecords(arr){
    let employees = arr.map(e => createEmployeeRecord(e))
    return employees;
};

function createTimeInEvent(obj,dateTime){
    let date = dateTime.split(' ')[0];
    let hour = dateTime.split(' ')[1];
    obj.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour),
        date: date,
    })
    return obj
};

function createTimeOutEvent(obj, dateTime){
    let date = dateTime.split(' ')[0];
    let hour = dateTime.split(' ')[1];
    obj.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date,
    })
    return obj
};

function hoursWorkedOnDate(obj, dateTime){
    let timeIn = obj.timeInEvents.find(day => day.date === dateTime)
    let hourIn = timeIn.hour
    
    let timeOut = obj.timeOutEvents.find(day => day.date === dateTime)
    let hourOut = timeOut.hour
    
    const hours = (hourOut / 100) - (hourIn / 100);
    return hours;
}

function wagesEarnedOnDate(obj, dateTime) {
    return hoursWorkedOnDate(obj, dateTime) * obj.payPerHour
}

function allWagesFor(obj){
    const daysWorked = obj.timeInEvents.map(function(e) {
        return e.date
    })

    const wages = daysWorked.map(function(day){
        return wagesEarnedOnDate(obj, day)
    })
    
    const moneyOwed = wages.reduce((acc,total) => total + acc, 0)

    return moneyOwed
};

function findEmployeeByFirstName(srcArray,name){
    return srcArray.find(function(employee){
        return employee.firstName === name
    })
};

function calculatePayroll(arr) {
    const allWages = arr.map(function(employee){
        return allWagesFor(employee)
    });

    const payroll = allWages.reduce((acc,total) => acc + total, 0)

    return payroll;
}
