
document.addEventListener("DOMContentLoaded", async () => {
    const player1Cards = document.getElementById("player1-cards");
    const player2Cards = document.getElementById("player2-cards");
    const combatButton = document.getElementById("combat-button");

    const player1Selection = JSON.parse(localStorage.getItem("player1Selection")) || [];
    const player2Selection = JSON.parse(localStorage.getItem("player2Selection")) || [];

    let selectedPlayer1 = null;
    let selectedPlayer2 = null;

    let currentRound = 1; // Definir el número de ronda

    async function registerBattle(winner, loser, round) {
        const battleData = {
            warrior1_id: loser.card.getAttribute("data-id"),
            warrior2_id: winner.card.getAttribute("data-id"),
            winner_id: winner.card.getAttribute("data-id"),
            round: round
        };
        try {
            const response = await fetch("http://localhost:3000/battles", {  // la URL para registrar las battalla
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(battleData)
            });
    
            const result = await response.json();
            console.log("✅ Batalla registrada:", result);
        } catch (error) {
            console.error("❌ Error al registrar la batalla:", error);
        }
    }
    

    async function fetchWarriorStats(warriorId) {
        try {
            const powerResponse = await fetch(`http://localhost:3000/warriorPowers/${warriorId}`);
            const spellResponse = await fetch(`http://localhost:3000/warriorSpells/${warriorId}`);
    
            const powerData = await powerResponse.json();
            const spellData = await spellResponse.json();
    
            return {
                power_percentage: powerData.length > 0 ? powerData[0].percentage : 0,
                spell_percentage: spellData.length > 0 ? spellData[0].percentage : 0
            };
        } catch (error) {
            //console.error("Error obteniendo poderes y hechizos:", error);
            return { power_percentage: 0, spell_percentage: 0 };
        }
    }

    function removeWarrior(loser, player) {
        const warriorId = parseInt(loser.card.getAttribute("data-id")); // Asegurar que sea número
        
        if (player === 1) {
            const index = player1Selection.findIndex(w => w.warrior_id == warriorId);
            if (index !== -1) {
                console.log("Antes de eliminar:", player1Selection);
                player1Selection.splice(index, 1);
                console.log("Después de eliminar:", player1Selection);
                localStorage.setItem("player1Selection", JSON.stringify(player1Selection));
            }
        } else if (player === 2) {
            const index = player2Selection.findIndex(w => w.warrior_id == warriorId);
            if (index !== -1) {
                console.log("Antes de eliminar:", player2Selection);
                player2Selection.splice(index, 1);
                console.log("Después de eliminar:", player2Selection);
                localStorage.setItem("player2Selection", JSON.stringify(player2Selection));
            }
        }

        console.log(`⚔️ Eliminado guerrero ID: ${warriorId} del jugador ${player}`);
        console.log("📌 Actualizando localStorage...");
        console.log("Jugador 1 después de eliminación:", JSON.parse(localStorage.getItem("player1Selection")));
        console.log("Jugador 2 después de eliminación:", JSON.parse(localStorage.getItem("player2Selection")));
    
        //console.log(`⚔️ Eliminado guerrero ID: ${warriorId} del jugador ${player}`);
        loser.card.remove();
    }

    async function createWarriorCard(warrior, player) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-id", warrior.warrior_id);

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");

        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");

        const img = document.createElement("img");
        img.src = `../assets/Img/warriors/${warrior.warrior_id}.jpg`;
        img.onerror = () => img.src = "../assets/Img/warriors/default.jpg";
        img.classList.add("card-img-top");

        // Obtener poderes y hechizos desde la API
        const { power_percentage, spell_percentage } = await fetchWarriorStats(warrior.warrior_id);

        // Verificar valores
        //console.log(`Warrior: ${warrior.name}, Power: ${power_percentage}, Spell: ${spell_percentage}`);

        // Calcular ataque
        const ataque = (warrior.Total_Powers * (1 + power_percentage / 100)) +
               (warrior.Total_Magic * (1 + spell_percentage / 100)) -
               (warrior.Health * 0.5);

        // Calcular la vida total
        const vidaTotal = warrior.Total_Powers + warrior.Total_Magic + warrior.Health + warrior.Speed + warrior.Intenlligence;
        let vidaActual = vidaTotal;

        const stats = document.createElement("p");
        stats.innerHTML = `Nombre: ${warrior.name}<br>
                           Tipo: ${warrior.type_name}<br>                           
                           Poder: ${warrior.Total_Powers} (${power_percentage}%)<br>
                           Magia: ${warrior.Total_Magic} (${spell_percentage}%)<br>
                           Daño: ${warrior.Health}<br>
                           Velocidad: ${warrior.Speed}<br>
                           Inteligencia: ${warrior.Intenlligence}<br>
                           Ataque: ${ataque.toFixed(2)}</b>`;
        // Barra de vida
        const healthBarContainer = document.createElement("div");
        healthBarContainer.classList.add("health-bar-container");

        const healthBarLabel = document.createElement("p");
        healthBarLabel.textContent = "Vida Total: " + vidaActual;
        healthBarLabel.style.fontWeight = "bold";

        const healthBar = document.createElement("div");
        healthBar.classList.add("health-bar");
        healthBar.style.width = "100%";

        healthBarContainer.appendChild(healthBarLabel);
        healthBarContainer.appendChild(healthBar);
        cardFront.appendChild(img);
        cardBack.appendChild(stats);
        cardBack.appendChild(healthBarContainer);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        // Evento para seleccionar una carta
        card.addEventListener("click", () => {
            if (player === 1 && !selectedPlayer1) {
                selectedPlayer1 = { card, ataque, vidaActual, healthBar, healthBarLabel };
                card.classList.add("selected");
            } else if (player === 2 && !selectedPlayer2) {
                selectedPlayer2 = { card, ataque, vidaActual, healthBar, healthBarLabel };
                card.classList.add("selected");
            }

            if (selectedPlayer1 && selectedPlayer2) {
                combatButton.disabled = false;
            }
        });

        return card;
    }
    // Crear las cartas
    for (const warrior of player1Selection) {
        const card = await createWarriorCard(warrior, 1);
        player1Cards.appendChild(card);
    }
    for (const warrior of player2Selection) {
        const card = await createWarriorCard(warrior, 2);
        player2Cards.appendChild(card);
    }

    combatButton.addEventListener("click", async (event) => {
        event.preventDefault();
        if (selectedPlayer1 && selectedPlayer2) {
            selectedPlayer1.card.classList.add("flipped");
            selectedPlayer2.card.classList.add("flipped");
    
            setTimeout( async () => {
                // Asegurar que selectedPlayer1 y selectedPlayer2 siguen existiendo
                if (!selectedPlayer1 || !selectedPlayer2) return;
    
                selectedPlayer1.vidaActual -= selectedPlayer2.ataque;
                selectedPlayer2.vidaActual -= selectedPlayer1.ataque;
    
                selectedPlayer1.healthBar.style.width = `${Math.max(selectedPlayer1.vidaActual, 0)}%`;
                selectedPlayer2.healthBar.style.width = `${Math.max(selectedPlayer2.vidaActual, 0)}%`;
    
                selectedPlayer1.healthBarLabel.textContent = `Vida: ${Math.max(selectedPlayer1.vidaActual, 0)}`;
                selectedPlayer2.healthBarLabel.textContent = `Vida: ${Math.max(selectedPlayer2.vidaActual, 0)}`;
    
                let winner,loser;

                if (selectedPlayer1.vidaActual <= 0 && selectedPlayer2.vidaActual <= 0) {
                    alert("¡Ambos guerreros han caído! Se decidirá el ganador...");
                
                    // FORZAR GANADOR: Si son iguales, elegir aleatoriamente
                    winner = Math.random() < 0.5 ? selectedPlayer1 : selectedPlayer2;
                    alert(`¡El ganador es ${winner.card.getAttribute("data-id")}!`);
                    console.log(`Ganador de la ronda: ${winner}`);


                    // Remover ambos guerreros del campo
                    removeWarrior(selectedPlayer1, 1);
                    removeWarrior(selectedPlayer2, 2);
                
                    // 
                    // selectedPlayer1.card.remove();
                    // selectedPlayer2.card.remove();
                    selectedPlayer1 = null;
                    selectedPlayer2 = null;


                } else if (selectedPlayer1.vidaActual <= 0) {
                    alert(`¡${selectedPlayer1.card.querySelector("p").innerText.split("\n")[0]} ha caído!`);
                    loser = selectedPlayer1;
                    winner = selectedPlayer2;
                } else if (selectedPlayer2.vidaActual <= 0) {
                    alert(`¡${selectedPlayer2.card.querySelector("p").innerText.split("\n")[0]} ha caído!`);
                    loser = selectedPlayer2;
                    winner = selectedPlayer1;
                }
                //remover el guerrero que pierda
                if (loser) {
                    removeWarrior(loser, loser === selectedPlayer1 ? 1 : 2);
                    if (loser === selectedPlayer1) selectedPlayer1 = null;
                    if (loser === selectedPlayer2) selectedPlayer2 = null;
                }
    
                if (selectedPlayer1) selectedPlayer1.card.classList.remove("selected");
                if (selectedPlayer2) selectedPlayer2.card.classList.remove("selected");
    
                combatButton.disabled = true;

                if (player1Selection.length === 0 || player2Selection.length === 0) {
                    alert("🎉 ¡Fin del juego! El ganador es el Jugador " + (player1Selection.length === 0 ? 2 : 1));
                    // Aquí podrías redirigir, guardar resultados, etc.
                }
                 
                // 📌 **REGISTRAR BATALLA EN LA BASE DE DATOS**
                if (winner && loser) {
                    await registerBattle(winner, loser, currentRound);
                }
                
                currentRound++;
            }, 2000);
        }    
    });    
});


