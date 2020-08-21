function createEmployeeRecord(argument = [string, string, string, number]){
    const record = {
        firstName:argument[0],
        familyName:argument[1],
        title: argument[2],
        payPerHour: argument[3],
        timeInEvents: [],
        timeOutEvents: [],};
        return record
    }

    function createEmployeeRecords(array){
      let object = array.map(createEmployeeRecord)
      let arrayOfObjects = []
       arrayOfObjects.push(object)
      let newArray = arrayOfObjects.reduce((accumulator,currentValue) => {
          return accumulator + currentValue
      });
      return newArray
    }

    function createTimeInEvent(employeeRecord, date){
        let year = date.split(" ")[0]
        let time = parseInt(date.split(" ")[1])
        const object = {
            type: "TimeIn",
            hour: time,
            date: year
        };
       employeeRecord.timeInEvents.push(object)
      
       return employeeRecord  
    }

    function createTimeOutEvent(employeeRecord, date){
        let year = date.split(" ")[0]
        let time = parseInt(date.split(" ")[1])
        const object = {
            type: "TimeOut",
            hour: time,
            date: year
        };
       employeeRecord.timeOutEvents.push(object)
      //console.log(employeeRecord)
       return employeeRecord  
    }

function hoursWorkedOnDate(employeeRecord, date){
    let timeIn = employeeRecord.timeInEvents.filter((record) => record.date === date)[0]['hour']
    let timeOut = employeeRecord.timeOutEvents.filter((record) => record.date === date)[0]['hour']
    let hoursWorked = timeOut - timeIn
return hoursWorked / 100
}

function wagesEarnedOnDate(employeeRecord, date){
    //console.log(employeeRecord)
    let hours = hoursWorkedOnDate(employeeRecord, date)
    let payPerHour = employeeRecord.payPerHour
    let payOwed = hours * payPerHour
    return payOwed
}

function allWagesFor(employeeRecord){
    //1 accumulate all dates together
    //2 multiplu those dates by the wagesEarnedOnDate function
    //3 return the value
    let allDates= employeeRecord.timeInEvents.map((oneDay) =>  oneDay.date) //returns all the dates in an array
    //console.log(allMoneyfromDates) 
    let allWages = allDates.reduce((acc, cv) => acc + wagesEarnedOnDate(employeeRecord, cv),0)
    //let allWages = allMoneyfromDates[0] + allMoneyfromDates[1]
    return allWages
}

function calculatePayroll(employeeRecordArray){ 
   //let allMoneyTwo = employeeRecordArray.map((employeeRecord) => allWagesFor(employeeRecord))
   //let allMoneyTwo = employeeRecordArray.map((date) => wagesEarnedOnDate(date))
  //console.log(allMoneyTwo)
    return employeeRecordArray.reduce((accumulator,currentValue) => accumulator + allWagesFor(currentValue),0);
    
}

function findEmployeeByFirstName(employeeRecord, firstName){
    //console.log(employeeRecord)
    //console.log(firstName)
    // if (firstName === employeeRecord.firstName){
    //     return firstName
    // }else{
    //     return undefined
    // }
    return employeeRecord.find((person) => person.firstName === firstName)
    
}