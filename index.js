//POST method to push new products from items in url API
const url = "https://striveschool-api.herokuapp.com/api/product/";
const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIyZDI0ODMxYTczZjAwMTlkNWM1YmYiLCJpYXQiOjE3MDYyMTgwNTYsImV4cCI6MTcwNzQyNzY1Nn0.s4lzRgyR6isaOThQTmJf2qvZNXMrSCwR-l1g7g-tXRg`;

const items = [
  {
    name: "T-shirt bianca",
    description: "T-shirt in cotone 100%, taglio classico, maniche corte.",
    brand: "Levi's",
    imageUrl:
      "https://img01.ztat.net/article/spp-media-p1/664992592bce3365977dedefceb8b326/31c479d51b694acd802ed0be57034b38.jpg?imwidth=1800",
    price: 25.0,
  },
  {
    name: "SEDUCTIVE NOIR FOR WOMEN FRAGRANCE MIST - Eau de Toilette",
    description: "Profumo da corpo, non adatto a gente senza corpo.",
    brand: "Guess Fragrances",
    imageUrl:
      "https://img01.ztat.net/article/spp-media-p1/c12260d666394d1c809909f94ff11732/fe3dc115e65948e2b140739120b08d15.jpg?imwidth=1800&filter=packshot",
    price: 9.99,
  },
  {
    name: "Scarpe da ginnastica",
    description: "Scarpe da ginnastica in pelle, con suola in gomma.",
    brand: "Nike",
    imageUrl:
      "https://img01.ztat.net/article/spp-media-p1/0721ad5f40544b0cb7af6f2084939e92/f353b117015f428fbcf73f1262bda5c3.jpg?imwidth=1800&filter=packshot",
    price: 100.0,
  },
  {
    name: "FOR HER EAU DE PARFUM - Eau de Parfum",
    description: "Profumo da donna per occasioni speciali",
    brand: "Narciso Rodriguez Fragrances",
    imageUrl:
      "https://img01.ztat.net/article/spp-media-p1/d7a50854ee2a4be88b7e206773790a11/32021627517d4eaeb0abfdecb707579b.jpg?imwidth=1800",
    price: 69.99,
  },
];

const addItems = async () => {
  for (const prod of items) {
    try {
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(prod),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.error("Error: " + e);
    }
  }
};
addItems(); //--> used to post the fist items into api

// Delete method to delete cards
const deleteItems = async (productId, cardId) => {
  try {
    const response = await fetch(`${url}/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
    });
    window.location.assign("./index.html");
    if (response.ok) {
      console.log(
        `La card con idetificativo ${productId} è stata eliminata correttamente`
      );
      const cardElement = document.getElementById(`product_card_${cardId}`);
      if (cardElement) {
        cardElement.remove();
      }
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (e) {
    console.error("Error: ", e);
  }
};

//GET method to fetch the new products into HTML
const fetchItems = async () => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    });
    const itemsInApi = await response.json();
    console.log(itemsInApi);

    const itemsContainer = document.getElementById("result-container");
    // itemsContainer.innerHTML = "";
    itemsInApi.forEach((product) => {
      const singleCardId = `product_card_${product._id}`;
      itemsContainer.innerHTML += `
      <div class="card bg-secondary-subtle product_card p-0" style="width: 18rem;" id="${singleCardId}">
        <img src="${product.imageUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text fst-italic fs-6 text-body-tertiary">${product.brand}</p>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <div class="d-flex align-items-center gap-2"> 
            <button type="button" class="btn btn-success" id="edit-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Modifica</button>
            <button type="button" class="btn btn-success" id="delete-btn_${product._id}" data-product-id="${product._id}" data-card-id="${singleCardId}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
            </svg>
            </button>
          </div>
          <div class="card-text d-flex justify-content-end fs-4 fw-semibold">${product.price} €</div>
        </div>
      </div>`;
    });

    const deleteButtons = document.querySelectorAll('[id^="delete-btn_"]');
    deleteButtons.forEach((button) => {
      const productId = button.getAttribute("data-product-id");
      const cardId = button.getAttribute("data-card-id");
      button.addEventListener("click", () => deleteItems(productId, cardId));
    });
  } catch (e) {
    console.error("Error: " + e);
  }
};

// Now I'm going to create a new function to post new item in the container using a form
const createNewProduct = async () => {
  const nameInput = document.getElementById("name").value;
  const descriptionInput = document.getElementById("description").value;
  const brandInput = document.getElementById("brand").value;
  const imageUrlInput = document.getElementById("imageUrl").value;
  const priceInput = document.getElementById("price").value;

  const data = {
    name: nameInput,
    description: descriptionInput,
    brand: brandInput,
    imageUrl: imageUrlInput,
    price: +priceInput,
  };
  console.log(data);

  try {
    let response = {};
    response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    window.location.assign("./index.html");
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      document.getElementById("error").innerHTML = "";
      document.getElementById("success").innerHTML =
        "Articolo creato correttamente";
    } else {
      document.getElementById("error").innerHTML = "Errore!";
      document.getElementById("success").innerHTML = "";
    }
  } catch (error) {
    document.getElementById("error").innerHTML = "Errore: " + error.message;
    document.getElementById("success").innerHTML = "";
  }
};

const saveButton = document.getElementById("save-btn");
saveButton.addEventListener("click", createNewProduct);

fetchItems();

//Create a new fetch that edit the cards
const editProduct = async (productId, updatedData) => {
  try {
    const response = await fetch(`${url}/${productId}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.ok) {
      console.log(`Il prodotto ${productId} è stato aggiornato con successo`);
    } else {
      console.error(`Errore durante l'aggiornamento: ${response.status}`);
    }
  } catch (e) {
    console.error("Error: ", e);
  }
};
