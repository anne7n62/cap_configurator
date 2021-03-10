"use strict";

// The model of all features
const features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false,
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  const target = event.currentTarget; //referer til det element, der har været mål for eventet
  const feature = target.dataset.feature;

  // Toggle feature in "model" (NOT operator, toggler true/false)
  features[feature] = !features[feature];

  if (features[feature]) {
    //feature added
    console.log(`Feature ${feature} is turned on!`);

    // Adding class chosen to the target / underlines chosen
    target.classList.add("chosen");

    // Shows the feature image by removing hide class
    document.querySelector(`[data-feature="${feature}"`).classList.remove("hide");

    // Adds the chosen feature element in ul
    const featureElementLi = createFeatureElement(feature);
    document.querySelector("#selected ul").appendChild(featureElementLi);

    // Set start and endpoints for animation
    const start = target.getBoundingClientRect();
    const end = featureElementLi.getBoundingClientRect();

    const diffx = start.x - end.x + "px";
    const diffy = start.y - end.y + "px";

    featureElementLi.style.setProperty("--diffx", diffx);
    featureElementLi.style.setProperty("--diffy", diffy);

    // Add add class when turning feature on
    featureElementLi.classList = "animate-feature-in";
  } else {
    // Remove underline and color, unchoose feature
    target.classList.remove("chosen");

    const theFeaturedElement = document.querySelector(`#selected [data-feature="${feature}"]`);

    // Set start and endpoints for animation
    const end = theFeaturedElement.getBoundingClientRect();
    const start = target.getBoundingClientRect();

    const diffx = start.x - end.x + "px";
    const diffy = start.y - end.y + "px";

    theFeaturedElement.style.setProperty("--diffx", diffx);
    theFeaturedElement.style.setProperty("--diffy", diffy);

    // ... remember to ask: why offsetHeight again??
    theFeaturedElement.offsetHeight;

    // Add remove class when turning feature off
    theFeaturedElement.classList = "animate-feature-out";

    // When remove animation is over, remove from list and hide image
    theFeaturedElement.addEventListener("animationend", function () {
      theFeaturedElement.remove();
      document.querySelector(`[data-feature=${feature}`).classList.add("hide");
      console.log(`Feature ${feature} is turned off!`);
    });
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}
