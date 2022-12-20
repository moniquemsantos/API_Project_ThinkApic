// Consts and data;
const baseURL = `https://pixabay.com/api/?key=${key}`;
let imageTypeFilter = "&image_type=all";
let colorFilter = "";
let colors = [];
let data = [];

//////////////// READ MORE and READ LESS Button

const readMoreBtn = document.querySelector(".read-more-btn");
const text = document.querySelector(".text");
readMoreBtn.addEventListener("click", (e) => {
  text.classList.toggle("show-more");
  if (readMoreBtn.innerText === "Read More") {
    readMoreBtn.innerText = "Read Less";
  } else {
    readMoreBtn.innerText = "Read More";
  }
});

/////////////// SEARCH FUNCTIONALITY

function getBaseURL() {
  let url = baseURL;
  if (imageTypeFilter) {
    url += imageTypeFilter;
  }
  if (colors.length > 0 && colorFilter) {
    url += colorFilter;
  }
  return url;
}

// Handle search button click
const getSearchResult = (term) => {
  const url = `${getBaseURL()}&q=${term}`;
  getData(url);
};

const addSearchSubmissionEvents = () => {
  const submitSearchButton = document.getElementById("submit-search");
  const searchInput = document.getElementById("search-term");

  submitSearchButton.addEventListener("click", () => {
    const e = searchInput.value;
    getSearchResult(e);
  });

  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && document.activeElement === searchInput) {
      const e = searchInput.value;
      getSearchResult(e);
    }
  });
};

addSearchSubmissionEvents();

///////////// HANDLE FILTER SELECTION

const addFilter = (filterName, filter) => {
  if (filterName === "image_type") {
    imageTypeFilter = `&image_type=${filter}`;
  }
  if (filterName === "colors") {
    colorFilter = `&colors=${filter}`;
  }
};

//// Image Type Filter

const addImageTypeFilterSelectEvent = () => {
  const filtersOptions = document.querySelectorAll(".dropdown-item");

  // The querySelectorAll returns a NodeList, which is not an array.
  // So we need to use the forEach method from the Array prototype.
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeList
  filtersOptions.forEach((filterSelect) => {
    filterSelect.addEventListener("click", (event) => {
      // Here I'm selecting the dropdown menu button, to update the text
      const selectBtn = document.querySelector("#filterDropdownSelectBtn");
      selectBtn.innerText = event.target.innerText;

      // Here I'm calling the function to update the imageTypeFilter variable
      imageTypeFilter = event.target.innerText.toLowerCase();
      addFilter("image_type", imageTypeFilter);
    });
  });
};

addImageTypeFilterSelectEvent();

const addNewColor = (color) => {
  if (!colors.includes(color)) {
    colors.push(color);
  }
  addFilter("colors", colors.join(","));
};

const removeColor = (removedColor) => {
  if (colors.includes(removedColor)) {
    colors = colors.filter((color) => color !== removedColor);
  }
  addFilter("colors", colors.join(","));
};

const addColorFilterSelectEvent = () => {
  const colorFiltersCheckBoxes = document.querySelectorAll(
    '[data-filter="color"]'
  );
  colorFiltersCheckBoxes.forEach((colorFilterCheckBox) => {
    colorFilterCheckBox.addEventListener("click", (event) => {
      if (event.target.checked) {
        addNewColor(event.target.value);
      } else {
        removeColor(event.target.value);
      }
    });
  });
};

addColorFilterSelectEvent();

/////////////// CARDS GRID

const createCardContainer = (result) => {
  const myData = result.hits;
  const cardContainer = document.getElementById("cards-container");
  cardContainer.innerText = "";

  for (let i = 0; i < myData.length; i++) {
    const img = document.createElement("img");
    const src = myData[i].webformatURL;
    img.src = src;
    img.alt = "picture";
    img.setAttribute("class", ".img-thumb");
    img.setAttribute("data-bs-toggle", "modal");
    img.setAttribute("data-bs-target", "#img-modal");
    img.setAttribute("data-likes", myData[i].likes);
    img.setAttribute("data-download-url", myData[i].largeImageURL);
    const divCard = document.createElement("div");
    const icon = document.createElement("i");
    icon.className = "fa fa-heart";
    icon.classList.add("iconStyle");
    const likesText = document.createElement("span");
    likesText.classList.add("likePosition");
    divCard.setAttribute("class", "col-6 col-sm-12 col-md-6 col-lg-3");
    divCard.classList.add("card");
    divCard.id = myData[i].id;
    divCard.appendChild(img);
    likesText.appendChild(icon);
    likesText.append(myData[i].likes);
    divCard.appendChild(likesText);
    cardContainer.appendChild(divCard);
  }
};

///////////////////// MODAL
const modal = document.getElementById("img-modal");
modal.addEventListener("show.bs.modal", (event) => {
  const img = event.relatedTarget;
  const modalImg = document.getElementById("img-preview");
  const downloadBtn = document.getElementById("image-download-btn");
  downloadBtn.href = img.dataset.downloadUrl;
  modalImg.src = img.src;
});

////////////////// GET DATA

const getData = (url) => {
  if (!url) {
    url = `https://pixabay.com/api/?key=${key}`;
  }
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      console.log("result", result);
      data = [...result.hits];
      createCardContainer(result);
    })
    .catch((error) => console.error(error));
};

getData();
