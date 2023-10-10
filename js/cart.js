const baseURL = "https://japceibal.github.io/emercado-api/user_cart/";
const userID = 25801; // ID de usuario específico
const URL = baseURL + userID + ".json";
const cart = document.getElementById("cart");


fetch(URL)
    .then(response => response.json())
    .then(data => {
        data.articles.forEach((product) => {
            const subtotal = product.unitCost * product.count;
            const articulo = document.createElement("tr");
            articulo.innerHTML = `
            <td>
                <img src="${product.image}">
            </td>
            <td>
                <p>${product.name}</p>
            </td>
            <td>
                ${product.currency}$ ${product.unitCost}
            </td>
            <td>
                <input name="cantidad" type="number" value="${product.count}" min="0" max="10">
            </td>
            <td>
                ${product.currency}$ ${subtotal.toFixed(2)}
            </td>
            `

            cart.appendChild(articulo);
        })

    })
    .catch(error => console.error('Error al obtener los datos del carrito:', error));
  
  
  