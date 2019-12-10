
// switch back and forth when you want to test
const api = process.env.GATSBY_backendPoint? process.env.GATSBY_backendPoint : "localhost:3000";
//const api = "https://sjsubookietest.herokuapp.com";
//const api = "https://sjsubookielogin.herokuapp.com"
console.log(api);
export default api
