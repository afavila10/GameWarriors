document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita el recargo de la página

    // Obtener los valores de los campos
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    //const role_id = document.getElementById("role").value;7
    const role_id = 1; //por defecto rol 1 user
    const errorMsg = document.getElementById("errorMsg");

    try {
        const response = await fetch("http://localhost:3000/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password, role_id}),
        });

        const data = await response.json();

        if (response.ok) {
            // Registro exitoso, redirigir a selección de jugadores
            window.location.href = "partidas.html";
        } else {
            // Mostrar mensaje de error
            errorMsg.textContent = data.error || "Error al registrar usuario";
        }
    } catch (error) {
        errorMsg.textContent = "Error de conexión con el servidor";
    }
});
