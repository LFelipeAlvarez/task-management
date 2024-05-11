export const getCookie = (name: string) => {
    const cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        const cookie = cookieArr[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return null;
}

export const setCookie = (name: string, value: string, days:number = 365) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const compareObjects = (current: any, updated: any) => {
  for (const key in updated) {
    if (Object.prototype.hasOwnProperty.call(updated, key)) {
      if (typeof current[key] === 'string') {
        current[key] = current[key].trim()
        updated[key] = updated[key].trim()
      }
      if (current[key] !== updated[key]) {
        return true; // Una propiedad es diferente
      }
    }
  }
  return false; // No hay diferencias
};