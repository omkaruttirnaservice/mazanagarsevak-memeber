import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (key, value, options = {}) => {
  cookies.set(key, value, {
    path: "/",
    ...options,
  });
};

export const getCookie = (key) => {
  return cookies.get(key);
};

export const removeCookie = (key) => {
  cookies.remove(key, { path: "/" });
};
