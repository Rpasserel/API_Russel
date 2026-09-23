// Créer un utilisateur
async function createUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/users', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            location.reload();
        } else {
            const error = await response.json();
            alert('Erreur : ' + JSON.stringify(error));
        }
    } catch (error) {
        alert('Erreur réseau');
    }
}

// Modifier un utilisateur
async function updateUser(email) {
    const username = document.getElementById('username-' + email).value;

    try {
        const response = await fetch('/users/' + email, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
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

// Supprimer un utilisateur
async function deleteUser(email) {
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
        return;
    }

    try {
        const response = await fetch('/users/' + email, {
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