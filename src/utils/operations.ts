import { IRegistroDePonto } from "@/stores/@registroDePontoTypes";

export const getTotalSeconds = (list: { horas: string }[]) => {
  const totalSeconds = list.reduce((a, c) => {
    const [hours, minutes, seconds] = c.horas.split(":");
    return (
      a + parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
    );
  }, 0);
  return totalSeconds;
};

export const getTimeFromSeconds = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}:${minutes}:${seconds}`;
};

export function formatDate(data: string) {
  var dateParts = data.split("/");
  return dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2];
}

export const sortByEntrada = (a: IRegistroDePonto, b: IRegistroDePonto) => {
  const entrada1 = new Date(a.entrada);
  const entrada2 = new Date(b.entrada);

  return isNaN(entrada1.getTime()) || isNaN(entrada2.getTime())
    ? 0
    : entrada2.getTime() - entrada1.getTime();
};

export const totalHoras = (
  list: IRegistroDePonto[],
  start: Date,
  end: Date
) => {
  return list
    .filter((ponto) => {
      const testingData = new Date(ponto.entrada);
      return testingData >= start && testingData <= end;
    })
    .sort(sortByEntrada)
    .reduce((total, ponto) => {
      const [hours, minutes, seconds] = ponto.horas.split(":");

      const horas =
        parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds) ||
        0;
      return total + horas;
    }, 0);
};

export const formatHorario = (texto: string) => {
  const newTexto = texto.replace(/\s/g, " ");
  const regexData = /Data: (\d{1,2}\/\d{1,2}\/\d{4})/;
  const regexEntrada = /ENTRADA: (\d{1,2}:\d{1,2}:\d{1,2})/;
  const regexSaida = /SAÍDA: (\d{1,2}:\d{1,2}:\d{1,2})/;

  const matchData = newTexto.match(regexData);
  const matchEntrada = newTexto.match(regexEntrada);
  const matchSaida = newTexto.match(regexSaida);

  const informacoes = {
    data: matchData ? matchData[1] : "",
    entrada: matchEntrada ? matchEntrada[1] : "",
    saida: matchSaida ? matchSaida[1] : "",
  };
  const dateParts = informacoes.data.split("/");
  const formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
  if (informacoes.entrada) {
    return `${formattedDate} ${informacoes.entrada}-03:00`;
  } else if (informacoes.saida) {
    return `${formattedDate} ${informacoes.saida}-03:00`;
  }
};
