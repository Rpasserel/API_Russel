// Créer une réservation
async function createReservation() {
    const catwayNumber = document.getElementById('catwayNumber').value;
    const clientName = document.getElementById('clientName').value;
    const boatName = document.getElementById('boatName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const description = document.getElementById('description').value;

    try {
        const response = await fetch('/catways/' + catwayNumber + '/reservations', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clientName, boatName, startDate, endDate, description })
        });

        if (response.ok) {
            location.reload();
        } else {
            const error = await response.json();
            alert('Erreur : ' + JSON.stringify(error));
        }
    } catch (error) {
        console.log(error);
        alert('Erreur réseau');
    }
}

// Modifier une réservation
async function updateReservation(catwayNumber, reservationId) {
    const clientName = document.getElementById('client-' + reservationId).value;
    const boatName = document.getElementById('boat-' + reservationId).value;
    const startDate = document.getElementById('start-' + reservationId).value;
    const endDate = document.getElementById('end-' + reservationId).value;

    try {
        const response = await fetch('/catways/' + catwayNumber + '/reservations/' + reservationId, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clientName, boatName, startDate, endDate })
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

// Supprimer une réservation
async function deleteReservation(catwayNumber, reservationId) {
    if (!confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
        return;
    }

    try {
        const response = await fetch('/catways/' + catwayNumber + '/reservations/' + reservationId, {
            method: 'DELETE',
            credentials: 'same-origin'
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