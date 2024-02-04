const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field"),
  tryAgainBtn = document.querySelector(".content button"),
  timeTag = document.querySelector(".time span b"),
  mistakeTag = document.querySelector(".mistake span"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = mistakes = isTyping = 0,
  selectedDifficulty = "medium";

const difficultyLevelDropdown = document.getElementById("difficultyLevel");
let selectedDifficultyLevel = difficultyLevelDropdown.value;

difficultyLevelDropdown.addEventListener("change", function() {
  selectedDifficultyLevel = this.value;
  loadParagraph();
});

const difficultyLevels = {
    easy: [
      "The sun is shining brightly in the sky, casting a warm glow over the landscape. Birds are chirping cheerfully, and flowers are blooming everywhere. It's a perfect day for a picnic in the park. The grass is soft and green, and the trees provide shade from the sun. Children are laughing and playing, enjoying the beautiful weather. Everyone is happy and content, basking in the joy of nature.",
      "The ocean stretches out endlessly before me, its waves crashing against the shore with a soothing rhythm. Seagulls soar overhead, their cries mingling with the sound of the surf. The sand is warm beneath my feet, and the salty breeze fills my lungs. I close my eyes and breathe in deeply, feeling a sense of peace wash over me. In this moment, all my worries fade away, and I am simply grateful to be alive.",
      "The city bustles with activity as people go about their daily lives. Cars honk their horns, and pedestrians hurry along the sidewalks. Skyscrapers tower overhead, casting long shadows on the crowded streets below. Everywhere you look, there is movement and noise. It's a vibrant and exciting place to be, full of energy and possibility. I love the hustle and bustle of city life, and I wouldn't trade it for anything.",
      "The forest is alive with the sound of birdsong and the rustling of leaves. Sunlight filters through the trees, creating dappled patterns on the forest floor. The air is cool and fresh, filled with the scent of pine and earth. I take a deep breath and feel my worries melt away. In the quiet serenity of the forest, I feel at peace with myself and the world. It's a magical place, and I am grateful to be surrounded by its beauty.",
      "The mountains rise majestically in the distance, their peaks capped with snow. The air is crisp and clean, invigorating my senses. I feel small and insignificant against the vastness of the landscape, yet strangely empowered by its grandeur. As I gaze out at the breathtaking panorama before me, I am filled with a sense of awe and wonder. In this moment, I am reminded of the beauty and majesty of the natural world.",
      "The desert stretches out before me, a vast expanse of sand and sky. The sun beats down relentlessly, casting shimmering waves of heat across the landscape. Despite the harsh conditions, life thrives in this barren environment. Cacti stand tall and proud, their spiny arms reaching towards the sky. Lizards scurry across the sand, their scales glistening in the sunlight. I am humbled by the resilience of life in the desert, and I feel a deep connection to this harsh and beautiful land.",
      "The countryside is peaceful and serene, a welcome respite from the hustle and bustle of city life. Rolling hills stretch out as far as the eye can see, dotted with quaint little villages and picturesque farmhouses. The air is sweet with the scent of wildflowers, and the sound of birdsong fills the air. It's a perfect day for a leisurely stroll through the countryside, soaking in the beauty of nature and the simple pleasures of life.",
      "The beach is a hive of activity, with families and friends enjoying the sun, sand, and surf. Children build sandcastles and splash in the waves, while adults relax on beach towels, soaking up the warm sunshine. Seagulls swoop overhead, searching for scraps of food, and the sound of laughter fills the air. It's a carefree and joyful atmosphere, a perfect escape from the stresses of everyday life.",
      "The river meanders lazily through the countryside, its waters sparkling in the sunlight. Trees line its banks, their branches dipping into the cool water. Fish dart through the shallows, and dragonflies flit about in the air. It's a tranquil and idyllic scene, a peaceful oasis in the midst of the bustling world. I could sit here for hours, watching the river flow by and feeling the stresses of life melt away.",
      "The park is a lush oasis in the heart of the city, a welcome refuge from the concrete jungle. Trees rustle in the breeze, their leaves whispering secrets to the wind. Flowers bloom in riotous colors, attracting bees and butterflies in search of nectar. Paths wind their way through the park, inviting visitors to explore its hidden corners and peaceful glades. It's a perfect day for a leisurely stroll, enjoying the beauty of nature and the simple pleasures of life."
    ],
    medium: [
      "The sun was setting over the horizon, casting a warm orange glow across the sky. The air was cool and crisp, with a gentle breeze blowing through the trees. I sat on the porch, sipping a cup of hot tea and watching the world go by. It was a peaceful moment, a chance to reflect on the day and appreciate the beauty of the world around me.",
      "The city skyline stretched out before me, a glittering maze of lights and buildings. Cars honked their horns, and people hurried along the sidewalks, lost in their own thoughts. I stood on the bridge, taking in the breathtaking view of the city at night. It was a magical sight, a reminder of the energy and excitement of urban life.",
      "The forest was alive with the sounds of nature, from the chirping of crickets to the rustling of leaves in the wind. I walked along the trail, breathing in the fresh scent of pine and earth. The trees towered overhead, their branches reaching towards the sky. It was a peaceful oasis, a sanctuary from the stresses of everyday life.",
      "The mountains loomed in the distance, their jagged peaks etched against the sky. I hiked along the trail, feeling the crunch of gravel beneath my boots. The air was thin and crisp, invigorating my lungs with each breath. I gazed out at the panoramic view of the valley below, awestruck by the beauty of the natural world.",
      "The desert stretched out before me, a vast expanse of sand and sky. The sun beat down relentlessly, casting shimmering waves of heat across the landscape. I trudged through the sand, my feet sinking with each step. It was a harsh and unforgiving environment, yet strangely beautiful in its stark simplicity.",
      "The countryside was a patchwork of fields and meadows, with rolling hills stretching out as far as the eye could see. I rode my bike along the country lanes, feeling the wind in my hair and the sun on my face. The air was sweet with the scent of wildflowers, and the sound of birdsong filled the air. It was a perfect day for a leisurely ride through the countryside.",
      "The beach was alive with activity, with families and friends enjoying the sun, sand, and surf. Children played in the waves, their laughter mingling with the sound of crashing surf. I lay on a beach towel, soaking up the warm sunshine and listening to the rhythmic sound of the waves. It was a carefree and joyful moment, a chance to escape from the stresses of everyday life.",
      "The river flowed lazily through the countryside, its waters sparkling in the sunlight. I sat on the bank, dipping my toes into the cool water. Fish darted through the shallows, and dragonflies flitted about in the air. It was a tranquil and idyllic scene, a peaceful oasis in the midst of the bustling world.",
      "The park was a green oasis in the heart of the city, with towering trees and lush lawns stretching out in every direction. I walked along the winding paths, enjoying the beauty of nature and the simple pleasures of life. The air was filled with the scent of flowers, and the sound of birdsong filled the air. It was a perfect day to be outdoors, enjoying the beauty of the world around me.",
      "The city was alive with the sounds of traffic and people, with skyscrapers reaching towards the sky. I walked along the busy streets, marveling at the energy and excitement of urban life. The air was filled with the scent of food and the sound of music, creating a vibrant and lively atmosphere. It was a thrilling moment, a chance to immerse myself in the bustling energy of the city."
    ],
    hard: [
      "The sun hung low in the sky, casting long shadows across the desert landscape. The air was hot and dry, with no relief from the scorching heat. I trudged through the sand, my feet sinking with each step. The desert stretched out before me, a barren wasteland of sand and rock. It was a harsh and unforgiving environment, yet strangely beautiful in its stark simplicity.",
      "The city skyline rose majestically against the horizon, a glittering maze of lights and buildings. I stood on the rooftop, taking in the breathtaking view of the city at night. The air was cool and crisp, with a gentle breeze blowing through the skyscrapers. It was a magical sight, a reminder of the energy and excitement of urban life.",
      "The forest was alive with the sounds of nature, from the chirping of crickets to the rustling of leaves in the wind. I walked along the trail, breathing in the fresh scent of pine and earth. The trees towered overhead, their branches reaching towards the sky. It was a peaceful oasis, a sanctuary from the stresses of everyday life.",
      "The mountains loomed in the distance, their jagged peaks etched against the sky. I hiked along the trail, feeling the crunch of gravel beneath my boots. The air was thin and crisp, invigorating my lungs with each breath. I gazed out at the panoramic view of the valley below, awestruck by the beauty of the natural world.",
      "The desert stretched out before me, a vast expanse of sand and sky. The sun beat down relentlessly, casting shimmering waves of heat across the landscape. I trudged through the sand, my feet sinking with each step. It was a harsh and unforgiving environment, yet strangely beautiful in its stark simplicity.",
      "The countryside was a patchwork of fields and meadows, with rolling hills stretching out as far as the eye could see. I rode my bike along the country lanes, feeling the wind in my hair and the sun on my face. The air was sweet with the scent of wildflowers, and the sound of birdsong filled the air. It was a perfect day for a leisurely ride through the countryside.",
      "The beach was alive with activity, with families and friends enjoying the sun, sand, and surf. Children played in the waves, their laughter mingling with the sound of crashing surf. I lay on a beach towel, soaking up the warm sunshine and listening to the rhythmic sound of the waves. It was a carefree and joyful moment, a chance to escape from the stresses of everyday life.",
      "The river flowed lazily through the countryside, its waters sparkling in the sunlight. I sat on the bank, dipping my toes into the cool water. Fish darted through the shallows, and dragonflies flitted about in the air. It was a tranquil and idyllic scene, a peaceful oasis in the midst of the bustling world.",
      "The park was a green oasis in the heart of the city, with towering trees and lush lawns stretching out in every direction. I walked along the winding paths, enjoying the beauty of nature and the simple pleasures of life. The air was filled with the scent of flowers, and the sound of birdsong filled the air. It was a perfect day to be outdoors, enjoying the beauty of the world around me.",
      "The city was alive with the sounds of traffic and people, with skyscrapers reaching towards the sky. I walked along the busy streets, marveling at the energy and excitement of urban life. The air was filled with the scent of food and the sound of music, creating a vibrant and lively atmosphere. It was a thrilling moment, a chance to immerse myself in the bustling energy of the city."
    ]
  };

function loadParagraph() {
  const paragraphs = difficultyLevels[selectedDifficulty];
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[ranIndex].split("").forEach((char) => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText == typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
  } else {
    clearInterval(timer);
    inpField.value = "";
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
}

document.querySelectorAll('.difficulty-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    selectedDifficulty = btn.dataset.difficulty;
    resetGame();
  });
});

loadParagraph();

inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
