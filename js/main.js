const backendURL = "https://photo-api-app-h3b6fbf8d9dxhkdp.ukwest-01.azurewebsites.net"";

function fetchPhotos() {
  fetch(`${backendURL}/photos`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('photo-list');
      if (!container) return;
      container.innerHTML = '';
      data.forEach(photo => {
        container.innerHTML += `
          <div class="photo-card">
            <img src="${photo.imageUrl}" alt="${photo.title}">
            <b>${photo.title}</b><br>
            <a href="photo.html?id=${photo.id}">View</a>
          </div>
        `;
      });
    });
}

function searchPhotos() {
  const q = document.getElementById('query').value;
  fetch(`${backendURL}/search?q=${q}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('search-results');
      container.innerHTML = '';
      data.forEach(photo => {
        container.innerHTML += `
          <div class="photo-card">
            <img src="${photo.imageUrl}" alt="${photo.title}">
            <b>${photo.title}</b><br>
            <a href="photo.html?id=${photo.id}">View</a>
          </div>
        `;
      });
    });
}

function loadPhoto(id) {
  fetch(`${backendURL}/photo/${id}`)
    .then(res => res.json())
    .then(photo => {
      const container = document.getElementById('photo-container');
      container.innerHTML = `
        <img src="${photo.imageUrl}" alt="${photo.title}">
        <b>${photo.title}</b><br>
        <i>${photo.caption}</i>
      `;
    });
}

function addComment() {
  const id = new URLSearchParams(window.location.search).get('id');
  const comment = document.getElementById('comment').value;
  fetch(`${backendURL}/comment`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({photoId: id, user: "anonymous", comment})
  }).then(res => res.json())
    .then(data => alert("Comment added!"));
}

function ratePhoto() {
  const id = new URLSearchParams(window.location.search).get('id');
  const rating = document.getElementById('rating').value;
  fetch(`${backendURL}/rate`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({photoId: id, user: "anonymous", rating})
  }).then(res => res.json())
    .then(data => alert("Rating submitted!"));
}

function uploadPhoto() {
  const formData = new FormData();
  formData.append('file', document.getElementById('photo').files[0]);
  formData.append('title', document.getElementById('title').value);
  formData.append('caption', document.getElementById('caption').value);
  formData.append('location', document.getElementById('location').value);
  formData.append('people', document.getElementById('people').value);

  fetch(`${backendURL}/upload`, {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(data => alert("Photo uploaded!"));
}
