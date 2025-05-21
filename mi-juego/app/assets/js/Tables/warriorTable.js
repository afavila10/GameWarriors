document.addEventListener('DOMContentLoaded', () => {
    const warriorTableBody = document.getElementById('warriorTableBody');
    const editWarriorForm = document.getElementById('editWarriorForm');

    // Cargar perfiles al cargar la página
    fetchWarriors();

    async function fetchWarriors() {
        try {
            const res = await fetch('http://localhost:3000/warriors');
            const data = await res.json();
            renderWarrior(data);
        } catch (error) {
            console.error('Error al obtener warriors:', error);
        }
    }

    /**here I go */

    function renderWarrior(warriors) {
        warriorTableBody.innerHTML = '';
        warriors.forEach(warrior => {
            warriorTableBody.innerHTML += `
          <tr>
            <td>${warrior.warrior_id}</td>
            <td>${warrior.name}</td>
            <td>${warrior.Total_Powers}</td>
            <td>${warrior.Total_Magic}</td>
            <td>${warrior.Health}</td>
            <td>${warrior.Speed}</td>
            <td>${warrior.Intenlligence}</td>
            <td>${warrior.Status}</td>
            <td>${warrior.type_id}</td>
            <td>${warrior.race_id}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(warrior)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-success btn-sm" onclick="showWarrior(${warrior.warrior_id})">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteWarrior(${warrior.warrior_id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (warrior) => {
        document.getElementById('editWarriorId').value = warrior.warrior_id;
        document.getElementById('editWarriorName').value = warrior.name;
        document.getElementById('editWarriorTotalPowers').value = warrior.Total_Powers;
        document.getElementById('editWarriorTotalMagic').value = warrior.Total_Magic;
        document.getElementById('editWarriorHealth').value = warrior.Health;
        document.getElementById('editWarriorSpeed').value = warrior.Speed;
        document.getElementById('editWarriorIntenlligence').value = warrior.Intenlligence;
        document.getElementById('editWarriorStatus').value = warrior.Status;
        document.getElementById('editWarriorTypeId').value = warrior.type_id;
        document.getElementById('editWarriorRaceId').value = warrior.race_id;
        const modal = new bootstrap.Modal(document.getElementById('editWarriorModal'));
        modal.show();
    };

    // Enviar edición
    editWarriorForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editWarriorId').value;

        const updatedWarrior = {
            name: document.getElementById('editWarriorName').value,
            Total_Powers: document.getElementById('editWarriorTotalPowers').value,
            Total_Magic: document.getElementById('editWarriorTotalMagic').value,
            Health: document.getElementById('editWarriorHealth').value,
            Speed: document.getElementById('editWarriorSpeed').value,
            Intenlligence: document.getElementById('editWarriorIntenlligence').value,
            Status: document.getElementById('editWarriorStatus').value,
            type_id: document.getElementById('editWarriorTypeId').value,
            race_id: document.getElementById('editWarriorRaceId').value,
        };

        try {

            const res = await fetch(`http://localhost:3000/warriors/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedWarrior)
            });

            if (res.ok) {
                fetchWarriors();
                document.activeElement.blur(); // Elimina el foco del botón
                bootstrap.Modal.getInstance(document.getElementById('editWarriorModal')).hide();
            } else {
                console.error('Error al editar warrior');
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    });

    // Eliminar warrior
    window.deleteWarrior = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este warrior?')) return;

        try {
            const res = await fetch(`http://localhost:3000/warriors/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchWarriors();
            } else {
                console.error('Error al eliminar warrior');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };

    //ver warrior
    window.showWarrior = async function (id) {
    try {
        console.log("Obteniendo detalles del warrior con ID:", id);
        const res = await fetch(`http://localhost:3000/warriors/${id}`);
        if (!res.ok) throw new Error("The warrior could not be retrieved.");
        const warrior = await res.json();
        console.log(warrior);

        // Asigna los datos al modal (usa exactamente los mismos nombres)
        document.getElementById("viewWarriorId").textContent = warrior.warrior_id;
        document.getElementById("viewWarriorname").textContent = warrior.name;
        document.getElementById("viewWarriorPower").textContent = warrior.Total_Powers;
        document.getElementById("viewWarriorMagic").textContent = warrior.Total_Magic;
        document.getElementById("viewWarriorHealth").textContent = warrior.Health;
        document.getElementById("viewWarriorSpeed").textContent = warrior.Speed;
        document.getElementById("viewWarriorIntenlligence").textContent = warrior.Intenlligence;
        document.getElementById("viewWarriorStatus").textContent = warrior.Status;
        document.getElementById("viewWarriorType").textContent = warrior.type_id;
        document.getElementById("viewWarriorRace").textContent = warrior.race_id;

        // Muestra el modal
        document.activeElement.blur(); // evita error de aria-hidden
        const modal = new bootstrap.Modal(document.getElementById("viewWarriorModal"));
        modal.show();
        } catch (error) {
            console.error("Error loading warrior details:", error);
            alert("There was a problem loading the warrior details.");
        }
    };



    //Modal
    document.getElementById("createWarriorForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("createName").value.trim();
        const Total_Powers = document.getElementById("createTotalPowers").value.trim();
        const Total_Magic = document.getElementById("createTotalMagic").value.trim();
        const Health = document.getElementById("createHealth").value.trim();
        const Speed = document.getElementById("createSpeed").value.trim();
        const Intenlligence = document.getElementById("createIntenlligence").value.trim();
        const Status = document.getElementById("createStatus").value.trim();
        const type_id = document.getElementById("createTypeId").value.trim();
        const race_id = document.getElementById("createRaceId").value.trim();


        // Validación básica
        if (!name || !Total_Powers || !Total_Magic || !Health || !Speed || !Intenlligence || !Status || !type_id || !race_id) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/warriors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    Total_Powers,
                    Total_Magic,
                    Health,
                    Speed,
                    Intenlligence,
                    Status,
                    type_id,
                    race_id
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert("warrior creado correctamente");
                document.getElementById("createWarriorForm").reset();
                document.activeElement.blur();
                const modal = bootstrap.Modal.getInstance(document.getElementById("createWarriorModal"));
                modal.hide();
                await fetchWarriors(); // Recarga la tabla con los perfiles actualizados
            } else {
                alert("Error al crear un warrior: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});


