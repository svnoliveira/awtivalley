import { IRegistroDePonto } from "@/stores/@registroDePontoTypes";
import { IUser } from "@/stores/@userTypes";

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
  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

  if (informacoes.entrada && informacoes.saida) {
    const entradaTime = new Date(`${formattedDate}T${informacoes.entrada}`);
    const saidaTime = new Date(`${formattedDate}T${informacoes.saida}`);
    
    const diffInMilliseconds = saidaTime.getTime() - entradaTime.getTime();

    // Verificar se a diferença é menor que 5 minutos (300.000 milissegundos)
    if (diffInMilliseconds < 300000) {
      return null; // Retornar null ou outra indicação se a diferença for menor que 5 minutos
    } else {
      return `${formattedDate} ${informacoes.entrada}-03:00`;
    }
  }

  return null; // Se não houver entrada ou saída, retornar null
};


export const checkUserRole = ( user:IUser | undefined ) => {
  if(user){
    if (user.is_superuser === true || user.setor === "✒️ Ingressos"){
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export const removeEmptyStringKeys = (obj: Record<string, string>): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== "") {
          result[key] = obj[key];
      }
  }
  return result;
}

export type TTimeType = '23:59:59' | '00:00:00';

export const setTimeTo =(dateString:string, time:TTimeType) => {
  // Split the date and time parts
  const parts = dateString.split(' ');
  // Replace the time part with "23:59:59" or "00:00:00"
  const resultString = parts[0] + ` ${time}` + dateString.slice(-6);
  return resultString;
}

export const isSameDay = (startDateString:string, endDateString:string) => {
  const startParts = startDateString.split(' ');
  const start = parseInt(startParts[0].split('-')[2], 10);
  const endParts = endDateString.split(' ');
  const end = parseInt(endParts[0].split('-')[2], 10);

  return start === end;
}