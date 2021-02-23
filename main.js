let today = new Date()
let year = today.getFullYear()
let month = today.getMonth()
let title = document.getElementById('title')
let prev = document.getElementById('prev')
let next = document.getElementById('next')

const getCalendarHead = function () {
  const dates = []
  const d = new Date(year, month, 0).getDate()
  const n = new Date(year, month, 1).getDay()

  for (let i = 0; i < n; i++) {
    dates.unshift({
      date: d - i,
      isToday: false,
      isDisabled: true
    })
  }
  return dates;
}

const getCalendarBody = function () {
  const dates = [];
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= lastDate; i++) {
    dates.push({
      date: i,
      isToday: false,
      isDisabled: false
    });
  }

  if (year === today.getFullYear() && month === today.getMonth()) {
    dates[today.getDate() - 1].isToday = true
  }
  return dates;
}

const getCalendarTail = function () {
  const dates = []
  const lastDay = new Date(year, month + 1, 0).getDay()

  for (let i = 1; i < 7 - lastDay; i++) {
    dates.push({
      date: i,
      isToday: false,
      isDisabled: true
    })
  }
  return dates;
}

const clearCalendar = function () {
  const tbody = document.querySelector('tbody')
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild)
  }
}

const createCalendar = function () {
  clearCalendar()

  const dates = [
    ...getCalendarHead(),
    ...getCalendarBody(),
    ...getCalendarTail()
  ]

  const weeks = []
  const weeksCount = dates.length / 7

  for (let i = 0; i < weeksCount; i++) {
    weeks.push(dates.splice(0, 7))
  }

  weeks.forEach(week => {
    const tr = document.createElement('tr')
    week.forEach(date => {
      const td = document.createElement('td')

      td.textContent = date.date
      if (date.isToday) {
        td.classList.add('today')
      }

      if (date.isDisabled) {
        td.classList.add('disabled')
      }

      tr.appendChild(td)
    })
    document.querySelector('tbody').appendChild(tr)
  })
}

const prevMonth = function () {
  month--;
  if (month < 0) {
    year--;
    month = 11
  }
  createCalendar()
}

const nextMonth = function () {
  month++;
  if (month > 11) {
    year++;
    month = 0
  }
  createCalendar()
}

const displayTitle = function () {
  let actualMonth = month + 1
  title.textContent = year + "/" + actualMonth
}

displayTitle()

prev.onclick = function () {
  prevMonth()
  displayTitle()
}

next.onclick = function () {
  nextMonth()
  displayTitle()
}

createCalendar()

const backToToday = function () {
  year = today.getFullYear()
  month = today.getMonth()
  createCalendar()
  displayTitle()
}

document.getElementById('today').onclick = function () {
  backToToday()
}
