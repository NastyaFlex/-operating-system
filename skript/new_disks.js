function type_changed(tag){
    if (tag.value == "cdrom") {
      document.getElementById("hard_content").classList.add("hide");
      document.getElementById("cdrom_content").classList.remove("hide");
    } else {
      document.getElementById("hard_content").classList.remove("hide");
      document.getElementById("cdrom_content").classList.add("hide");
    }
}
