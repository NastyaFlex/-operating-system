let reaT;
let papaya = new XMLHttpRequest();
let namesVM = document.getElementById('NamesVM')
papaya.open('GET',`http://10.3.0.81:10005/list_vm?token=${localStorage.getItem("chef")}`);
papaya.send();//отправляем запрос на сервер
// papaya.onload = function(){
//   if (papaya.status === 200) { //если папайя равна 200, то оно работает, ВООООТ
//     reaT = JSON.parse(papaya.response);//переход текста в объект
//     // console.log(reaT);
//     //
//     // console.log(reaT.params);
//     for (var i = 0; i < reaT.length; i++) {
//       namesVM.insertAdjacentHTML('beforeend',`
//       <h1 onclick = 'testForTest(${i})' class = 'dinamicNameVm'>${reaT[i].params.nameVM}</h1>
//       `);
//     }
//   }
// }
//
//
// function testForTest (i) {
//   console.log(reaT[i]);
//   if (!document.getElementById(i)) {
//     namesVM.insertAdjacentHTML('beforeend',`
//     <p id = '${i}' onclick = 'testForTest(${i})' class = 'dinamicNameVm'> ${reaT[i].port} </p>
//     `);
//   }
// }
function klik(){
    document.location.href = "index3.html";
}
