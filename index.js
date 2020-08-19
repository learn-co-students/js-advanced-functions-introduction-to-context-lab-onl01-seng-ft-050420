function createEmployeeRecord (array) {
    const record = Object.create({firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3], timeInEvents: [], timeOutEvents: []});
    return record;
}
//[ ["moe", "sizlak", "barkeep", 2],
//["bartholomew", "simpson", "scamp", 3] ]
function createEmployeeRecords (arrays) {
    let employeeRecords = []
    arrays.forEach(array => {
        employeeRecords.push(createEmployeeRecord(array))
    })
    return employeeRecords
}
//["Byron", "Poodle", "Mascot", 3], "2014-02-28 1400"
function createTimeInEvent(empObj, date) {
    //return emp record
    let array = date.split(' ')
    empObj.timeInEvents.push({type: "TimeIn", hour: parseInt(`${array[1]}`), date: `${array[0]}`})
    return empObj
}

function createTimeOutEvent(empObj, date) {
    let array = date.split(' ')
    empObj.timeOutEvents.push({type: "TimeOut", hour: parseInt(`${array[1]}`), date: `${array[0]}`})
    return empObj
}

function hoursWorkedOnDate(empObj, dateInput) {
    let hoursIn = [];
    let hoursOut = [];
    empObj.timeInEvents.forEach(obj => {
        if (obj.date === dateInput) {
            hoursIn.push(obj.hour)
        }
    });
    empObj.timeOutEvents.forEach(obj => {
        if (obj.date === dateInput) {
            hoursOut.push(obj.hour)
        }
    });
   let hoursWorked = [];
    for (let i = 0; i < hoursIn.length; i++){
        hoursWorked.push((hoursOut[i] - hoursIn[i])/100)
    }
    let finalHours  = hoursWorked.reduce(function(total, current) {
        return current + total;
    });

    return finalHours;
}
//["Julius", "Caesar", "General", 27]
function wagesEarnedOnDate(empObj, date) {
    //pay owed
    let pay = hoursWorkedOnDate(empObj, date) * empObj.payPerHour
    return pay
}
//employees.reduce((m, e) => m + allWagesFor(e), 0)
function allWagesFor(empObj) {
    let dates = [];
    empObj.timeInEvents.forEach(obj=> {
        dates.push(obj.date)
    })
    
    const unique = (value, index, self) => {
        return self.indexOf(value) === index;
    }
    let uniqDates = dates.filter(unique)
   
    
    let total = [];
    uniqDates.forEach(date => {
        total.push(wagesEarnedOnDate(empObj, date)) 
    })
    return total.reduce(function(t, v){ return t + v })
}

function findEmployeeByFirstName(empObjs, firstName){
  return empObjs.find(empObj => empObj.firstName === firstName)
}
// [ {familyName: , first, pay, timeInEvents} {other obj }]arr of hashes


function calculatePayroll(empObjs) {
    let pay = [];
    empObjs.forEach(empObj => { 
        pay.push(allWagesFor(empObj)) 
    });

    const total = pay.reduce(function(total, current)
    { return total + current })
    return total
}