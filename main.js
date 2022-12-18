//READ MORE AND READ LESS BOTTON
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

/*function myFunction() {
  const dots = document.getElementById("dots");
  const moreText = document.getElementById("more");
  const btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerText = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerText = "Read less";
    moreText.style.display = "inline";
  }
}*/

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
    const divCard = document.createElement("div");
    divCard.setAttribute("class", "col-6 col-sm-12 col-md-6 col-lg-3");
    divCard.classList.add("card");
    divCard.appendChild(img);

    cardContainer.appendChild(divCard);
  }
};

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

const baseURL = `https://pixabay.com/api/?key=${key}&image_type=`;

const getSearchResult = () => {
  let e = document.getElementById("inputGroupSelect04");

  getData(baseURL + e.value);
};

getData();
// create an addEvents function to add the eventListener to your buttons
