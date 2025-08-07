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
// script.js

fetch('listings.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('location-listings');

    for (const city in data) {
      const cityBox = document.createElement('div');
      cityBox.className = 'location';

      const heading = document.createElement('h3');
      heading.textContent = city;

      const ul = document.createElement('ul');
      data[city].forEach(place => {
        const li = document.createElement('li');
        li.textContent = place;
        ul.appendChild(li);
      });

      cityBox.appendChild(heading);
      cityBox.appendChild(ul);
      container.appendChild(cityBox);
    }
  });
