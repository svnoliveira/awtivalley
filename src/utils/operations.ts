export const getTotalSeconds = (list:{horas: string}[]) => {
    const totalSeconds = list.reduce((a, c) => {
        const [hours, minutes, seconds] = c.horas.split(':');
        return a + (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds);
    }, 0);
    return totalSeconds;
}
export const getTimeFromSeconds = (totalSeconds:number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}:${minutes}:${seconds}`;
}

export function formatDate(data:string){
    var dateParts = data.split("/");
    return dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2];
  }

