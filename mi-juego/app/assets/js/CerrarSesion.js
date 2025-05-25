document.addEventListener("DOMContentLoaded", async () => {
    const perfilDiv = document.getElementById("perfil");

    if (perfilDiv) {
        try {
            const response = await fetch("/mi-juego/app/public/views/components/perfil.html"); // Ruta relativa a tu proyecto
            const html = await response.text();
            perfilDiv.innerHTML = html;

            // Cargar nombre de usuario desde localStorage
            const username = localStorage.getItem("username");
            const userDisplay = document.getElementById("loggedInUser");

            if (username && userDisplay) {
                userDisplay.textContent = username;
            }

            // Agregar funcionalidad al botón de logout
            const logoutBtn = document.getElementById("logoutBtn");
            if (logoutBtn) {
                logoutBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    localStorage.clear();
                    window.location.href = "/mi-juego/app/views/login.html";
                });
            }
        } catch (error) {
            console.error("Error al cargar el componente de perfil:", error);
        }
    }
});
