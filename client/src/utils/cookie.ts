export function getCookie(cookieType: string) {
  let token;
  document.cookie
    .replace(/ /g, "")
    .split(";")
    .forEach(cookie => {
      const items = cookie.split("=");

      if (items[0] === cookieType) {
        token = items[1];
      }
    });

  return token;
}

export function setCookie(cookieType: string, value: string) {
  document.cookie = `${cookieType}=${value};`;
}

export function deleteCookie(cookieType: string) {
  document.cookie = `${cookieType}=;`;
}
