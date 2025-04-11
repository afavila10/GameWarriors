document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.querySelector("#battle-history tbody");
    const sortByRoundBtn = document.getElementById("sort-round");
    const sortByWinnerBtn = document.getElementById("sort-winner");

    let battles = [];

    try {
        const response = await fetch("http://localhost:3000/battles");
        battles = await response.json();
        renderTable(battles);
    } catch (error) {
        console.error("Error al obtener el historial:", error);
    }

    function renderTable(data) {
        tableBody.innerHTML = ""; // Limpiar tabla antes de mostrar nueva ordenación

        data.forEach(battle => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${battle.round}</td>
                <td>${battle.warrior1_name}</td>
                <td>${battle.warrior2_name}</td>
                <td>${battle.winner_name}</td>
                <td>${determineWinner(battle)}</td>
            `;

            if (battle.winner_name === battle.warrior1_name) {
                row.children[3].classList.add("winner-highlight");
                row.children[4].classList.add("winner-highlight");
            } else {
                row.children[3].classList.add("winner-highlight");
                row.children[4].classList.add("winner-highlight");
            }

            tableBody.appendChild(row);
        });
    }

    function determineWinner(battle) {
        return battle.winner_name === battle.warrior1_name ? "Jugador 1" : "Jugador 2";
    }

    sortByRoundBtn.addEventListener("click", () => {
        battles.sort((a, b) => a.round - b.round);
        renderTable(battles);
    });

    sortByWinnerBtn.addEventListener("click", () => {
        battles.sort((a, b) => a.winner_name.localeCompare(b.winner_name));
        renderTable(battles);
    });
});
