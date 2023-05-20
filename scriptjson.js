fetch('https://ody-api.onrender.com/api/exp/all')
  .then(response => response.json())
  .then(data => {
    const experiencesContainer = document.querySelector(".experiences");

    data.forEach(experience => {
        const experienceElement = createExperienceElement(experience);
        experiencesContainer.appendChild(experienceElement);
    });

    //buttons

    const aventurierBtn = document.getElementById('aventurier-btn');
    aventurierBtn.addEventListener('click', () => {
        
        document.body.style.backgroundImage = "url('img/aventurier.jpg')";
      // Code pour filtrer les expériences aventurier et les afficher
      const aventurierExperiences = data.filter(experience => experience.nomexp.toLowerCase() === 'aventurier');
      
      experiencesContainer.innerHTML = '';

        aventurierExperiences.forEach(experience => {
            const experienceElement = createExperienceElement(experience);
            experiencesContainer.appendChild(experienceElement);
         });

    }); 
    const luxueuxBtn = document.getElementById('luxueux-btn');
    luxueuxBtn.addEventListener('click', () => {
        var bg = document.getElementById("bg"); 
        document.body.style.backgroundImage = "url('img/luxueux.jpg')";
      // Code pour filtrer les expériences aventurier et les afficher
      const luxueuxExperiences = data.filter(experience => experience.nomexp.toLowerCase() === 'luxueux');
      
      experiencesContainer.innerHTML = '';

        luxueuxExperiences.forEach(experience => {
            const experienceElement = createExperienceElement(experience);
            experiencesContainer.appendChild(experienceElement);
         });

    });
    const famBtn = document.getElementById('fam-btn');
        famBtn.addEventListener('click', () => {
        var bg = document.getElementById("bg"); 
        document.body.style.backgroundImage = "url('img/familial.jpg')";
      // Code pour filtrer les expériences aventurier et les afficher
      const famExperiences = data.filter(experience => experience.nomexp.toLowerCase() === 'familial');
      
      experiencesContainer.innerHTML = '';

        famExperiences.forEach(experience => {
            const experienceElement = createExperienceElement(experience);
            experiencesContainer.appendChild(experienceElement);
         });

    });
    const cultBtn = document.getElementById('cult-btn');
    cultBtn.addEventListener('click', () => {
        var bg = document.getElementById("bg"); 
        document.body.style.backgroundImage = "url('img/culturel.jpg')";
      // Code pour filtrer les expériences aventurier et les afficher
      const cultExperiences = data.filter(experience => experience.nomexp.toLowerCase() === 'culturel');
      
      experiencesContainer.innerHTML = '';

        cultExperiences.forEach(experience => {
            const experienceElement = createExperienceElement(experience);
            experiencesContainer.appendChild(experienceElement);
         });

    });
    const beBtn = document.getElementById('be-btn');
    beBtn.addEventListener('click', () => {
        var bg = document.getElementById("bg"); 
        document.body.style.backgroundImage = "url('img/BienEtre.jpg')";
      // Code pour filtrer les expériences aventurier et les afficher
      const beExperiences = data.filter(experience => experience.nomexp.toLowerCase() === 'bien-être');
      
      experiencesContainer.innerHTML = '';

        beExperiences.forEach(experience => {
            const experienceElement = createExperienceElement(experience);
            experiencesContainer.appendChild(experienceElement);
         });

    });
    const ecoBtn = document.getElementById('eco-btn');
    ecoBtn.addEventListener('click', () => {
        var bg = document.getElementById("bg"); 
        document.body.style.backgroundImage = "url('img/Eco.jpg')";
      // Code pour filtrer les expériences aventurier et les afficher
      const ecoExperiences = data.filter(experience => experience.nomexp.toLowerCase() === 'eco-responsable');
      
      experiencesContainer.innerHTML = '';

        ecoExperiences.forEach(experience => {
            const experienceElement = createExperienceElement(experience);
            experiencesContainer.appendChild(experienceElement);
         });

    });
   

  });





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

    const addToFavsBtn = document.createElement('button');
    addToFavsBtn.innerText = 'Ajouter aux favoris';
    addToFavsBtn.addEventListener('click', async () => {
        const currentUser = await getCurrentUser();
        
        if (currentUser) {
           const newFavorite = {
                userId:currentUser,
                experienceId:experience._id
            };
            console.log(experience._id);
            console.log(newFavorite);
            saveFavorite(newFavorite);
           heartButton.classList.toggle('clicked');
           
        } else {
            alert('Vous devez être connecté pour ajouter une expérience aux favoris');
        }
    });
    experienceElement.appendChild(addToFavsBtn);
  
    return experienceElement;
  }
  




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
  

    async function saveFavorite(newFavorite) {
      console.log('new',newFavorite);
    try {
      const response = await fetch("https://ody-api.onrender.com/api/fav/favoris", {
        method: "POST",
        body: JSON.stringify(newFavorite),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      const data = await response.json();
  
      if (data.error) {
        console.log(data.error);
      } else {
        alert('Expérience ajoutée aux favoris');
        console.log(`Expérience ajoutée aux favoris`);
      }
    } catch (error) {
      console.log(error);
    }
}
