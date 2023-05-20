fetch('https://ody-api.onrender.com/api/dest/prixMoinsCherEurope')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const result = data;
    console.log(result);
    // Mettre à jour l'élément HTML avec le prix le moins cher
    const prixElement = document.getElementById("apartirdeEurope");
    prixElement.textContent = result.prix + "€";
    const dureeElement = document.getElementById("nbjoursEurope");
    dureeElement.textContent = result.duree ;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  fetch('https://ody-api.onrender.com/api/dest/prixMoinsCherAsie')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const result = data;
    console.log(result);
    // Mettre à jour l'élément HTML avec le prix le moins cher
    const prixElement = document.getElementById("apartirdeAsie");
    prixElement.textContent = result.prix + "€";
    const dureeElement = document.getElementById("nbjoursAsie");
    dureeElement.textContent = result.duree ;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  fetch('https://ody-api.onrender.com/api/dest/prixMoinsCherAmerique')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const result = data;
    console.log(result);
    // Mettre à jour l'élément HTML avec le prix le moins cher
    const prixElement = document.getElementById("apartirdeAmerique");
    prixElement.textContent = result.prix + "€";
    const dureeElement = document.getElementById("nbjoursAmerique");
    dureeElement.textContent = result.duree ;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  fetch('https://ody-api.onrender.com/api/dest/prixMoinsCherOceanie')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const result = data;
    console.log(result);
    // Mettre à jour l'élément HTML avec le prix le moins cher
    const prixElement = document.getElementById("apartirdeOceanie");
    prixElement.textContent = result.prix + "€";
    const dureeElement = document.getElementById("nbjoursOceanie");
    dureeElement.textContent = result.duree ;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  fetch('https://ody-api.onrender.com/api/dest/prixMoinsCherAfrique')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const result = data;
    console.log(result);
    // Mettre à jour l'élément HTML avec le prix le moins cher
    const prixElement = document.getElementById("apartirdeAfrique");
    prixElement.textContent = result.prix + "€";
    const dureeElement = document.getElementById("nbjoursAfrique");
    dureeElement.textContent = result.duree ;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  fetch('https://ody-api.onrender.com/api/dest/all/645696692bace0d40aadd607')
  .then(response => response.json())
  .then(data => {
    const experiencesContainer = document.querySelector(".experiencesAsie");

    data.forEach(experience => {
        const experienceElement = createExperienceElement(experience);
        experiencesContainer.appendChild(experienceElement);
    });


  });
  fetch('https://ody-api.onrender.com/api/dest/all/645696692bace0d40aadd608')
  .then(response => response.json())
  .then(data => {
    const experiencesContainer = document.querySelector(".experiencesAfrique");

    data.forEach(experience => {
        const experienceElement = createExperienceElement(experience);
        experiencesContainer.appendChild(experienceElement);
    });


  });
  fetch('https://ody-api.onrender.com/api/dest/all/645696692bace0d40aadd605')
  .then(response => response.json())
  .then(data => {
    const experiencesContainer = document.querySelector(".experiencesEurope");

    data.forEach(experience => {
        const experienceElement = createExperienceElement(experience);
        experiencesContainer.appendChild(experienceElement);
    });


  });
  fetch('https://ody-api.onrender.com/api/dest/all/645696692bace0d40aadd606')
  .then(response => response.json())
  .then(data => {
    const experiencesContainer = document.querySelector(".experiencesAmerique");

    data.forEach(experience => {
        const experienceElement = createExperienceElement(experience);
        experiencesContainer.appendChild(experienceElement);
    });


  });
  fetch('https://ody-api.onrender.com/api/dest/all/645696692bace0d40aadd609')
  .then(response => response.json())
  .then(data => {
    const experiencesContainer = document.querySelector(".experiencesOceanie");

    data.forEach(experience => {
        const experienceElement = createExperienceElement(experience);
        experiencesContainer.appendChild(experienceElement);
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
        console.log(`Expérience ${newFavorite.experienceId} ajoutée aux favoris`);
      }
    } catch (error) {
      console.log(error);
    }
}
