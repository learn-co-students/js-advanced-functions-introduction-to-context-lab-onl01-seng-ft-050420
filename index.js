// Your code here
function createEmployeeRecord(infoArr){
    return {firstName: infoArr[0], 
        familyName: infoArr[1], 
        title: infoArr[2], 
        payPerHour: infoArr[3], 
        timeInEvents: [],
        timeOutEvents: []}
    

};

function createEmployeeRecords(arrOfArr){
    let records = []
    for (let arr of arrOfArr) {
        records.push(createEmployeeRecord(arr))
    }
    return records
};

function createTimeInEvent(record, time){
    let dateAndHour = time.split(' ');
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateAndHour[1]),
        date: dateAndHour[0]
    });
    
    return record
};

function createTimeOutEvent(record, time){
    let dateAndHour = time.split(' ');
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateAndHour[1]),
        date: dateAndHour[0]
    });
    return record
};

function hoursWorkedOnDate(record, date) {
    if (record.timeInEvents[0].date === date) {
        let hoursWorked =  record.timeOutEvents[0].hour - record.timeInEvents[0].hour;
        return hoursWorked/100
    };
  };

function wagesEarnedOnDate(record,date) {
    return hoursWorkedOnDate(record,date) * record.payPerHour
};

function findEmployeeByFirstName(arrRecords, firstName ){
    return arrRecords.find(elem => elem.firstName === firstName)
 };

function allWagesFor(record){
    let allDates = record.timeInEvents.map(function (eachDate) {
        return eachDate.date
    });
    let payable = allDates.reduce(function(total, d){
        return total + wagesEarnedOnDate(record, d) 
    }, 0)
    return payable
};



function calculatePayroll(arrRecords){
   return arrRecords.reduce(function(total, r){
       return total + allWagesFor(r),
       0
   })
};

