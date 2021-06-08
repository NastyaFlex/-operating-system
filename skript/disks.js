function list_disks(id_vm) {
  console.log(id_vm);
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `http://10.3.0.13:10005/listDisks?token=${localStorage.getItem("token")}&vmID=${id_vm}`);
  xhr.send();

  xhr.onload = function() {
    if (xhr.status === 200) {
      let arrdisks = JSON.parse(xhr.response); //массив дисков

      document.getElementById("param_disks").insertAdjacentHTML("beforeend", `
      <tbody id="${id_vm}" class="small_text" style="display:none"></tbody>
      `);
      arrdisks.forEach(function(disk, i) {
        document.querySelector(`tbody#${CSS.escape(id_vm)}`).insertAdjacentHTML("beforeend", `
        <tr id="${disk.id}">
          <td>${disk.path}</td>
          <td>${disk.type}</td>
          <td>${disk.size.toFixed(2)}</td>
          <td data-bs-toggle="modal" data-bs-target="#modal_disk" onclick="select_disk_from_delete(this)">
          <span class="cross">x</span>
          </td>
        </tr>
        `);
      });
    }
  }
}

let disk_tr;

function select_disk_from_delete(tr){
  disk_tr = tr.parentElement;
}

function showDisks() {
  document.querySelector(`tbody#${CSS.escape(id_car)}`).style.display = "";
};

function delete_disk(){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `http://10.3.0.13:10005/deleteDisk?token=${localStorage.getItem("token")}&vmID=${id_car}&diskID=${disk_tr.id}`);
  xhr.send();
  xhr.onload = function(){
    if (xhr.status === 200) {
      disk_tr.remove();
      update_rokiv();
      reboot.show();
    }
  }
}
