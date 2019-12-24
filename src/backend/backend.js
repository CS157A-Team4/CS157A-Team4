
// switch back and forth when you want to test
console.log(process.env);
let api = process.env.NODE_ENV === "production" ? "https://sjsubookiebackend.herokuapp.com" : "http://localhost:8080";
console.log(api);
//const api = "https://sjsubookietest.herokuapp.com";
//const api = "https://sjsubookielogin.herokuapp.com"
export default api
