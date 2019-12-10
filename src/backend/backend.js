
// switch back and forth when you want to test
const api = process.env.NODE_ENV === "production" ? "https://sjsubookiebackend.herokuapp.com" : "localhost:3000";
//const api = "https://sjsubookietest.herokuapp.com";
//const api = "https://sjsubookielogin.herokuapp.com"
export default api
