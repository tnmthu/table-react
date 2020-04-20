export const isAge = (rule, n) => {
  return n != null && n > 20 && n < 65 ? Promise.resolve() : Promise.reject('Age must be an integer, > 20, < 65.');
}
export const isMoney = (rule, n) => {
  let regex = /^[0-9]{1,3}([0-9]{3})*$/;
  return n != null && regex.test(n) ? Promise.resolve() : Promise.reject('Salary must be in money type. Eg. 1000000');
}
export const removeAscent = (str) => {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}
export const isName = (rule, s) => {
  let regex = /^[a-zA-Z ]+$/;
  return s !== "" && regex.test(removeAscent(s)) ? Promise.resolve() : Promise.reject("Wrong name format.")
}