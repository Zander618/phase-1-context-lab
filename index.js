function createEmployeeRecord(array){
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(array){
    return array.map((e) => createEmployeeRecord(e));
  }
  
  function createTimeInEvent(dateStamp) {
    let [dates, hours] = dateStamp.split(" ");
    let inTime = {
      type: "TimeIn",
      hour: parseInt(hours),
      date: dates
    }
    
    this.timeInEvents.push(inTime)
    return this
  }
  
  function createTimeOutEvent(dates){
    let [date, hour] = dates.split(" ");
    let outTime = {
      type: "TimeOut",
      hour: parseInt(hour),
      date: date
    }
    this.timeOutEvents.push(outTime)
    return this
  }
  
  function hoursWorkedOnDate(dates){
    const inTime = this.timeInEvents.find(inTime => inTime.date === dates)
    const outTime = this.timeOutEvents.find(oTime => oTime.date === dates)
    return (outTime.hour - inTime.hour) / 100
  }
  
  function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
  }

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(sourceArray, firstName){
      return sourceArray.find(rec => rec.firstName === firstName)
}

function calculatePayroll(empRecords){
    return empRecords.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    }, 0)
}


