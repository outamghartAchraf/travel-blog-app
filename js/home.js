
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
  {
    id: 2,
    title: "Summer England",
    country: "England",
    image: "../assets/images/acticle2.jpg",
    category: "Forest",
    time: "15 min",
    likes: "12k",
    author: "Ian Jachson"
  },
  {
    id: 3,
    title: "Sunset Beach",
    country: "Maldives",
    image: "../assets/images/acticle3.jpg",
    category: "Beach",
    time: "15 min",
    likes: "12k",
    author: "Ian Jachson"
  }
];

let editId = null;

// =====================
// Categories
// =====================
const categories = ["All", "Forest", "Beach", "River", "Mountains", "Road"];

// =====================
// Render 
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
}




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



renderTrips();
 



