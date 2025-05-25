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
            
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("username", data.username);
            // Redirigir según el rol
            if (data.role === "Administrador") {
                window.location.href = "../public/views/UserTable.html";
            } else if (data.role === "Usuario") {
                window.location.href = "partidas.html";
            } else {
                window.location.href = "partidas.html"; // Por si acaso
            }
        } else {
            // Mostrar mensaje de error
            errorMsg.textContent = data.error || "Credenciales incorrectas";
        }
    } catch (error) {
        errorMsg.textContent = "Error de conexión con el servidor";
    }
});
