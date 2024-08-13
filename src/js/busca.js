
const fs = require("fs");

class LogEntry {
  constructor(month, log, msg, user) {
    this.month = month;
    this.log = log;
    this.msg = msg;
    this.user = user;
  }
}
const logs = [];
function lerJsonGrande(caminhoArquivo, limite) {
  const jsonString = fs.readFileSync(caminhoArquivo);
  const jsonData = JSON.parse(jsonString);
  

  for (let i = 0; i < jsonData.length && i < limite; i++) {
    const entry = jsonData[i];
    const log = new LogEntry(entry.month, entry.log, entry.msg, entry.user);
    logs.push(log);
  }
  console.log("json em memoria")
}

const monthMap = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

function getMonthValue(month) {
  return monthMap[month] || 0;
}

function criarArrayLogsPorNumero(logs) {
  const logsPorNumero = [];

  logs.forEach((log) => {
    const numero = log.log;
    if (!logsPorNumero[numero]) {
      logsPorNumero[numero] = [];
    }
    logsPorNumero[numero].push(log);
  });

  return logsPorNumero;
}

function criarArrayLogsPorMes(logs) {
  const logsPorMes = Array(12)
    .fill()
    .map(() => [[], []]);

  logs.forEach((log) => {
    const mes = getMonthValue(log.month) - 1;
    logsPorMes[mes][0].push(log);
  });

  logsPorMes.forEach((logsMes, mes) => {
    const metade = Math.ceil(logsMes[0].length / 2);
    logsPorMes[mes][1] = logsMes[0].splice(metade);
  });

  return logsPorMes;
}

function exportarLogsParaTxt(caminhoArquivo, logsPorNumero) {
  let conteudo = "";

  logsPorNumero.forEach((logs, numero) => {
    if (logs) {
      conteudo += `Logs para o número ${numero}:\n`;
      logs.forEach((log) => {
        conteudo += `Mês: ${log.month}, Log: ${log.log}, Mensagem: ${log.msg}, Usuário: ${log.user}\n`;
      });
      conteudo += "\n";
    }
  });

  fs.writeFileSync(caminhoArquivo, conteudo, "utf-8");
}

function exportarLogsPorMesParaTxt(caminhoArquivo, logsPorMes) {
  let conteudo = "";

  logsPorMes.forEach((logsPorParte, mes) => {
    conteudo += `Mês: ${mes + 1}\n`;
    conteudo += "Primeira metade:\n";
    logsPorParte[0].forEach((log) => {
      conteudo += `Log: ${log.log}, Mensagem: ${log.msg}, Usuário: ${log.user}\n`;
    });
    conteudo += "\nSegunda metade:\n";
    logsPorParte[1].forEach((log) => {
      conteudo += `Log: ${log.log}, Mensagem: ${log.msg}, Usuário: ${log.user}\n`;
    });
    conteudo += "\n";
  });

  fs.writeFileSync(caminhoArquivo, conteudo, "utf-8");
}

function mostrarLogsPorPosicao(logsPorNumero, posicao) {
  let data = [];
  if (logsPorNumero[posicao]) {
    logsPorNumero[posicao].forEach((log) => {
      data.push({
        mes: log.month,
        log: log.log,
        mensagem: log.msg,
        usuario: log.user,
      });
    });
  } else {
    console.log(`Não há logs para o número ${posicao}.`);
    return null;
  }
  return data;
}

function mostrarLogsPorMes(logsPorMes, mes, logNumero) {
  if (!logsPorMes[mes - 1]) {
    console.log(`Não há logs para o mês ${mes}.`);
    return;
  }

  const logsMes = logsPorMes[mes - 1];

  if (!logsMes || !logsMes[0]) {
    console.log(
      `Não há logs registrados para a primeira metade do mês ${mes}.`
    );
    return;
  }

  const metade = logsMes[0].length;
  let parte;

  if (logNumero <= metade) {
    parte = 0; // Primeira metade
  } else if (logNumero > metade) {
    parte = 1; // Segunda metade
  } else {
    console.log(`Número de log ${logNumero} não encontrado no mês ${mes}.`);
    return;
  }

  if (!logsMes[parte] || logsMes[parte].length === 0) {
    console.log(
      `Não há logs registrados para a ${
        parte === 0 ? "primeira" : "segunda"
      } metade do mês ${mes}.`
    );
    return;
  }

  let data = [];

  let encontrado = false;
  logsMes[parte].forEach((log) => {
    if (log.log === logNumero) {
      data.push({
        mes: log.month,
        log: log.log,
        mensagem: log.msg,
        usuario: log.user,
      });
      encontrado = true;
    }
  });

  if (!encontrado) {
    console.log("Log não encontrado.");
  }
  return data;
}

async function criarTableMes(request, response) {
  const { numero, mes } = request.body;
  const logsPorMes = criarArrayLogsPorMes(logs);
  const start = Date.now();
  let data = mostrarLogsPorMes(logsPorMes, parseInt(mes), parseInt(numero));
  const end = Date.now();
  console.log(`Tempo gasto na busca: ${(end - start) / 1000} segundos`);
  response.status(200).json({
    status: "success",
    objeto: data,
  });
}

async function criarTableNum(request, response) {
  let { numero } = request.body;
  console.log(request.body)
  numero = parseInt(numero)
  const logsPorNumero = criarArrayLogsPorNumero(logs);
  const start = Date.now();
  let data = mostrarLogsPorPosicao(logsPorNumero, parseInt(numero));
  const end = Date.now();
  console.log(`Tempo gasto na busca: ${(end - start) / 1000} segundos`);
  response.status(200).json({
    status: "success",
    objeto: data,
  });
}

const limite = 2000000;
lerJsonGrande("input.json", limite);

module.exports = {criarTableMes, criarTableNum}

