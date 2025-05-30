
document.addEventListener("DOMContentLoaded", async () => {
    const player1List = document.getElementById("player1-list");
    const player2List = document.getElementById("player2-list");
    const startBattleBtn = document.getElementById("startBattle");

    let player1Selection = [];
    let player2Selection = [];
    
    // Obtener guerreros desde la API
    const response = await fetch("http://localhost:3000/warriors");
    const warriors = await response.json();

    // Mostrar guerreros en ambas listas
    warriors.forEach(warrior => {
        const warriorElement1 = createWarriorElement(warrior, player1Selection, player1List, "Jugador 1");
        const warriorElement2 = createWarriorElement(warrior, player2Selection, player2List, "Jugador 2");
        
        player1List.appendChild(warriorElement1);
        player2List.appendChild(warriorElement2);
    });

    // Función para crear un elemento de guerrero en la lista con imagen
    function createWarriorElement(warrior, selectionArray, listElement, player) {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "warrior-item");

        // Crear el icono
        const icon = document.createElement("i");
        icon.classList.add("bi", "bi-info-circle"); // "me-1" para margen derecha del icono

        //modal para ver los detalles del guerrero 
        const detailsBtn = document.createElement("button");
        
        detailsBtn.textContent = "Detalles ";
        detailsBtn.classList.add("btn", "btn-sm", "btn-secondary");

        detailsBtn.addEventListener("click", () => {
            const modalBody = document.getElementById("warriorModalBody");
            modalBody.innerHTML = `
                <p><strong style="color: rgb(106, 188, 24);">Nombre:</strong> ${warrior.name}</p>
                <p><strong style="color: rgb(106, 188, 24);">Total Power %:</strong> ${warrior.Total_Powers}</p>
                <p><strong style="color: rgb(106, 188, 24);">Total Magic %:</strong> ${warrior.Total_Magic}</p>
                <p><strong style="color: rgb(106, 188, 24);">Health %:</strong> ${warrior.Health}</p>
                <p><strong style="color: rgb(106, 188, 24);">Speed %:</strong> ${warrior.Speed}</p>
                <p><strong style="color: rgb(106, 188, 24);">Intelligence %:</strong> ${warrior.Intenlligence}</p>
                <p><strong style="color: rgb(106, 188, 24);">Status:</strong> ${warrior.Status}</p>
                <p><strong style="color: rgb(106, 188, 24);">Type:</strong> ${warrior.type_name}</p>
                <p><strong style="color: rgb(106, 188, 24);">Race:</strong> ${warrior.race_name}</p>
                
            `;
            const modal = new bootstrap.Modal(document.getElementById("warriorModal"));
            modal.show();
        });

        const img = document.createElement("img");
        img.src = `../assets/Img/warriors/${warrior.warrior_id}.jpg`;  // Imagen basada en warrior_id
        img.onerror = () => img.src = "../assets/Img/warriors/default.jpg"; // Imagen por defecto si no existe
        img.classList.add("warrior-img");

        const nameSpan = document.createElement("span");
        nameSpan.textContent = warrior.name;

        const icon2 = document.createElement("i");
        icon2.classList.add("bi", "bi-pen"); // "me-1" para margen derecha del icono

        const btn = document.createElement("button");
        btn.textContent = "Seleccionar ";
        btn.classList.add("btn", "btn-sm", "btn-success");

        

        btn.addEventListener("click", () => {
            if (selectionArray.length < 5) {
                selectionArray.push(warrior);
                btn.disabled = true;
                li.classList.add("list-group-item-success");
            }
            if (selectionArray.length === 5) {
                listElement.querySelectorAll("button").forEach(button => button.disabled = true);
            }
            checkSelections();
        });

        li.appendChild(img);
        li.appendChild(nameSpan);
        btn.appendChild(icon2);
        li.appendChild(btn);
        detailsBtn.appendChild(icon);
        li.appendChild(detailsBtn); // Botón Detalles
        return li;
    }

    // Verificar si ambos jugadores han seleccionado 5 guerreros
    function checkSelections() {
        if (player1Selection.length === 5 && player2Selection.length === 5) {
            startBattleBtn.disabled = false;
        }
    }

    // Guardar selección y redirigir a la batalla
    startBattleBtn.addEventListener("click", () => {
        localStorage.setItem("player1Selection", JSON.stringify(player1Selection));
        localStorage.setItem("player2Selection", JSON.stringify(player2Selection));
        
        window.location.href = "batalla.html";
    });
});
