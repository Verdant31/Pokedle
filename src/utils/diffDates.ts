export type MyDate = {
    hours: number;
    minutes: number;
    seconds: number;
}

export const diffDates = (firstDate: number | undefined, secondDate: number) => {
    if(!firstDate || !secondDate) return;
    let delta = Math.abs(firstDate - secondDate) / 1000;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    const seconds = delta % 60;
    const date : MyDate = {
        hours,
        minutes,
        seconds
    }
    return date
}