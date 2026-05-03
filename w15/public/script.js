fetch("/products")
.then(response => response.json())
.then(data => {
    const container = document.getElementById("product-container");

    data.forEach(product => {
        container.innerHTML += `
            <div class="card">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p><b>Price:</b> ₹${product.price}</p>
            </div>
        `;
    });
});
