document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    if (username) {
        document.getElementById("loggedInUser").textContent = `@${username}`;
    }

    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/src/views/login.html";
    });
});

