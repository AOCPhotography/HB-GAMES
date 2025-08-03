const spinScreen = document.getElementById('spin-screen');
const spinButton = document.getElementById('spin-button');
const menuIcon = document.getElementById('menu-icon');
const gameMenu = document.getElementById('game-menu');
const modeButtons = document.querySelectorAll('.mode-button');

const spinAnimationScreen = document.getElementById('spin-animation-screen');
const spinAnimationText = document.getElementById('spin-animation-text');

const categoryScreen = document.getElementById('category-screen');
const categoryTitle = document.getElementById('category-title');

const gameScreen = document.getElementById('game-screen');
const gameTitle = document.getElementById('game-title');

const priceScreen = document.getElementById('price-screen');
const priceText = document.getElementById('price-text');

let currentGame = 1;
let usedGames = {};

const categories = {
  1: [
    {
      name: "THE PRICE IS HUH?",
      games: [
        { name: "Canned Unicorn Meat", image: "assets/game_images/canned_unicorn_meat.jpg", price: "$29.99" },
        { name: "McNugget Shaped Like an Among Us Crewmate", image: "assets/game_images/mcnugget_among_us.jpg", price: "$99,997" },
        { name: "Rob Ford's Tie", image: "assets/game_images/rob_ford_tie.jpg", price: "$16,100" },
        { name: "Pharrell's Hat", image: "assets/game_images/pharell_hat.jpg", price: "$44,100" },
        { name: "Human Fat Replica", image: "assets/game_images/human_fat_replica.jpg", price: "$83.95" },
        { name: "Coyote Urine", image: "assets/game_images/coyote_urine.jpg", price: "$13.96" },
        { name: "Placenta Recipes Cookbook", image: "assets/game_images/placenta_recipes.jpg", price: "$2.99" },
        { name: "Boyfriend Pillow", image: "assets/game_images/boyfriend_pillow.jpg", price: "$41.14" },
        { name: "Underpants for Your Hands", image: "assets/game_images/handerpants.jpg", price: "$14.69" },
        { name: "Full-body Dog Dryer", image: "assets/game_images/full_body_dog_dryer.jpg", price: "$39.95" },
        { name: "Chicken Harness With Leash", image: "assets/game_images/chicken_harness_with_leash.jpg", price: "$14.99" },
        { name: "Chip-dust Finger Covers", image: "assets/game_images/chip_dust_finger_covers.jpg", price: "$19.99" },
        { name: "Crafting With Cat Hair Book", image: "assets/game_images/crafting_with_cat_hair_book.jpg", price: "$9.99" },
        { name: "A Haunted Doll", image: "assets/game_images/a_haunted_doll.jpg", price: "$1,000" },
        { name: "Virgin Mary Grilled Cheese Sandwich", image: "assets/game_images/a_virgin_mary_grilled_cheese.jpg", price: "$28,000" },
        { name: "A Ghost in a Jar", image: "assets/game_images/ghost_in_a_jar.jpg", price: "$50,000" }
      ]
    }
    // TODO: Add more categories for Game 1
  ],
  2: [
    // TODO: Add Game 2 categories here
  ],
  3: [
    // TODO: Add Game 3 categories here
  ]
};

// Menu toggle
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
  });
});

// Spin button click with animation
spinButton.addEventListener('click', () => {
  spinScreen.classList.add('hidden');
  spinAnimationScreen.classList.remove('hidden');

  const gameSet = categories[currentGame];
  const categoryNames = gameSet.map(c => c.name);

  let delay = 50;
  let chosenCategory;

  function spinLoop() {
    const randomCategory = categoryNames[Math.floor(Math.random() * categoryNames.length)];
    spinAnimationText.textContent = randomCategory;

    delay += 15;
    if (delay < 400) {
      setTimeout(spinLoop, delay);
    } else {
      chosenCategory = gameSet.find(c => c.name === randomCategory);
      showCategoryScreen(chosenCategory);
    }
  }
  spinLoop();
});

function showCategoryScreen(category) {
  spinAnimationScreen.classList.add('hidden');
  categoryScreen.style.backgroundImage = "url('assets/backgrounds/your_spin_bg2.png')";
  categoryTitle.textContent = category.name;
  categoryScreen.classList.remove('hidden');

  if (!usedGames[category.name]) usedGames[category.name] = [];
  const availableGames = category.games.filter(g => !usedGames[category.name].includes(g.name));

  if (availableGames.length === 0) {
    usedGames[category.name] = [];
    availableGames.push(...category.games);
  }

  const chosenGame = availableGames[Math.floor(Math.random() * availableGames.length)];
  usedGames[category.name].push(chosenGame.name);

  categoryScreen.onclick = () => {
    categoryScreen.classList.add('hidden');
    gameScreen.style.backgroundImage = `url('${chosenGame.image}')`;
    gameTitle.textContent = chosenGame.name;
    gameScreen.classList.remove('hidden');

    if (category.name === "THE PRICE IS HUH?") {
      gameScreen.onclick = () => {
        gameScreen.classList.add('hidden');
        priceScreen.style.backgroundImage = `url('${chosenGame.image}')`;
        priceText.textContent = chosenGame.price;
        priceScreen.classList.remove('hidden');

        priceScreen.onclick = () => {
          priceScreen.classList.add('hidden');
          spinScreen.classList.remove('hidden');
        };
      };
    } else {
      gameScreen.onclick = () => {
        gameScreen.classList.add('hidden');
        spinScreen.classList.remove('hidden');
      };
    }
  };
}
