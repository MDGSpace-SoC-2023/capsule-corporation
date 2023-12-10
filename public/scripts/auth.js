

const redirectUrl = "http://localhost:3000/";
const clientId = "TgzqtF7oa0cZSY6TAndwEyGty7DCaYMhFfBk7szn";
const client_secret = "2HDL3JcHx7EyTU8zemx0Wm7nIpSnFN0NfYtETKgUHI9WYZ2hBaJ5PqKUgAjUHoOIVHWyXj8w6LqFadpsqoS0z1kfOkEv3NwLuCg7F1tI6MKFiQHGyBxfvrgmBY4JQwmq";


let codecomp = window.location.search;
var authorisation_code = codecomp.split('&')[1].replace('code=', '');
console.log(authorisation_code);

const posturl = `http://internet.channeli.in/oauth/token/`;

var http = new XMLHttpRequest();

var grant_type = 'authorization_code';
var redirect_uri = 'http://localhost:3000/';

var data = 'client_id=' + clientId + '&client_secret=' + client_secret + '&grant_type=' + grant_type + '&redirect_uri=' + redirect_uri + '&code=' + authorisation_code;

console.log(redirect_uri+data);
http.open('POST', posturl);
// http.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
http.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// http.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// http.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// http.setRequestHeader('Access-Control-Allow-Credentials', 'true');
// http.setRequestHeader('Referrer-Policy', 'no-referrer-when-downgrade');


http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


http.send(data);

http.onreadystatechange = () =>{
  if (http.status == 200 && http.readyStatestate == XMLHttpRequest.DONE) {
    console.log(http.responseText);
  }
}


