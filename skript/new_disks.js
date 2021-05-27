let modal_error = new bootstrap.Modal(document.getElementById('modal_error'), {
  backdrop: "static"
});
let modal_filetree = new bootstrap.Modal(document.getElementById('modal_filetree'), {
  backdrop: "static"
});

function type_changed(tag) {
  if (tag.value == "CD") {
    document.getElementById("hard_content").classList.add("hide");
    document.getElementById("cdrom_content").classList.remove("hide");
  } else {
    document.getElementById("hard_content").classList.remove("hide");
    document.getElementById("cdrom_content").classList.add("hide");
  }
}


function update_rokiv() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `http://10.3.0.13:10005/getAllowMaxDiskSize?token=${localStorage.getItem("chef")}`);
  xhr.send();

  xhr.onload = function() {
    if (xhr.status == 200) {
      document.getElementById("new_disk_size").max = xhr.response;
    }
  }
}

update_rokiv();

document.getElementsByClassName('type_selection')[0].addEventListener('submit', send_new_disk);

function send_new_disk() {
  let button = event.target;
  button.disabled = true;

  let type_disk = document.querySelector('input[name="type"]:checked').value;
  let disk_size = document.getElementById("new_disk_size").value;
  console.log(type_disk);

  let xhr = new XMLHttpRequest();
  let parameters;
  if (type_disk === "CD"){
    parameters = `type=${type_disk}&iso_path=fgfgfg`
  } else {
    parameters = `type=${type_disk}&disk_size=${disk_size}`
  }
  xhr.open('GET', `http://10.3.0.13:10005/createDisk?token=${localStorage.getItem("chef")}&vmID=${id_car}&` + parameters);
  xhr.send()

  xhr.onload = function() {
    button.disabled = false;
    if (xhr.status == 200){
      location.reload(); //обновление страницы
    } else {
      document.getElementById('error_message').innerHTML = xhr.response;
      modal_error.show();
    }
  }
}

let loaded_filetree = false;

function load_filetree() {
  if (loaded_filetree) {
    return;
  }
  xhr = new XMLHttpRequest();
  xhr.open('GET', `http://10.3.0.13:10005/getFileTreeISO`);
  xhr.send();

  xhr.onload = function(){
    if (xhr.status == 200){
      console.log(xhr.response);
    }

    $(".metisFolder").metisMenu({
       toggle: false
     });

     loaded_filetree = true;
  }
}
