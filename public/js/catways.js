// Créer un catway
async function createCatway() {
    const catwayNumber = document.getElementById('catwayNumber').value;
    const catwayType = document.getElementById('catwayType').value;
    const catwayState = document.getElementById('catwayState').value;

    try {
        const response = await fetch('/catways', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ catwayNumber, catwayType, catwayState })
        });

        if (response.ok) {
            location.reload(); // recharge la page pour afficher le nouveau catway
        } else {
            alert('Erreur lors de la création');
        }
    } catch (error) {
        alert('Erreur réseau');
    }
}

// Modifier l'état d'un catway
async function updateCatway(catwayNumber) {
    const catwayState = document.getElementById('state-' + catwayNumber).value;

    try {
        const response = await fetch('/catways/' + catwayNumber, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ catwayState })
        });

        if (response.ok) {
            location.reload();
        } else {
            alert('Erreur lors de la modification');
        }
    } catch (error) {
        alert('Erreur réseau');
    }
}

// Supprimer un catway
async function deleteCatway(catwayNumber) {
    if (!confirm('Voulez-vous vraiment supprimer ce catway ?')) {
        return;
    }

    try {
        const response = await fetch('/catways/' + catwayNumber, {
            method: 'DELETE'
        });

        if (response.ok) {
            location.reload();
        } else {
            alert('Erreur lors de la suppression');
        }
    } catch (error) {
        alert('Erreur réseau');
    }
}