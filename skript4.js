let papaya = new XMLHttpRequest();
papaya.open('GET',`http://10.3.0.81:10005/listVMs?token=${localStorage.getItem("chef")}`);
papaya.send();//отправляем запрос на сервер

// Этот код сработает после того, как мы получим ответ сервера
papaya.onload = function(){
  if(papaya.status != 200){
    console.log(papaya.status + " Ошибка");
  } else{
    let jsontext = papaya.response;
    console.log(jsontext);
    let arrVMs = JSON.parse(jsontext);
    console.log(arrVMs);

    let car = document.getElementById("car");
    console.log(car);

     for(let i in arrVMs){
       console.log(i);
     }

  }
}

function klik(){
    document.location.href = "index3.html";
}
