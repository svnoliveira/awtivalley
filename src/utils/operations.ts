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
  const formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
  if (informacoes.entrada) {
    return `${formattedDate} ${informacoes.entrada}-03:00`;
  } else if (informacoes.saida) {
    return `${formattedDate} ${informacoes.saida}-03:00`;
  }
};

/*export const formatHorario = (texto: string) => {
  const newTexto = texto.replace(/\s/g, " ");
  const regexData = /Data: (\d{1,2}\/\d{1,2}\/\d{4})/;
  const regexEntrada = /ENTRADA: (\d{1,2}:\d{1,2}:\d{1,2})/;
  const regexSaida = /SA[ÍI]DA: (\d{1,2}:\d{1,2}:\d{1,2})/;

  const matchData = newTexto.match(regexData);
  const matchEntrada = newTexto.match(regexEntrada);
  const matchSaida = newTexto.match(regexSaida);

  const informacoes = {
    data: matchData ? matchData[1] : "",
    entrada: matchEntrada ? matchEntrada[1] : "",
    saida: matchSaida ? matchSaida[1] : "",
  };

  if (!informacoes.data) {
    return "Data não encontrada";
  }

  const dateParts = informacoes.data.split("/");
  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

  if (informacoes.entrada) {
    return `${formattedDate} ${informacoes.entrada}-03:00`;
  } else if (informacoes.saida) {
    return `${formattedDate} ${informacoes.saida}-03:00`;
  } else {
    return "Informações de entrada ou saída não encontradas";
  }
};*/



export const checkUserRole = ( user:IUser | undefined ) => {
  if(user){
    if (
    user.is_superuser === true || user.setor === "💻 Administrativo" ||  user.setor === "✒️ Ingressos"){
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export const checkUserAdminRole = ( user:IUser | undefined ) => {
  if(user){
    if (
    user.is_superuser === true || user.setor === "💻 Administrativo"){
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export const checkUserAereoRole = ( user:IUser | undefined ) => {
  if(user){
    if (user.is_superuser === true || user.setor === "💻 Administrativo" || user.setor === "🚁 Aéreo"){
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export const checkUserCursosRole = ( user:IUser | undefined ) => {
  if(user){
    if (user.is_superuser === true || user.setor === "💻 Administrativo" || user.setor === "👨‍🏫 Cursos"){
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export const checkUserIntegracaoRole = ( user:IUser | undefined ) => {
  if(user){
    if (user.is_superuser === true || user.setor === "💻 Administrativo" || user.setor === "🎉 Integração"){
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

/*export const checkUserRole = ( user:IUser | undefined ) => {
  if(user){
    if (
    user.is_superuser === true || user.setor === "✒️ Ingressos"|| 
    user.setor === "💊 Enfermaria"|| user.setor === "💻 Administrativo" ||
    user.setor === "🚒 Bombeiros" || user.setor === "🎉 Integração"){
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}*/

/* CHECK USER ROLE PARA PROVA DE CURSOS*/

export const CheckFuncEstagiarioUserCursos = ( user:IUser | undefined ) => {
  if(user){
    if (
    user.is_superuser === true || user.cargo === "💊 Estagiário"|| user.setor === "👨‍🏫 Cursos"){
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export const CheckFuncParamedicoUserCursos = ( user:IUser | undefined ) => {
  if(user){
    if (
    user.is_superuser === true || user.cargo === "💉 Paramédico"|| user.setor === "👨‍🏫 Cursos"){
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export const CheckFuncInternoUserCursos = ( user:IUser | undefined ) => {
  if(user){
    if (
    user.is_superuser === true || user.cargo === "🧪 Interno"|| user.setor === "👨‍🏫 Cursos"){
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export const CheckFuncResidenteUserCursos = ( user:IUser | undefined ) => {
  if(user){
    if (
    user.is_superuser === true || user.cargo === "⚗️ Residente" || user.setor === "👨‍🏫 Cursos"){
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export const CheckFuncMedicoUserCursos = ( user:IUser | undefined ) => {
  if(user){
    if (
    user.is_superuser === true || user.cargo === "🔬 Médico"|| user.setor === "👨‍🏫 Cursos"){
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

/* CHECK USER ROLE PARA FORM INGRESSO*/
export const CheckFuncIngressosUser = ( user:IUser | undefined ) => {
  if(user){
    if (
    user.is_superuser === true || user.setor === "✒️ Ingressos"){
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

export const checkValidade = (dateString: string) => {
  const currentDate = new Date();
  const expirationDate = new Date(dateString);

  if (currentDate < expirationDate) {
    return true;
  } else {
    return false;
  }
};