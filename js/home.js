
// =====================
// DOM Elements
// =====================
const tripsContainer = document.getElementById("trips-container");
const filterContainer = document.getElementById("category-filters");
const modal = document.getElementById("trip-modal");
const form = document.getElementById("trip-form");
const closeModalBtn = document.getElementById("close-modal");

const titleInput = document.getElementById("title");
const imageInput = document.getElementById("image");
const countryInput = document.getElementById("country");
const categoryInput = document.getElementById("category");

const STORAGE_KEY = "tripsData";




// =====================
// Data 
// =====================

let trips = [
  {
    id: 1,
    title: "Yellow River",
    country: "China",
    image: "../assets/images/acticle1.jpg",
    category: "River",
    time: "15 min",
    likes: "12k",
    author: "Ian Jachson"
  },
  
];


// =====================
// save to local storage
// =====================
function saveTripsToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

function loadTripsFromStorage() {
  const storedTrips = localStorage.getItem(STORAGE_KEY);

  if (storedTrips) {
    trips = JSON.parse(storedTrips);
  } else {
    saveTripsToStorage(); 
  }
}


let editId = null;

// =====================
// Categories
// =====================
const categories = ["All", "Forest", "Beach", "River", "Mountains", "Road"];

// =====================
// Render Functions
// =====================
function renderTrips(list = trips) {
  tripsContainer.innerHTML = "";

  list.forEach(trip => {
    const article = document.createElement("article");
    article.className = "bg-white rounded-2xl overflow-hidden shadow-md";

    article.innerHTML = `
      <div class="relative">
        <img src="${trip.image}" alt="${trip.title}" class="w-full h-56 object-cover" />
      </div>

      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">${trip.title}</h3>

        <div class="flex items-center text-sm text-gray-500 gap-3">
          <span><i class="fas fa-map-marker-alt"></i> ${trip.country}</span>
          <span><i class="far fa-clock"></i> ${trip.time}</span>
          <span><i class="far fa-heart"></i> ${trip.likes}</span>

          <div class="flex items-center gap-2 ml-auto">
            <button class="edit-btn text-gray-400 hover:text-blue-500" data-id="${trip.id}">
              <i class="fas fa-pen"></i>
            </button>
            <button class="delete-btn text-gray-400 hover:text-red-500" data-id="${trip.id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <p class="text-xs text-gray-500 mt-2">by ${trip.author}</p>
      </div>
    `;

    tripsContainer.appendChild(article);
  });
}


// =====================
// Modal 
// =====================
function openModal() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  form.reset();
  editId = null;
}

document.getElementById("open-modal").addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

// =====================
// FNCTION EDIT
// =====================

function editTrip(id) {
  trips = trips.map(trip => {
    if (trip.id === id) {
      return {
        ...trip,
        title: titleInput.value,
        image: imageInput.value,
        country: countryInput.value,
        category: categoryInput.value
      };
    }
    return trip;
  });

   saveTripsToStorage();
   showNotification("Trip updated successfully");

}

// =====================
// FNCTION ADD
// =====================

function addTrip() {
  const newTrip = {
    id: Date.now(),
    title: titleInput.value,
    image: imageInput.value,
    country: countryInput.value,
    category: categoryInput.value,
    time: "15 min",
    likes: "0",
    author: "You"
  };

  trips.push(newTrip);
  saveTripsToStorage();
  showNotification("Trip added successfully");

}

// =====================
// Handle form edit/add
// =====================
form.addEventListener("submit", e => {
  e.preventDefault();
  if (editId) {
    editTrip(editId);
  } else {
    addTrip();
  }

  renderTrips();
  closeModal();
});


// =====================
// Handle Button Edit
// =====================
function handleEditClick(id) {
  const trip = trips.find(t => t.id === id);
  if (!trip) return;

  titleInput.value = trip.title;
  imageInput.value = trip.image;
  countryInput.value = trip.country;
  categoryInput.value = trip.category;

  editId = id;
  openModal();
}

// =====================
// Handle Button Delete
// =====================
function handleDeleteClick(id) {
  trips = trips.filter(t => t.id !== id);
   saveTripsToStorage();
  renderTrips();
  showNotification("Trip deleted successfully", "error");

}


document.addEventListener("click", e => {
  const editBtn = e.target.closest(".edit-btn");
  const deleteBtn = e.target.closest(".delete-btn");

  if (editBtn) {
    const id = Number(editBtn.dataset.id);
    handleEditClick(id);
  }

  if (deleteBtn) {
    const id = Number(deleteBtn.dataset.id);
    handleDeleteClick(id);
  }
});



// =====================
// Filter by Category
// =====================
categories.forEach((cat, index) => {
  const btn = document.createElement("button");
  btn.textContent = cat;
  btn.className = "px-4 py-2 rounded-full border text-sm";
   
  if (index === 0) {
    btn.classList.add("bg-teal-400", "text-white");
  }


  btn.addEventListener("click", () => {

      const allButtons = filterContainer.querySelectorAll("button");
      allButtons.forEach(b => {
      b.classList.remove("bg-teal-400", "text-white");
    });

   
    btn.classList.add("bg-teal-400", "text-white");


    if (cat === "All") {
      renderTrips();
    } else {
      renderTrips(trips.filter(t => t.category === cat));
    }
  });

  filterContainer.appendChild(btn);
});



function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
 };

  notification.innerHTML = `
    <div class="${colors[type]} text-white px-4 py-3 rounded-xl shadow-lg animate-bounce">
      ${message}
    </div>
  `;

  notification.classList.remove("hidden");

  setTimeout(() => {
    notification.classList.add("hidden");
  }, 2500);
}



loadTripsFromStorage();
renderTrips();
 



