// Your code here
// const testArea = document.getElementById('test-area')

// const testArray = ["Gray", "Worm", "Security", 1]
// createEmployeeRecord(testArray)

function createEmployeeRecord(array){
    const employee = array
    const [firstName, familyName, title, payPerHour] = employee
    const timeInEvents = []
    const timeOutEvents = []
    //explain test expectations more clearly please. ^ all this is actually not needed.
    const employeeRecord = {
        'firstName': firstName,
        'familyName': familyName,
        'title': title,
        'payPerHour': payPerHour,
        'timeInEvents': timeInEvents,
        'timeOutEvents': timeOutEvents
    }
    //console.log(employeeRecord)
    return employeeRecord
}

// let testArrays = [
//     ["moe", "sizlak", "barkeep", 2],
//     ["bartholomew", "simpson", "scamp", 3]
// ]
// createEmployeeRecords(testArrays)

function createEmployeeRecords(arrays){
    let employeeRecords = []
    arrays.forEach(array => {
        employeeRecords.push(createEmployeeRecord(array))
    })
    //console.log(employeeRecords)
    return employeeRecords
}

function createTimeInEvent(record, punch){
    //explain test expectations more clearly please
    const punchRecord = {
        type: 'TimeIn',
        date: punch.split(' ')[0],
        hour: parseInt(punch.split(' ')[1])
    }
    record.timeInEvents.push(punchRecord)
    return record
}

function createTimeOutEvent(record, punch){
    const punchRecord = {
        type: 'TimeOut',
        date: punch.split(' ')[0],
        hour: parseInt(punch.split(' ')[1])
    }
    record.timeOutEvents.push(punchRecord)
    return record
}

function hoursWorkedOnDate(record, date){
    const timeInRecord = record.timeInEvents.filter(e => e.date === date)[0]
    const timeOutRecord = record.timeOutEvents.filter(e => e.date === date)[0]
    return (timeOutRecord.hour - timeInRecord.hour) / 100
}

function wagesEarnedOnDate(record, date){
    const hours = hoursWorkedOnDate(record, date)
    return hours * record.payPerHour
}

function allWagesFor(record){
    const datesWorked = record.timeInEvents.map(e => e.date)
    let totalWages = datesWorked.map(
        date => wagesEarnedOnDate(record, date)
        ).reduce((a,b) => a+b, 0)
    return totalWages
}

function calculatePayroll(array){
    let payroll = array.map(
        record => allWagesFor(record)
        ).reduce((a,b) => a+b, 0)
    return payroll
}

function findEmployeeByFirstName(records, name){
    return records.filter(record => record.firstName === name)[0]
}
