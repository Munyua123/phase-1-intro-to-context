// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  // This function will return objects with the keys being
  //     firstName,familyName,title,payPerHour,timeInEvents, timeOutEvents
  const employee = {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employee;
}
let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1]);

console.log(testEmployee);

function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}
createEmployeeRecords()

function createTimeInEvent(employee, dateStamp) {
    const [date, time] = dateStamp.split(" ");
// this number element in the hour element will change the string to an integer
// The 10 ensures that the time string is always interpreted as a decimal number, 
// which is important when dealing with time values.
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: Number(time, 10),
    date: date,
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  const [date, time] = dateStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: Number(time, 10),
    date: date,
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find((event) => event.date === date);
  const timeOut = employee.timeOutEvents.find((event) => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map((event) => event.date);
  const totalWages = datesWorked.reduce(
    (total, date) => total + wagesEarnedOnDate(employee, date),
    0
  );
  return totalWages;
}

function calculatePayroll(employees) {
  return employees.reduce(
    (totalPayroll, employee) => totalPayroll + allWagesFor(employee),
    0
  );
}
