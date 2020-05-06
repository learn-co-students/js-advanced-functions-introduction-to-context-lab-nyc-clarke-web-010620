
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    } 
}

function createEmployeeRecords(array) {
    return array.map(function(employeeRecord){
        return createEmployeeRecord(employeeRecord)
    }) 
}

function createTimeInEvent(employeeRecord, timestamp) {
    let [date, hour] = timestamp.split(' ')
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date 
    });
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timestamp) {
    let [date, hour] = timestamp.split(' ')
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date 
    });
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    let inEvent = employeeRecord.timeInEvents.find(function(e) {
        return e.date === date
    })
    let outEvent = employeeRecord.timeOutEvents.find(function(e) {
        return e.date === date
    })
    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, date) {
   let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
   let wage = employeeRecord.payPerHour
   let rawWage = hoursWorked * wage
   return parseFloat(rawWage.toString())
}

function allWagesFor(employeeRecord) {
    let dates = employeeRecord.timeInEvents.map(function(e) {
        return e.date
    })
    let payable = dates.reduce(function(total, date) {
        return total + wagesEarnedOnDate(employeeRecord, date)
    }, 0)
    return payable;
}

function calculatePayroll(employeeRecords) {
    let payable = employeeRecords.reduce(function(total, employeeRecord) {
        return total + allWagesFor(employeeRecord)
    }, 0)
    return payable
}

function findEmployeeByFirstName(array, employee) {
    let query = array.find(function(e) {
        return e.firstName === employee
    })
    return query;
}