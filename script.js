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
const categories = {
  1: [
    {
      name: "RULES",
      games: [
        { name: "National Geographic", description: "Everything is a David Attenborough inspired moment" },
        { name: "Sex Ex", description: "Everyone is an ex who was awful in bed and you can't stop reminding them" },
        { name: "No Swearing", description: "Speak without swearing — slip up and lose points" },
        { name: "Everything Has to Be Sung", description: "Every sentence must be sung" },
        { name: "Questions Only", description: "You can only speak in questions" },
        { name: "Alien Abduction", description: "End every sentence with a failed alien abduction attempt" },
        { name: "Job Interview", description: "Sell yourself and undermine others" },
        { name: "Inner Monologue Mode", description: "Narrate your thoughts with peak sarcasm" },
        { name: "Royalty", description: "Speak as if addressing your peasants" },
        { name: "Washed-up Magician", description: "Every action must include a failed magic trick" },
        { name: "Yes, But", description: "Agree but turn it into a conspiracy theory" },
        { name: "Lie Detector", description: "Accuse everyone of lying" },
        { name: "Orchestra", description: "Only provide background music and sound effects" },
        { name: "Local News Anchors", description: "Deliver everything like breaking news" },
        { name: "Crazy Person on the TTC", description: "Act like an eccentric transit passenger" },
        { name: "Red Flag Dating", description: "Everything you say is a first-date red flag" },
        { name: "Mime Time", description: "Include mimed actions in every sentence" },
        { name: "Ghost Mode", description: "You're invisible unless you break a rule" },
        { name: "Uno Reverse", description: "Choose 1 rule and give it to the host" },
        { name: "The Rule Maker", description: "Invent a PG13 rule for everyone" },
        { name: "Hillbilly Bob", description: "Speak with a hillbilly accent" },
        { name: "The Thief", description: "Steal a point and swap a rule" },
        { name: "The Time Traveler", description: "Speak as if from a different era" },
        { name: "The Switcheroo", description: "Swap scores between two players" },
        { name: "Double Points", description: "Your points are doubled this round" }
      ]
    },
    {
      name: "SELL THAT PRODUCT",
      games: [
        { name: "MYSTERY BOX 1" },
        { name: "MYSTERY BOX 2" },
        { name: "MYSTERY BOX 3" },
        { name: "MYSTERY BOX 4" },
        { name: "MYSTERY BOX 5" },
        { name: "MYSTERY BOX 6" }
      ]
    },
    {
      name: "FAKE TED TALK",
      games: [
        { name: "Why Cereal Should Be Classified as Soup" },
        { name: "The Economic Impact of Masturbating into a Sock vs. Kleenex" },
        { name: "How to Gain Respect as a Professional Beatboxer" },
        { name: "Why I Sold Everything and Moved into a Discarded McDonald's PlayPlace" },
        { name: "The Psychological Toll of Being Too Good at Karaoke" },
        { name: "How to Become a Millionaire by Collecting Pogs in 2025" },
        { name: "How to Maintain a Long-Distance Relationship With Your Clones" },
        { name: "Why Bananas Are Nature’s Most Passive-Aggressive Fruit" },
        { name: "Harnessing the Power of Awkward Silences in Corporate Strategy" },
        { name: "How to Win a Breakup by Posting Photos of Your Breakfast" },
        { name: "What My Reusable Water Bottle Says About My Love Life" }
      ]
    }
  ],
  2: [
    {
      name: "THE PRICE IS HUH?",
      games: [
        { name: "Canned Unicorn Meat", image: "assets/game_images/canned_unicorn_meat.jpg", price: "$29.99" },
        { name: "McNugget Shaped Like Among Us Crewmate", image: "assets/game_images/mcnugget_amongus.jpg", price: "$99,997" },
        { name: "Rob Ford's Tie", image: "assets/game_images/rob_ford_tie.jpg", price: "$16,100" },
        { name: "Pharrell's Brown Fedora", image: "assets/game_images/pharrell_hat.jpg", price: "$44,100" },
        { name: "Human Body Fat Replica", image: "assets/game_images/body_fat.jpg", price: "$83.95" },
        { name: "Coyote Urine", image: "assets/game_images/coyote_urine.jpg", price: "$13.96" },
        { name: "Placenta Recipes Cookbook", image: "assets/game_images/placenta_cookbook.jpg", price: "$2.99" },
        { name: "Boyfriend Pillow", image: "assets/game_images/boyfriend_pillow.jpg", price: "$41.14" },
        { name: "Underpants for Your Hands", image: "assets/game_images/hand_underwear.jpg", price: "$14.69" },
        { name: "Full-body Dog Dryer", image: "assets/game_images/dog_dryer.jpg", price: "$39.95" },
        { name: "Chicken Harness with Leash", image: "assets/game_images/chicken_harness.jpg", price: "$14.99" },
        { name: "Chip-dust Finger Covers", image: "assets/game_images/chip_dust_finger_covers.jpg", price: "$19.99" },
        { name: "Crafting With Cat Hair", image: "assets/game_images/cat_hair_book.jpg", price: "$9.99" },
        { name: "Haunted Doll", image: "assets/game_images/haunted_doll.jpg", price: "$1,000" },
        { name: "Virgin Mary Grilled Cheese", image: "assets/game_images/virgin_mary_sandwich.jpg", price: "$28,000" },
        { name: "Ghost in a Jar", image: "assets/game_images/ghost_jar.jpg", price: "$50,000" }
      ]
    }
  ],
  3: [
    {
      name: "AWKWARD STORIES",
      games: [{ name: "True or False Story" }]
    },
    {
      name: "CHALLENGE",
      games: [{ name: "Rock, Paper, Scissors" }]
    }
  ]
};

// ===== CATEGORY FUNCTIONS =====
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

    spinButton.onclick = () => {
      spinButton.classList.add("dissolve-out");
      setTimeout(() => {
        spinButton.classList.remove("dissolve-out");
        showGame(chosenCategory);
      }, 1200);
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
      priceReveal(chosenGame);
    };
  } else {
    gameScreen.style.backgroundImage = "url('assets/backgrounds/your_spin_bg.png')";
    gameTitle.className = "game-box";
    gameTitle.innerHTML = formattedTitle;
    gameScreen.classList.remove('hidden');

    gameScreen.onclick = () => {
      returnToSpin();
    };
  }
}

// ===== PRICE REVEAL =====
function priceReveal(chosenGame) {
  gameTitle.classList.add("dissolve-out");
  setTimeout(() => {
    gameScreen.classList.add('hidden');
    gameTitle.classList.remove("dissolve-out");
    priceScreen.style.backgroundImage = `url('${chosenGame.image}')`;
    priceText.className = "game-box";
    priceText.textContent = chosenGame.price;
    priceScreen.classList.remove('hidden');

    priceScreen.onclick = () => {
      returnToSpin();
    };
  }, 1200);
}

// ===== RETURN TO SPIN =====
function returnToSpin() {
  const activeScreen = !gameScreen.classList.contains('hidden') ? gameScreen : priceScreen;
  const activeText = activeScreen.querySelector('.game-box');

  // Always reset to SPIN immediately so no category can appear
  spinButton.textContent = "SPIN";

  // Start dissolving out the current game box
  activeText.classList.add("dissolve-out");

  setTimeout(() => {
    // Hide game/price screen
    activeScreen.classList.add('hidden');
    activeText.classList.remove("dissolve-out");

    // Show spin page
    spinScreen.classList.remove('hidden');
    spinButton.classList.add("dissolve-in");

    // Wait for dissolve to fully complete before preparing spin
    setTimeout(() => {
      spinButton.classList.remove("dissolve-in");

      // ✅ Don't call chooseNextCategory() yet — wait until they actually click
      // This prevents the flash caused by animation reset
      spinButton.onclick = startSpin;

    }, 1200); // match dissolve-in duration
  }, 1200); // match dissolve-out duration
}

// ===== RESET SPIN BUTTON =====
function resetSpinButton() {
  chooseNextCategory();
  spinButton.textContent = "SPIN";
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
