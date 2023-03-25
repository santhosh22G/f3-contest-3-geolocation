

const getLocationBtn = document.querySelector('#get-location');
const removeLocationBtn = document.querySelector('#remove-location');
const mapDiv = document.querySelector('#map');

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function showPosition(position) {
  const { latitude, longitude } = position.coords;
  localStorage.setItem('lat', latitude);
  localStorage.setItem('long', longitude);
  showMap(latitude, longitude);
}

function showMap(lat, long) {
  const mapUrl = `https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed&zoom=15`;
  mapDiv.innerHTML = `<iframe width="100%" height="100%" frameborder="0" style="border:0" src="${mapUrl}" allowfullscreen></iframe>`;
}

function removeLocation() {
  localStorage.removeItem('lat');
  localStorage.removeItem('long');
  mapDiv.innerHTML = '';
  getLocationBtn.disabled = false;
}

getLocationBtn.addEventListener('click', () => {
  getLocationBtn.disabled = true;
  getLocation();
});

removeLocationBtn.addEventListener('click', () => {
  removeLocation();
  getLocationBtn.disabled = false;
});

if (localStorage.getItem('lat') && localStorage.getItem('long')) {
  const lat = localStorage.getItem('lat');
  const long = localStorage.getItem('long');
  showMap(lat, long);
  getLocationBtn.disabled = true;
}