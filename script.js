function filterLocations() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toUpperCase();
  const ul = document.getElementById("locationList");
  const li = ul.getElementsByTagName("li");

  for (let i = 0; i < li.length; i++) {
    const txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1 || li[i].querySelector('input')) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
