let papaya = new XMLHttpRequest();
papaya.open('GET',`http://10.3.0.81:10005/listVMs?token=${localStorage.getItem("chef")}`);
papaya.send();//отправляем запрос на сервер

// Этот код сработает после того, как мы получим ответ сервера
papaya.onload = function(){
  if(papaya.status != 200){
    console.log(papaya.status + " Ошибка");
  } else{
    let jsontext = papaya.response;
    let arrVMs = JSON.parse(jsontext);

    let car = document.getElementById("car");

     for(let i in arrVMs){
       let mashina = arrVMs[i];
       car.insertAdjacentHTML("beforeend",`<li class="dropdown-item">${mashina.params.nameVM}</li>`)
     }

  }
}

function klik(){
    document.location.href = "index3.html";
}
