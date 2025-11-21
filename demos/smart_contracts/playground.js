'use strict';


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
