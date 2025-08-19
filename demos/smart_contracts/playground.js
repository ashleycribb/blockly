'use strict';

// TODO: Add your own Firebase credentials here.
// You can get them from the Firebase console.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const gallery = document.getElementById('gallery');

db.collection('templates').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const template = doc.data();
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${template.name}</h3>
      <p>${template.description}</p>
    `;
    card.addEventListener('click', () => {
      const xml = encodeURIComponent(template.xml);
      window.location.href = `index.html?template=${xml}`;
    });
    gallery.appendChild(card);
  });
});
