const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', async function() {
  const token = localStorage.getItem('accessToken');
  console.log(token);
  try {
    const response = await fetch('https://ody-api.onrender.com/api/user/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('data', data);
      localStorage.removeItem('accessToken'); // Supprimer l'accessToken du localStorage
      localStorage.removeItem('loggedIn'); // Réinitialiser le statut de connexion
      window.location.href = 'login.html'; // Rediriger vers la page de connexion
    } else {
      console.log('La demande de déconnexion a échoué.');
    }
  } catch (error) {
    console.log(error);
    console.log('erreur');
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const expForm = document.getElementById('exp-form');
  
    expForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const nomexp = document.getElementById('nomexp').value;
      const prix = document.getElementById('prix').value;
      const duree = document.getElementById('duree').value;
      const depart = document.getElementById('depart').value;
      const pays = document.getElementById('pays').value;
      const nomcontinent = document.getElementById('continent').value;
      let continent = '';
      if (nomcontinent === 'Europe') {
        continent = '645696692bace0d40aadd605';
      } else if (nomcontinent === 'Asie') {
        continent = '645696692bace0d40aadd607';
      } else if (nomcontinent === 'Afrique') {
        continent = '645696692bace0d40aadd608';
      } else if (nomcontinent === 'Amerique') {
        continent = '645696692bace0d40aadd606';
      } else if (nomcontinent === 'Oceanie') {
        continent = '645696692bace0d40aadd609';
      }
      const activites = document.getElementById('activites').value;
      const nbpers = document.getElementById('nbpers').value;
      //const hashedPassword = await bcrypt.hash(password, 10); // hacher le mot de passe avec bcrypt
      //console.log(hashedPassword);
      try {
        const response = await fetch('https://ody-api.onrender.com/api/exp/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '127.0.0.1'
           
          },
          body: JSON.stringify({ nomexp, prix, duree, depart, pays, continent, activites, nbpers }),
        });
        if (response.ok) {
          // Rediriger vers la page de connexion si l'enregistrement est réussi
          window.location.href = 'envies.html';
        } else {
          // Afficher une erreur si l'enregistrement échoue
          const data = await response.json();
          setError(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    });
});