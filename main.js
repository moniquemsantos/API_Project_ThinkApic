const baseURL = `https://pixabay.com/api/?key=${key}&image_type=`;
let filterType = "all";

//READ MORE and READ LESS Button
// Verificar como adicionair o evento para os displays

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

/// SEARCH FUNCTIONALITY

function getBaseURL() {
  let url = baseURL;
  if (filterType) {
    url+=filterType;
  }
  return url;
}

// Handle search button click

const getSearchResult = (term) => {
  const url = `${(getBaseURL())}&q=${term}`;
  getData(url);
};

const addSearchSubmissionEvents = () => {
  const submitSearchButton = document.getElementById("submit-search");
  let e = "";
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

// Handle Filter selection

const addFilter = (filter) => {
  filterType = filter;
}

const addFilterSelectEvent = () => {
  const filtersOptions = document.querySelectorAll(".dropdown-item");

  // The querySelectorAll returns a NodeList, which is not an array.
  // So we need to use the forEach method from the Array prototype.
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeList
  filtersOptions.forEach((filterSelect) => {
    filterSelect.addEventListener("click", (event) => {
      // Here I'm selecting the dropdown menu button, to update the text
      const selectBtn = document.querySelector("#filterDropdownSelectBtn");
      selectBtn.innerText = event.target.innerText;

      // Here I'm calling the function to update the filterType variable
      filterType = event.target.innerText.toLowerCase();
      addFilter(filterType)
    });
  });
};

addFilterSelectEvent();

//CARDS GRID
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
    img.setAttribute("data-download-url", myData[i].largeImageURL);
    const divCard = document.createElement("div");
    divCard.setAttribute("class", "col-6 col-sm-12 col-md-6 col-lg-3");
    divCard.classList.add("card");
    divCard.id = myData[i].id;
    divCard.appendChild(img);

    cardContainer.appendChild(divCard);
  }
};

//MODAL
const modal = document.getElementById("img-modal");
modal.addEventListener("show.bs.modal", (event) => {
    const img = event.relatedTarget;
    const modalImg = document.getElementById("img-preview");
    const downloadBtn = document.getElementById("image-download-btn");
    downloadBtn.href = img.dataset.downloadUrl;
    modalImg.src = img.src;
});

const getData = (url) => {
  if (!url) {
    url = `https://pixabay.com/api/?key=${key}&image_type=`;
  }
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      console.log("result", result);
      createCardContainer(result);
    })
    .catch((error) => console.error(error));
};

getData();
// create an addSearchSubmissionEvents function to add the eventListener to your buttons
