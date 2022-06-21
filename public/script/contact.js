function openCity(evt, cityName) {
  var i, content_changes, location_nav_name;

  content_changes = document.getElementsByClassName("content_changes");
  for (i = 0; i < content_changes.length; i++) {
    content_changes[i].style.display = "none";
  }

  location_nav_name = document.getElementsByClassName("location_nav_name");
  for (i = 0; i < location_nav_name.length; i++) {
    location_nav_name[i].className = location_nav_name[i].className.replace(" active", "");
  }

  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();