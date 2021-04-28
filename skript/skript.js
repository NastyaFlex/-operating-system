function auth() {
  let xhr = new XMLHttpRequest();//для подключения!
  let password = document.querySelector('#exampleInputPassword1');
  let login = document.querySelector('#exampleInputEmail1');
  xhr.open('POST', "http://10.3.0.81:10005/login");//ВЕЗДЕ НУЖЕН ССЫЛКА ДЛЯ ЗАПРОСА
  xhr.send(`{"login":"${login.value}", "pass":"${password.value}"}`);// xhr.send()-нужна для отправки запроса;

  xhr.onload = function(){
    if (xhr.status == 200) {
      localStorage.setItem('chef', xhr.responseText);
      document.location.href = "index3.html";
    }
  }
}
