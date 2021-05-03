// Your code here
let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
let createEmployeeRecords = function(employeeData) {
    return employeeData.map(function(row){
        return createEmployeeRecord(row)
    })
}
let createTimeInEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee

}
let createTimeOutEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}
let hoursWorkedOnDate = function(employee, dateWorked) {
    let inTime = employee.timeInEvents.find(function(e){
        return e.date === dateWorked
    })
    let outTime = employee.timeOutEvents.find(function(e){
        return e.date === dateWorked
    })
    return (outTime.hour - inTime.hour) /100
}
let wagesEarnedOnDate = function(employee, dateWorked) {
    let wage = hoursWorkedOnDate(employee, dateWorked) * employee.payPerHour
    return wage
}
let allWagesFor = function(employee) {
    let dates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let totalWage = dates.reduce(function(acc, date){
        return acc + wagesEarnedOnDate(employee, date)
    }, 0)
    return totalWage
}
let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, employee){
        return memo + allWagesFor(employee)
    }, 0)
}
let findEmployeeByFirstName = function(arr, firstName) {
    return arr.find(function(rec){
        return rec.firstName === firstName
    })
}
