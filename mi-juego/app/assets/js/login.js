document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita recargar la página

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");

    try {
        const response = await fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Guardar el token en localStorage para futuras peticiones
            localStorage.setItem("token", data.token);

            // Redirigir a la selección de jugadores
            window.location.href = "seleccion-jugadores.html";
        } else {
            // Mostrar mensaje de error
            errorMsg.textContent = data.error || "Credenciales incorrectas";
        }
    } catch (error) {
        errorMsg.textContent = "Error de conexión con el servidor";
    }
});
