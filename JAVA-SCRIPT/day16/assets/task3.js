
let products = [];

function addProduct() {

    let productName = document.getElementById("productName").value;
    let price = document.getElementById("price").value;
    let category = document.getElementById("category").value;

    let product = {
        name: productName,
        price: price,
        category: category
    };

    products.push(product);

    let output = "";

    products.forEach(function(product) {

        output += `
            <div class="product">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Category: ${product.category}</p>
            </div>
        `;
    });

    document.getElementById("productList").innerHTML = output;
}
