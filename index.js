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
    let objTimeIn = record.timeInEvents.find(d => d.date === date )
    let objTimeOut = record.timeOutEvents.find(d => d.date === date )
    let hoursWorked = objTimeOut.hour - objTimeIn.hour;
    return hoursWorked/100
    
  };

function wagesEarnedOnDate(record,date) {
    return parseFloat(hoursWorkedOnDate(record,date) * record.payPerHour)
};

function findEmployeeByFirstName(arrRecords, firstName ){
    return arrRecords.find(elem => elem.firstName === firstName)
 };

function allWagesFor(record){
    let allDates = record.timeInEvents.map(function(eachDate){
        return eachDate.date
    });
   
    let payable = allDates.reduce(function(total, d){
        
        return total + wagesEarnedOnDate(record, d) }
    , 0);
    
    return payable
};

function findEmployeeByFirstName(arrRecords, firstName ){
    return arrRecords.find(elem => elem.firstName === firstName)
 };

function calculatePayroll(arrRecords){
    return arrRecords.map( r => allWagesFor(r) ).reduce((total, p)=> total + p);
};

