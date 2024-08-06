import allLogs from "./allLogsController.js"
import monthLogs from "./monthLogsController.js"

class EventController{
  constructor(){
    this.allLogsForm = document.getElementById("all-logs-form")
    this.monthLogsForm = document.getElementById("month-logs-form")
    this.initSubmitAllLogsForm()
    this.initSubmitMonthLogsForm()
  }


  initSubmitAllLogsForm(){
    this.allLogsForm.addEventListener("submit", (event) => {
      event.preventDefault()
      console.log("pega a resposta e passa pra proxima function" )
      let data = 'pra'
      allLogs(data)
    })
  }
  initSubmitMonthLogsForm(){
    this.monthLogsForm.addEventListener("submit", (event) => {
      event.preventDefault()
      console.log("pega a resposta e passa pra proxima function" )
      let data = 'pra'
      monthLogs(data)
    })
  }
  }


export default EventController


