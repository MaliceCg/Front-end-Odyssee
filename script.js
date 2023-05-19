const secretKey = 'SECRET';



document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const pseudo = document.getElementById('pseudo').value;
    const email = document.getElementById('email').value;
    const oldpassword = document.getElementById('password').value;
    const password = encryptData(oldpassword, secretKey);
    

   /* var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(oldpassword, salt);
    console.log(password);*/
    
 
    try {
      const response = await fetch('https://ody-api.onrender.com/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '127.0.0.1'
         
        },
        body: JSON.stringify({ pseudo, email, password }),
      });
      if (response.ok) {
        // Rediriger vers la page de connexion si l'enregistrement est réussi
        window.location.href = 'login.html';
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
  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const email = document.getElementById('email').value;

      const oldpassword = document.getElementById('password').value;
      const password = encryptData(oldpassword, secretKey);
      /*var salt = bcrypt.genSaltSync(10);
      var password = bcrypt.hashSync(oldpassword, salt);
  
      console.log(email);
      console.log(password);*/
  
      try {
        const response = await fetch('https://ody-api.onrender.com/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '127.0.0.1'
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const accessToken = data.accessToken;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('loggedIn', 'true');
          const user = await getCurrentUser();
          console.log(accessToken);
  
          if (user === '6467a3d6adbf2d004b01bf37') {
            window.location.href = 'admin.html';
          } else {
            window.location.href = 'profile.html';
          }
        } 
      } catch (err) {
       
        console.error(err);
        alert('Identifiants incorrects');
      }
    });
  });




window.onload = async function() {
  const loggedIn = localStorage.getItem('loggedIn');
  const user = await getCurrentUser();
  if (loggedIn === 'true'&& user=='64612c2d80639f2d582e6b49') {
    window.location.href = 'admin.html'; // Rediriger vers la page profil
  }
  else if (loggedIn === 'true') {
    window.location.href = 'profile.html'; // Rediriger vers la page profil
  }
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

function encryptData(data, secretKey) {
    const encryptedData = [];
  
    for (let i = 0; i < data.length; i++) {
      const char = data[i];
  
      // Appliquer la substitution uniquement aux caractères alphabétiques
      if (/[a-zA-Z]/.test(char)) {
        const charCode = char.charCodeAt(0);
        const baseCharCode = char.toUpperCase() === char ? 65 : 97; // Caractère de base ('A' ou 'a')
        const keyChar = secretKey[(i % secretKey.length)].toUpperCase();
        const keyCharCode = keyChar.charCodeAt(0);
        const shiftedCharCode = ((charCode - baseCharCode + keyCharCode - 65) % 26) + baseCharCode;
        const encryptedChar = String.fromCharCode(shiftedCharCode);
  
        encryptedData.push(encryptedChar);
      } else {
        encryptedData.push(char);
      }
    }
  
    return encryptedData.join('');
  }