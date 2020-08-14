function createEmployeeRecord(array){
    const obj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}

function createEmployeeRecords(array){
    const newHash = array.map( x => createEmployeeRecord(x))
    return newHash
}

function createTimeInEvent(hash, time){
    let timeDate = time.split('').slice(0, 10).join('')
    let timeHour = parseInt(time.split('').slice(-4).join(''))
    let newHash =  {
        type: 'TimeIn',
        date: timeDate,
        hour: timeHour
    }

   hash.timeInEvents.push(newHash)
   return hash
}

function createTimeOutEvent(hash, time){
    let timeDate = time.split('').slice(0, 10).join('')
    let timeHour = parseInt(time.split('').slice(-4).join(''))
    let newHash =  {
        type: 'TimeOut',
        date: timeDate,
        hour: timeHour
    }

    hash.timeOutEvents.push(newHash)
    return hash
}

function hoursWorkedOnDate(emp, date){
    let hourIn = emp.timeInEvents.find((x) => x.date === date).hour
    let hourOut = emp.timeOutEvents.find((x) => x.date === date).hour
    let hourWorked = (hourOut - hourIn)/100
    return hourWorked
}

function wagesEarnedOnDate(emp, date){
    const wageForDay = hoursWorkedOnDate(emp, date) * emp.payPerHour
    return wageForDay
}

function allWagesFor(emp){
    // let total = 0
    // for (let x of emp.timeInEvents){
    //     total = total + wagesEarnedOnDate(emp, x.date)
    // }
    // return total
    let total = emp.timeInEvents.reduce((acc, num) => {
        return acc + wagesEarnedOnDate(emp, num.date)
    }, 0)
    return total
}

function calculatePayroll(empArray){
    // let total = 0
    // for (let x of empArray){
    //     total = total + allWagesFor(x)
    // }

    let total = empArray.reduce((acc, num) => {
        return acc + allWagesFor(num)
    }, 0)
    return total
}

function findEmployeeByFirstName(empArray, emp){
    return empArray.find((x) => x.firstName === emp)
}
