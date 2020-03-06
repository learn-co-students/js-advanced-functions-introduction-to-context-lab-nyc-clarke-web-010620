let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arrayOfArrays) {
    return arrayOfArrays.map(
        array => createEmployeeRecord(array)
    )
}

let createTimeInEvent = function(employeeRecord, event){
    let parsedEvent = event.split(' ')
    let formattedEvent = {type: "TimeIn", date: parsedEvent[0], hour: parseInt(parsedEvent[1])}
    employeeRecord.timeInEvents.push(formattedEvent)
    return employeeRecord
}

let createTimeOutEvent = function(employeeRecord, event){
    let parsedEvent = event.split(' ')
    let formattedEvent = {type: "TimeOut", date: parsedEvent[0], hour: parseInt(parsedEvent[1])}
    employeeRecord.timeOutEvents.push(formattedEvent)
    return employeeRecord
}

let hoursWorkedOnDate = function(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date)
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date)
    // debugger
    if (timeOut === undefined || timeIn === undefined) {
        return 0
    }
    else {
        return (timeOut.hour - timeIn.hour)/100
    }
}

let wagesEarnedOnDate = function(employeeRecord, date) {
    return (hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour)
}

let allWagesFor = function(employeeRecord){
    let wagesArray = employeeRecord.timeInEvents.map(event => wagesEarnedOnDate(employeeRecord, event.date))
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    // debugger
    return wagesArray.reduce(reducer, 0)
}

let calculatePayroll = function(employeeArray){
    return employeeArray.reduce(function(memo, employee){
        return memo + allWagesFor(employee)
    }, 0)
}

let findEmployeeByFirstName = function(employeeArray, name){
    return employeeArray.find(employee => employee.firstName === name)
}