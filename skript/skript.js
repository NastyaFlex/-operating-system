function auth() {
  let xhr = new XMLHttpRequest();//для подключения!
  let password = document.querySelector('#exampleInputPassword1');
  let login = document.querySelector('#exampleInputEmail1');
  xhr.open('POST', "http://10.3.0.13:10005/login");//ВЕЗДЕ НУЖЕН ССЫЛКА ДЛЯ ЗАПРОСА
  xhr.send(`{"login":"${login.value}", "pass":"${password.value}"}`);// xhr.send()-нужна для отправки запроса;

  xhr.onload = function(){
    if (xhr.status == 200) {
      localStorage.setItem('token', xhr.responseText);
      document.location.href = "list_vm.html";
    }
  }
}
