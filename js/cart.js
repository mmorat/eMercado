const userID = 25801; // ID de usuario específico
const quantityInput = document.getElementById('quantity');
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const subtotal = document.getElementById('subtotal');
const productImage = document.querySelector('.table img');

// Realiza una solicitud a la API utilizando fetch
fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')
    .then(response => response.json())
    .then(data => {
        const product = data.products[0]; // Obtiene el primer producto

        productImage.src = product.image;
        productName.textContent = product.name;
        productPrice.textContent = product.cost;

        // Actualizar el subtotal cuando cambia la cantidad
        quantityInput.addEventListener('input', () => {
            const cantidad = parseInt(quantityInput.value);
            const subtotalValue = cantidad * product.cost;
            subtotal.textContent = subtotalValue;
        });
    })
    .catch(error => console.error('Error al obtener los datos de la API:', error));
  
  
  