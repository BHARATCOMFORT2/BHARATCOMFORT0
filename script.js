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
  /* ===== BharatComfort: Drive image popup ===== */
const BC_API_KEY = "REPLACE_WITH_YOUR_API_KEY"; // <-- replace this

// popup elements
const bcPopup = document.getElementById('bc-image-popup');
const bcPopupImg = document.getElementById('bc-popup-image');
const bcPrevBtn = document.getElementById('bc-prev');
const bcNextBtn = document.getElementById('bc-next');
const bcCloseBtn = document.querySelector('.bc-popup-close');
const bcCount = document.getElementById('bc-image-count');

let bcImages = [];      // array of image URLs for the current listing
let bcIndex = 0;        // current index

document.addEventListener('DOMContentLoaded', () => {
  initBcPopupControls();
  // if your listing buttons already exist at load, no extra step needed
  // otherwise we use event delegation (below) so dynamic listings work too
  attachViewImageDelegation();
});

/* Event delegation: handles clicks on any .view-images button, including dynamically created ones */
function attachViewImageDelegation() {
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-images');
    if (!btn) return;
    e.preventDefault();
    const folderId = btn.dataset.folderId || btn.getAttribute('data-folder-id');
    if (!folderId) {
      alert('No folder ID found for this listing.');
      return;
    }
    fetchImagesFromFolder(folderId)
      .then(images => {
        if (!images || images.length === 0) {
          alert('No images found in that Drive folder (or folder not shared).');
          return;
        }
        bcImages = images;
        bcIndex = 0;
        openBcPopup();
      })
      .catch(err => {
        console.error('Drive fetch error', err);
        alert('Error loading images. See console for details.');
      });
  });
}

/* Initialize popup controls */
function initBcPopupControls() {
  if (!bcPopup) return;
  // close handlers
  bcCloseBtn.addEventListener('click', closeBcPopup);
  bcPopup.addEventListener('click', (e) => {
    if (e.target === bcPopup) closeBcPopup(); // click on backdrop closes
  });
  // nav handlers
  bcPrevBtn.addEventListener('click', showBcPrev);
  bcNextBtn.addEventListener('click', showBcNext);
  // keyboard
  document.addEventListener('keydown', (e) => {
    if (!bcPopup || bcPopup.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') closeBcPopup();
    if (e.key === 'ArrowLeft') showBcPrev();
    if (e.key === 'ArrowRight') showBcNext();
  });
}

/* Open popup and show the current image */
function openBcPopup() {
  bcPopup.setAttribute('aria-hidden', 'false');
  updateBcImage();
}

/* Close popup */
function closeBcPopup() {
  bcPopup.setAttribute('aria-hidden', 'true');
  bcPopupImg.src = '';
  bcImages = [];
  bcIndex = 0;
  bcCount.textContent = '';
}

/* Show image by index */
function updateBcImage() {
  if (!bcImages || bcImages.length === 0) return;
  bcIndex = ((bcIndex % bcImages.length) + bcImages.length) % bcImages.length; // safe wrap
  bcPopupImg.src = bcImages[bcIndex];
  bcCount.textContent = `${bcIndex + 1} / ${bcImages.length}`;
}

/* Prev/Next */
function showBcPrev() { if (!bcImages.length) return; bcIndex = (bcIndex - 1 + bcImages.length) % bcImages.length; updateBcImage(); }
function showBcNext() { if (!bcImages.length) return; bcIndex = (bcIndex + 1) % bcImages.length; updateBcImage(); }

/* Fetch image file list from a public Drive folder.
   Uses files.list and pages through results if needed.
   Returns array of direct image URLs (drive "uc?export=view&id="). */
async function fetchImagesFromFolder(folderId) {
  if (!BC_API_KEY || BC_API_KEY === 'REPLACE_WITH_YOUR_API_KEY') {
    throw new Error('API key not set. Set BC_API_KEY in script.js.');
  }
  const images = [];
  let pageToken = null;
  do {
    // query: items in folder, not trashed
    const q = `'${folderId}' in parents and trashed=false`;
    const params = new URLSearchParams({
      q,
      key: BC_API_KEY,
      fields: 'nextPageToken,files(id,name,mimeType)',
      pageSize: '1000'
    });
    if (pageToken) params.set('pageToken', pageToken);

    const url = `https://www.googleapis.com/drive/v3/files?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Drive API returned ${res.status}: ${text}`);
    }
    const json = await res.json();
    const pageFiles = (json.files || []).filter(f => f.mimeType && f.mimeType.startsWith('image/'));
    pageFiles.forEach(f => {
      // direct view URL
      images.push(`https://drive.google.com/uc?export=view&id=${f.id}`);
    });
    pageToken = json.nextPageToken;
  } while (pageToken);

  return images;
    }
  });
