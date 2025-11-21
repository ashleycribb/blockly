'use strict';


const userInfo = document.getElementById('user_info');
const projectsDiv = document.getElementById('projects');
const templatesDiv = document.getElementById('templates');
const logoutButton = document.getElementById('logoutButton');

auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    userInfo.textContent = user.email;

    // Load projects
    db.collection('projects').where('owner', '==', user.uid).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const project = doc.data();
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h3>${project.name}</h3>`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (e) => {
          e.stopPropagation();
          if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
            db.collection('projects').doc(doc.id).delete().then(() => {
              card.remove();
            });
          }
        });
        card.appendChild(deleteButton);
        card.addEventListener('click', () => {
          window.location.href = `index.html?project=${doc.id}`;
        });
        projectsDiv.appendChild(card);
      });
    });

    // Load templates
    db.collection('templates').where('owner', '==', user.uid).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const template = doc.data();
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${template.name}</h3>
          <p>${template.description}</p>
        `;
        templatesDiv.appendChild(card);
      });
    });
  } else {
    // No user is signed in.
    window.location.href = 'login.html';
  }
});

logoutButton.addEventListener('click', () => {
  auth.signOut();
});
