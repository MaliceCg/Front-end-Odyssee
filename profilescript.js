
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
    titleElement.innerText = guide.nom;
    guideElement.appendChild(nomElement);
  
    const prenomElement = document.createElement('p');
    prenomElement.innerText = guide.prenom;
    guideElement.appendChild(prenomElement);

    const telElement = document.createElement('p');
    telElement.innerText = guide.numeroTelephone;
    guideElement.appendChild(telElement);

    
  
    return guideElement;
  }





const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', async function() {
  const token = localStorage.getItem('accessToken');
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

async function fetchUserData() {
    try {
      const idme = await getCurrentUser();
      console.log(idme);
  
      const response = await fetch(`https://ody-api.onrender.com/api/fav/${idme}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log(response);
      const data = await response.json();
      console.log(data);
  
      const experiencesContainer = document.querySelector(".favoris");
  
      data.experiences.forEach(experience => {
        const experienceElement = createExperienceElement(experience);
        experiencesContainer.appendChild(experienceElement);
      });
  
    } catch (error) {
      console.log(error);
    }
  }
  
  function createExperienceElement(experience) {
    const experienceElement = document.createElement('article');
    experienceElement.classList.add('experience');
  
    const titleElement = document.createElement('h2');
    titleElement.innerText = experience.nomexp;
    experienceElement.appendChild(titleElement);
  
    const priceElement = document.createElement('p');
    priceElement.innerText = `Prix : ${experience.prix}`;
    experienceElement.appendChild(priceElement);
  
    const durationElement = document.createElement('p');
    durationElement.innerText = `Durée : ${experience.duree}`;
    experienceElement.appendChild(durationElement);
  
    const departElement = document.createElement('p');
    departElement.innerText = `Départ : ${experience.depart}`;
    experienceElement.appendChild(departElement);
  
    const paysElement = document.createElement('p');
    paysElement.innerText = `Pays : ${experience.pays}`;
    experienceElement.appendChild(paysElement);
  
    const activitiesElement = document.createElement('p');
    activitiesElement.innerText = `Activités : ${experience.activites}`;
    experienceElement.appendChild(activitiesElement);
  
    const nbPersElement = document.createElement('p');
    nbPersElement.innerText = `Nombre de personnes : ${experience.nbpers}`;
    experienceElement.appendChild(nbPersElement);

    const suppFavsBtn = document.createElement('button');
    suppFavsBtn.innerText = 'Supprimer des favoris';
    suppFavsBtn.addEventListener('click', async () => {
        const userId = await getCurrentUser();
        const experienceId = experience._id;
        console.log(experience._id,userId);

        
        try {
            const response = await fetch('https://ody-api.onrender.com/api/fav/', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ userId, experienceId })
            });
        
            if (response.status === 200) {
              console.log('Expérience supprimée des favoris avec succès');
              window.location.reload();
              // Mettez ici le code pour mettre à jour l'affichage ou effectuer d'autres actions après la suppression
            } else {
              console.log('Erreur lors de la suppression de l\'expérience des favoris');
              // Mettez ici le code pour gérer l'erreur en cas d'échec de la suppression
            }
          } catch (error) {
            console.log(error);
            console.log('Erreur lors de la requête de suppression');
            // Mettez ici le code pour gérer l'erreur en cas d'échec de la requête
          }
      
        

        
        
        
    });
    experienceElement.appendChild(suppFavsBtn);
  
    return experienceElement;
  }
  
  fetchUserData();


  async function getCurrentUser() {
    const token = localStorage.getItem('accessToken');
    console.log(token);
      try {
        const response = await fetch("https://ody-api.onrender.com/api/user/idme", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('rep',response);
        const data = await response.json();
        console.log('data',data);
        if (response.status === 401) {
          // L'utilisateur n'est pas connecté
          return null;
        } else {
          // L'utilisateur est connecté
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    };


