// Create variables targetting the relevant DOM elements here 👇
var homeButton = document.getElementById('homeBtn');
var randomCoverButton = document.getElementById('randomBtn');
var saveCoverButton = document.getElementById('saveBtn');
var viewSavedButton = document.getElementById('viewBtn');
var makeNewButton = document.getElementById('newBtn');
var coverImage = document.getElementById('coverImg');
var coverTitle = document.getElementById('coverTitle');
var taglineOne = document.getElementById('tagOne');
var taglineTwo = document.getElementById('tagTwo');
var homeView = document.getElementById('homeView');
var savedView = document.getElementById('savedView');
var formView = document.getElementById('formView');
var savedCoversSection = document.getElementById('savedCovers');
var userForm = document.getElementById('form');
var userCover = document.getElementById('cover');
var userTitle = document.getElementById('title');
var userTaglineOne = document.getElementById('descOne');
var userTaglineTwo = document.getElementById('descTwo');
var userSubmitButton = document.getElementById('createBtn');

// We've provided a few variables below
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;

// Create your event handlers and other functions here 👇
const newRandomCover = () => {
  currentCover = new Cover(covers[getRandomIndex(covers)], titles[getRandomIndex(titles)], descriptors[getRandomIndex(descriptors)], descriptors[getRandomIndex(descriptors)]);
  displayCover(currentCover);
}

const newUserCover = (event) => {
  event.preventDefault();
  if (!userCover.value || !userTitle.value || !userTaglineOne.value || !userTaglineTwo.value) {
    alert("Please fill out all of the input fields, otherwise we can't show you a steamy novel!");
  } else {
    currentCover = new Cover(userCover.value, userTitle.value, userTaglineOne.value, userTaglineTwo.value);
    displayCover(currentCover);
    storeUserSubmission();
    toggleHomeView();
    userForm.reset();
  }
}

const displayCover = () => {
  coverImage.src = currentCover.cover;
  coverTitle.innerText = currentCover.title;
  taglineOne.innerText = currentCover.tagline1;
  taglineTwo.innerText = currentCover.tagline2;
}

const toggleFormView = () => {
  removeClass([formView, homeButton]);
  addClass([homeView, savedView, saveCoverButton, randomCoverButton]);
}

const toggleSavedView = () => {
  removeClass([savedView, homeButton]);
  addClass([homeView, formView, randomCoverButton, saveCoverButton]);
  displaySavedCovers();
}

const toggleHomeView = () => {
  removeClass([homeView, randomCoverButton, saveCoverButton]);
  addClass([formView, savedView, homeButton]);
}

const storeUserSubmission = () => {
  covers.push(userCover.value);
  titles.push(userTitle.value);
  descriptors.push(userTaglineOne.value);
  descriptors.push(userTaglineTwo.value);
}

const saveCurrentCover = () => {
  if (!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
  }
}

const displaySavedCovers = () => {
  savedCoversSection.innerHTML = ``;
  for (var i = 0; i < savedCovers.length; i++) {
    savedCoversSection.innerHTML += `
      <section class="mini-cover">
        <img class="cover-image" id="${savedCovers[i].id}" src="${savedCovers[i].cover}">
        <h2 class="cover-title">${savedCovers[i].title}</h2>
        <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h2>
      </section>`
  }
}

const deleteSavedCover = (event) => {
  savedCovers.forEach(item => {
    if (event.target.id === `${item.id}`) {
      savedCovers.splice(savedCovers.indexOf(item), 1);
    }
  });
  displaySavedCovers();
}

const removeClass = (elements) => {
  elements.forEach(item => {
    item.classList.remove('hidden');
  });
}

const addClass = (elements) => {
  elements.forEach(item => {
    item.classList.add('hidden');
  });
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}


// Add your event listeners here 👇
window.addEventListener('load', () => { 
  newRandomCover() 
});
randomCoverButton.addEventListener('click', () => { 
  newRandomCover() 
});
makeNewButton.addEventListener('click', () => { 
  toggleFormView() 
});
viewSavedButton.addEventListener('click', () => { 
  toggleSavedView() 
});
homeButton.addEventListener('click', () => { 
  toggleHomeView() 
});
userSubmitButton.addEventListener('click', () => { 
  newUserCover() 
});
saveCoverButton.addEventListener('click', () => { 
  saveCurrentCover() 
});
savedCoversSection.addEventListener('dblclick', (event) => { 
  deleteSavedCover(event) 
});