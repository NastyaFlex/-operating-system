let modal_error = new bootstrap.Modal(document.getElementById('modal_error'), {
  backdrop: "static"
});
let modal_filetree = new bootstrap.Modal(document.getElementById('modal_filetree'), {
  backdrop: "static"
});
let reboot = new bootstrap.Modal(document.getElementById('modal_reboot_vm'), {
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
  xhr.open('GET', `http://10.3.0.13:10005/getAllowMaxDiskSize?token=${localStorage.getItem("token")}`);
  xhr.send();

  xhr.onload = function() {
    if (xhr.status == 200) {
      document.getElementById("new_disk_size").max = xhr.response;
    }
  }
}

update_rokiv();

document.getElementsByClassName('type_selection')[0].addEventListener('submit', send_new_disk);

let iso_path;

function send_new_disk() {
  let button = event.target;

  let type_disk = document.querySelector('input[name="type"]:checked').value;
  let disk_size = document.getElementById("new_disk_size").value;
  console.log(type_disk);

  let xhr = new XMLHttpRequest();
  let parameters;
  if (type_disk === "CD") {
    if (iso_path == null) {
      document.getElementById('error_message').innerHTML = "Выберите образ диска.";
      modal_error.show();
      return;
    }
    parameters = `type=${type_disk}&iso_path=${iso_path}`
  } else {
    parameters = `type=${type_disk}&disk_size=${disk_size}`
  }
  xhr.open('GET', `http://10.3.0.13:10005/createDisk?token=${localStorage.getItem("token")}&vmID=${id_car}&` + parameters);
  xhr.send()
  button.disabled = true;

  xhr.onload = function() {
    button.disabled = false;
    if (xhr.status == 200) {
      reboot.show();
    } else {
      document.getElementById('error_message').innerHTML = xhr.response;
      modal_error.show();
    }
  }
}

function reboot_VM(or){
  if (or == true) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://10.3.0.13:10005/reloadVM?token=${localStorage.getItem("token")}&vmID=${id_car}`);
    xhr.send();

    xhr.onload = function() {
      if (xhr.status == 200) {
        location.reload(); //обновление страницы
        
      }
    }
  }
  else{
    location.reload();
  }
}
//Файловое дерево
let loaded_filetree = false;


function load_filetree() {
  if (loaded_filetree) {
    return;
  }
  xhr = new XMLHttpRequest();
  xhr.open('GET', `http://10.3.0.13:10005/getFileTreeISO`);
  xhr.send();

  xhr.onload = function() {
    if (xhr.status == 200) {
      console.log(xhr.response);
      let head_folder = JSON.parse(xhr.response);
      builder_tree(head_folder, document.getElementById("metisFolder_metismenu"));
    }

    $(".metisFolder").metisMenu({
      toggle: false
    });

    loaded_filetree = true;
  }
}

function builder_tree(folder, ul_folder, path = "") {
  for (twig_object of folder) {
    let twig = document.createElement("li");
    if (twig_object.nodes != null) {
      let curr_path = path + twig_object.name + "/";
      twig.insertAdjacentHTML(`afterbegin`, `<a href="#"><i class="bi bi-folder"></i>${twig_object.name}</a>`);
      let tag_folder = document.createElement("ul");
      twig.append(tag_folder);
      let ne_head_folder = twig_object.nodes;
      builder_tree(ne_head_folder, tag_folder, curr_path);
    } else {
      twig.insertAdjacentHTML(`afterbegin`, `<a href="#" path=${path + twig_object.name} onclick="iso_selection(this)" data-bs-dismiss="modal"><i class="bi bi-file-earmark-text"></i>${twig_object.name}</a>`);
    }
    ul_folder.append(twig);
  }
}

function iso_selection(selected) {
  iso_path = selected.getAttribute("path");
  console.log(iso_path);
  document.getElementById("select_disk").innerHTML = "Вы выбрали образ: " + iso_path;
}
