document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("id");

  const product = PRODUCTS.find(p => p.id == id);

  const detail = document.getElementById("productDetail");

  if (!product || !detail) return;

  detail.innerHTML = `
    <div class="product-card">
      <img src="${product.image}" />
      <h2>${product.name}</h2>
      <p>Type: ${product.type}</p>
      <p>Color: ${product.color}</p>
      <p>Price: $${product.price}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    </div>
  `;

  // recommendations
  const shoes = getRecommendations(product, "shoes");
  const jewelry = getRecommendations(product, "jewelry");

  document.getElementById("shoeRecs").innerHTML =
    shoes.map(p => `
      <div class="rec-card">
        <p>${p.name}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>Add</button>
      </div>
    `).join("");

  document.getElementById("jewelryRecs").innerHTML =
    jewelry.map(p => `
      <div class="rec-card">
        <p>${p.name}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>Add</button>
      </div>
    `).join("");
});