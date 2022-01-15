export const obj2UrlParams = (obj: any) => {
  let str = '';
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      str += `${key}=${element}&`;
    }
  }
  return str;
};
