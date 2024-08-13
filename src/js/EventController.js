
class EventController{
  constructor(){
    this.allLogsForm = document.getElementById("all-logs-form")
    this.allLogsInput = document.getElementById("all-logs")
    this.allLogsResultDiv = document.getElementById("all-logs-result-area")

    this.monthLogsForm = document.getElementById("month-logs-form")
    this.monthInput = document.getElementById("month")
    this.monthLogsInput = document.getElementById("month-log")
    this.monthLogsResultDiv = document.getElementById("month-logs-result-area")



    this.initSubmitAllLogsForm()
    this.initSubmitMonthLogsForm()
  }


  initSubmitAllLogsForm(){
    this.allLogsForm.addEventListener("submit", async (event) => {
      event.preventDefault()

      const data = {
        "numero":this.allLogsInput.value
      }
      console.log(data)

      try{
        const response = await fetch('http://localhost:3000/num', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Adiciona o cabeçalho Content-Type
          },
          body: JSON.stringify(data)
        })

        if(!response.ok){
          throw new Error('erro ao enviar o numero')
        }

        const result = await response.json()
        console.log(typeof(result))
        console.log(result.objeto[0])
        const resultLength = result.objeto.length
        const formattedLogs = result.objeto.map(log => JSON.stringify(log, null, 2)).join('\n');
        this.allLogsResultDiv.innerText = `Logs encontrados: ${resultLength}\n Logs: ${formattedLogs}`
      }catch(err){
        console.log("erro: " + err)
      }

    })
  }
  initSubmitMonthLogsForm(){
    this.monthLogsForm.addEventListener("submit", async (event) => {
      event.preventDefault()
      
      const pattern = /(\d{2})$/
      const match = this.monthInput.value.match(pattern)
      const monthNumber = parseInt(match[1], 10);
      
      
      let data = {
        "numero" : this.monthLogsInput.value,
        "mes" : monthNumber
      }
      try{
        const response = await fetch('http://localhost:3000/mes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Adiciona o cabeçalho Content-Type
          },
          body: JSON.stringify(data)
        })

        if(!response.ok){
          throw new Error('erro ao enviar o numero')
        }

        const result = await response.json()
        console.log(typeof(result))
        console.log(result.objeto[0])
        const resultLength = result.objeto.length
        const formattedLogs = result.objeto.map(log => JSON.stringify(log, null, 2)).join('\n');
        this.monthLogsResultDiv.innerText = `Logs encontrados: ${resultLength}\n Logs: ${formattedLogs}`
      }catch(err){
        console.log("erro: " + err)
      }

    })
  }
  }


export default EventController


