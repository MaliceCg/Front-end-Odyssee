///////////////////////////DECONNEXION/////////////////////////////////
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
      window.location.href = 'login'; // Rediriger vers la page de connexion
    } else {
      console.log('La demande de déconnexion a échoué.');
    }
  } catch (error) {
    console.log(error);
    console.log('erreur');
  }
});


///////////////////////////CREATION EXPERIENCE/////////////////////////////////
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
      const token = localStorage.getItem('accessToken');
  console.log(token);
      //const hashedPassword = await bcrypt.hash(password, 10); // hacher le mot de passe avec bcrypt
      //console.log(hashedPassword);
      try {
        const response = await fetch('https://ody-api.onrender.com/api/exp/create', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '127.0.0.1'
           
          },
          body: JSON.stringify({ nomexp, prix, duree, depart, pays, continent, activites, nbpers }),
        });
        if (response.ok) {
          // Rediriger vers la page de connexion si l'enregistrement est réussi
          window.location.href = 'envies';
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


///////////////////////////AFFICHER ET MODIFIER GUIDE///////////////////////////
fetch('https://ody-api.onrender.com/api/guide/')
  .then(response => response.json())
  .then(data => {
    const guideContainer = document.querySelector(".guides");

    data.forEach(guide => {
        const guideElement = createGuideElement(guide);
        guideContainer.appendChild(guideElement);
    });

  });

function createGuideElement(guide) {
  const guideElement = document.createElement('article');
  guideElement.classList.add('guide');

  const nomElement = document.createElement('h2');
  nomElement.innerText = guide.nom;
  guideElement.appendChild(nomElement);

  const prenomElement = document.createElement('h2');
  prenomElement.innerText = guide.prenom;
  guideElement.appendChild(prenomElement);

  const numElement = document.createElement('h2');
  numElement.innerText = guide.numeroTelephone;
  guideElement.appendChild(numElement);

const nomInput = document.createElement('input');
nomInput.style.display = 'none';
nomInput.value = guide.nom;
guideElement.appendChild(nomInput);

const prenomInput = document.createElement('input');
prenomInput.style.display = 'none';
prenomInput.value = guide.prenom;
guideElement.appendChild(prenomInput);

const numInput = document.createElement('input');
numInput.style.display = 'none';
numInput.value = guide.numeroTelephone;
guideElement.appendChild(numInput);


const updateBtn = document.createElement('button');
updateBtn.innerText = 'Modifier les informations';
updateBtn.addEventListener('click', () => {
  // Afficher les champs de saisie et cacher les éléments <h2>
  nomInput.style.display = 'block';
  prenomInput.style.display = 'block';
  numInput.style.display = 'block';

  nomElement.style.display = 'none';
  prenomElement.style.display = 'none';
  numElement.style.display = 'none';

  updateBtn.style.display = 'none'; // Cacher le bouton "Modifier les informations"
  saveBtn.style.display = 'block'; // Afficher le bouton "Enregistrer"
});

const saveBtn = document.createElement('button');
saveBtn.innerText = 'Enregistrer';
saveBtn.style.display = 'none'; // Cacher le bouton "Enregistrer" par défaut
saveBtn.addEventListener('click', async () => {
  const updatedGuide = {
    _id: guide._id,
    nom: nomInput.value,
    prenom: prenomInput.value,
    numeroTelephone: numInput.value
  };

  console.log(updatedGuide); // Affiche les nouvelles informations dans la console
  await updateGuide(updatedGuide);

  // Envoie updatedGuide au backend pour mise à jour (utilisez votre propre logique ici)
  // await updateGuide(updatedGuide);
 

  // Mettre à jour les éléments <h2> avec les nouvelles valeurs
  nomElement.innerText = updatedGuide.nom;
  prenomElement.innerText = updatedGuide.prenom;
  numElement.innerText = updatedGuide.numeroTelephone;

  // Afficher les éléments <h2> et cacher les champs de saisie
  nomElement.style.display = 'block';
  prenomElement.style.display = 'block';
  numElement.style.display = 'block';

  nomInput.style.display = 'none';
  prenomInput.style.display = 'none';
  numInput.style.display = 'none';

  saveBtn.style.display = 'none'; // Cacher le bouton "Enregistrer"
  updateBtn.style.display = 'block'; // Afficher le bouton "Modifier les informations"
});
  
  guideElement.appendChild(updateBtn);
  guideElement.appendChild(saveBtn);

  return guideElement;
}



async function updateGuide(guideinfo) {
  console.log(guideinfo);
  const token = localStorage.getItem('accessToken');
  console.log(token);
  idguide = guideinfo._id;
  console.log(idguide);

  try {
    const response = await fetch(`https://ody-api.onrender.com/api/guide/${idguide}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        
        'Access-Control-Allow-Origin': '127.0.0.1',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({nom: guideinfo.nom, prenom: guideinfo.prenom, numeroTelephone: guideinfo.numeroTelephone}),
    });
    console.log(response);

    if (response.ok) {
      const data = await response.json();
      console.log('data', data);
     
    } else {
      console.log('La demande de modification a échoué.');
    }
  } catch (error) {
    console.log(error);
    console.log('erreur');
  }
}

///////////////////////////CREER GUIDE////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const createGuideForm = document.querySelector('#guide-form');
  createGuideForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const numeroTelephone = document.getElementById('num').value;
    const token = localStorage.getItem('accessToken');
   console.log(token);
    try {
      const response = await fetch('https://ody-api.onrender.com/api/guide/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '127.0.0.1'
         
        },
        body: JSON.stringify({ nom, prenom, numeroTelephone }),
      });
      if (response.ok) {
        console.log('Guide créé avec succès');
        window.location.href = 'admin';
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


  window.onload = async function() {
    const loggedIn = localStorage.getItem('loggedIn');
    const user = await getCurrentUser();
 if (loggedIn === 'false') {
      window.location.href = 'login'; // Rediriger vers la page profil
    }
  }