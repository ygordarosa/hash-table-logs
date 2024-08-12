import allLogs from "./allLogsController.js"
import monthLogs from "./monthLogsController.js"

class EventController{
  constructor(){
    this.allLogsForm = document.getElementById("all-logs-form")
    this.monthLogsForm = document.getElementById("month-logs-form")
    this.allLogsInput = document.getElementById("all-logs")
    this.monthInput = document.getElementById("month")
    this.monthLogsInput = document.getElementById("month-log")

    this.initSubmitAllLogsForm()
    this.initSubmitMonthLogsForm()
  }


  initSubmitAllLogsForm(){
    this.allLogsForm.addEventListener("submit", (event) => {
      event.preventDefault()
      console.log("pega a resposta e passa pra proxima function" )
      let data = this.allLogsInput.value
      console.log(data)
      allLogs(data)
    })
  }
  initSubmitMonthLogsForm(){
    this.monthLogsForm.addEventListener("submit", (event) => {
      event.preventDefault()
      console.log("pega a resposta e passa pra proxima function" )
      let data = {
        "log" : this.monthLogsInput.value,
        "month" : this.monthInput.value
      }
      monthLogs(data)
    })
  }
  }


export default EventController


