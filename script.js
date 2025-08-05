// ===== DOM Elements =====
const spinScreen = document.getElementById('spin-screen');
const spinButton = document.getElementById('spin-button');
const menuIcon = document.getElementById('menu-icon');
const gameMenu = document.getElementById('game-menu');
const modeButtons = document.querySelectorAll('.mode-button');
const gameScreen = document.getElementById('game-screen');
const gameTitle = document.getElementById('game-title');
const priceScreen = document.getElementById('price-screen');
const priceText = document.getElementById('price-text');

let currentGame = 1;
let usedGames = {};
let nextCategory = null;

// ===== GAME DATA =====
// (Keeping your full category/game list from before, shortened here for clarity in message)
const categories = {
  1: [
    {
      name: "RULES",
      games: [
        { name: "National Geographic", description: "Everything is a David Attenborough inspired moment" },
        { name: "Sex Ex", description: "Everyone is an ex who was awful in bed and you can't stop reminding them" },
        { name: "No Swearing", description: "Speak without swearing — slip up and lose points" },
        { name: "The Rule Maker", description: "Invent one PG13 rule everyone must follow until your next turn" },
        { name: "Hillbilly Bob", description: "Speak with a hillbilly accent" },
        // ... (rest of your rules category here)
      ]
    },
    { name: "SELL THAT PRODUCT", games: [{ name: "Pitch a random product" }] },
    { name: "FAKE TED TALK", games: [{ name: "Why Cereal Should Be Classified as Soup" }] }
  ],
  2: [
    {
      name: "THE PRICE IS HUH?",
      games: [
        { name: "Canned Unicorn Meat", image: "assets/game_images/canned_unicorn_meat.jpg", price: "$29.99" },
        // ... (rest of your price is huh items here)
      ]
    },
    { name: "AND SCENE", games: [{ name: "Being Runner-up of the 2009 Air Guitar Championships" }] }
  ],
  3: [
    { name: "AWKWARD STORIES", games: [{ name: "True or False Story" }] },
    { name: "CHALLENGE", games: [{ name: "Rock, Paper, Scissors" }] }
  ]
};

// ===== CATEGORY SELECTION =====
function chooseNextCategory() {
  let gameSet = categories[currentGame];
  nextCategory = gameSet[Math.floor(Math.random() * gameSet.length)];
}

function getRandomGame(category) {
  if (!usedGames[category.name]) usedGames[category.name] = [];
  let availableGames = category.games.filter(g => !usedGames[category.name].includes(g.name));
  if (availableGames.length === 0) {
    usedGames[category.name] = [];
    availableGames = category.games;
  }
  const chosenGame = availableGames[Math.floor(Math.random() * availableGames.length)];
  usedGames[category.name].push(chosenGame.name);
  return chosenGame;
}

// ===== SPIN =====
function startSpin() {
  if (!nextCategory) chooseNextCategory();
  const chosenCategory = nextCategory;

  spinButton.onclick = null;
  spinButton.classList.remove('spin-anim', 'fade-out-text', 'fade-in-text');
  void spinButton.offsetWidth;

  spinButton.textContent = "SPIN";
  spinButton.classList.add('spin-anim');

  setTimeout(() => {
    spinButton.classList.add('fade-out-text');
  }, 1200);

  setTimeout(() => {
    spinButton.textContent = chosenCategory.name;
    spinButton.classList.remove('fade-out-text');
    spinButton.classList.add('fade-in-text');

    // ✅ Enable click immediately after category appears
    spinButton.onclick = () => {
      spinButton.classList.add("dissolve-out");
      setTimeout(() => {
        spinButton.classList.remove("dissolve-out");
        showGame(chosenCategory);
      }, 1200); // match dissolve to spin excitement
    };
  }, 2400);
}

// ===== SHOW GAME =====
function showGame(category) {
  spinScreen.classList.add('hidden');
  const chosenGame = getRandomGame(category);

  const formattedTitle = chosenGame.description
    ? `<div>${chosenGame.name}</div><div class="game-description">${chosenGame.description}</div>`
    : chosenGame.name;

  if (currentGame === 2 && category.name === "THE PRICE IS HUH?") {
    gameScreen.style.backgroundImage = `url('${chosenGame.image}')`;
    gameTitle.className = "game-box";
    gameTitle.innerHTML = formattedTitle;
    gameScreen.classList.remove('hidden');

    gameScreen.onclick = () => {
      gameTitle.classList.add("dissolve-out");
      setTimeout(() => {
        gameScreen.classList.add('hidden');
        gameTitle.classList.remove("dissolve-out");
        priceScreen.style.backgroundImage = `url('${chosenGame.image}')`;
        priceText.className = "game-box";
        priceText.textContent = chosenGame.price;
        priceScreen.classList.remove('hidden');

        priceScreen.onclick = () => {
          priceText.classList.add("dissolve-out");
          setTimeout(() => {
            priceScreen.classList.add('hidden');
            priceText.classList.remove("dissolve-out");

            // ✅ Load next category after dissolve finishes
            spinScreen.classList.remove('hidden');
            spinButton.classList.add("dissolve-in");
            setTimeout(() => {
              spinButton.classList.remove("dissolve-in");
              resetSpinButton();
            }, 1200);
          }, 1200);
        };
      }, 1200);
    };
  } else {
    gameScreen.style.backgroundImage = "url('assets/backgrounds/your_spin_bg.png')";
    gameTitle.className = "game-box";
    gameTitle.innerHTML = formattedTitle;
    gameScreen.classList.remove('hidden');

    gameScreen.onclick = () => {
      gameTitle.classList.add("dissolve-out");
      setTimeout(() => {
        gameScreen.classList.add('hidden');
        gameTitle.classList.remove("dissolve-out");

        // ✅ Load next category after dissolve finishes
        spinScreen.classList.remove('hidden');
        spinButton.classList.add("dissolve-in");
        setTimeout(() => {
          spinButton.classList.remove("dissolve-in");
          resetSpinButton();
        }, 1200);
      }, 1200);
    };
  }
}

// ===== RESET SPIN =====
function resetSpinButton() {
  chooseNextCategory();
  spinButton.textContent = "SPIN";
  spinButton.classList.remove('spin-anim', 'fade-in-text', 'fade-out-text');
  spinButton.onclick = startSpin;
}

// ===== MENU =====
menuIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  gameMenu.classList.toggle('hidden');
});
document.addEventListener('click', (e) => {
  if (!gameMenu.contains(e.target) && !menuIcon.contains(e.target)) {
    gameMenu.classList.add('hidden');
  }
});
modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentGame = parseInt(btn.dataset.game);
    gameMenu.classList.add('hidden');
    usedGames = {};
    resetSpinButton();
  });
});

// ===== SPACEBAR SUPPORT =====
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    if (!spinScreen.classList.contains('hidden')) {
      spinButton.click();
    } else if (!gameScreen.classList.contains('hidden')) {
      gameScreen.click();
    } else if (!priceScreen.classList.contains('hidden')) {
      priceScreen.click();
    }
  }
});

// ===== INIT =====
resetSpinButton();
