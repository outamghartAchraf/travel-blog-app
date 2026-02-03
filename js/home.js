
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
