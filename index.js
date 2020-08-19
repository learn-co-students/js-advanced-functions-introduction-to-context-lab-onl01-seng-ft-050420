
function createEmployeeRecord(employeeInfoArray) {
    const employeeInfo = {
        firstName: employeeInfoArray[0],
        familyName: employeeInfoArray[1], 
        title: employeeInfoArray[2], 
        payPerHour: employeeInfoArray[3], 
        timeInEvents: [], 
        timeOutEvents: []
    }
    return Object.assign( {}, employeeInfo)
}

function createEmployeeRecords(nestedEmployeesInfoArray) {
   return nestedEmployeesInfoArray.map( a => createEmployeeRecord(a) )
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const dateArray = dateStamp.split(' ')
    const date = dateArray[0]
    const hour = parseInt(dateArray[dateArray.length - 1], 10)

    const timeIn = {
        type: "TimeIn", 
        hour: hour, 
        date: date
    }
    employeeRecord.timeInEvents.push( Object.assign( {}, timeIn ) )

    return employeeRecord

} 

function createTimeOutEvent(employeeRecord, dateStamp) {
    const dateArray = dateStamp.split(' ')
    const date = dateArray[0]
    const hour = parseInt(dateArray[dateArray.length - 1], 10)

    const timeOut = {
        type: "TimeOut", 
        hour: hour, 
        date: date
    }

    employeeRecord.timeOutEvents.push( Object.assign( {}, timeOut ) )

    return employeeRecord

} 

function hoursWorkedOnDate(employeeRecord, dateWorked) {
    const dateIndex = employeeRecord.timeInEvents.findIndex( e => e.date === dateWorked )
    const punchedInTime = employeeRecord.timeInEvents[dateIndex].hour
    const punchedOutTime = employeeRecord.timeOutEvents[dateIndex].hour
    return parseInt( ( removeDoubleZeros(punchedOutTime) - removeDoubleZeros(punchedInTime) ), 10)
} 

function wagesEarnedOnDate(employeeRecord, dateWorked) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, dateWorked)
    
    return hoursWorked * employeeRecord.payPerHour
} 

function allWagesFor(employeeRecord) {
   const wagesArray = employeeRecord.timeInEvents.map( e => {
        return wagesEarnedOnDate(employeeRecord, e.date)
    })
    return wagesArray.reduce( (a, c) => a + c ) 
    
} 

function findEmployeeByFirstName(allEmployeeArray, firstName) {
    return allEmployeeArray.find( e => e.firstName === firstName )
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.map(e => allWagesFor(e)).reduce( (a, c) => a + c )
}

// HELPER FUNCTIONS 

function removeDoubleZeros(num) {
    return num.toString().replace( "00", "")
}