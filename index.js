// Reference Variable
const categorySelect = document.getElementById("category");
const getJokeBtn = document.querySelector("#getJokeBtn");
const jokeText = document.querySelector("#jokeText");

console.log("Start");

// Function to fetch categories
async function fetchJokeCategories() {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/categories");

    // Check if response is 'OK' or not!
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const categories = await response.json();

    // Add "Random" option to the dropdown
    const randomOption = document.createElement("option");
    randomOption.value = "random";
    randomOption.text = "Random";
    categorySelect.appendChild(randomOption);

    // Adding category options to the dropdown
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.text = category;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    // Printing the error in the browser console
    console.log(`Error fetching Chuck Norris Joke Categories: ${error}`);
    alert(
      "Error fetching Chuck Norris Joke Categories. Please try again later."
    );
  }
}

// Fetching random jokes
async function fetchRandomJoke() {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");

    if (!response.ok) {
      throw new Error("Error.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error fetching joke: ${error}`);
    return;
  }
}

// Fetching jokes based on category
async function fetchCategoryJoke(category) {
  try {
    const response = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${category}`
    );

    if (!response.ok) {
      throw new Error("Error.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error fetching joke: ${error}`);
    return;
  }
}

// Function to get jokes from API
async function getJokes() {
  const selectedCategory = categorySelect.value;
  console.log(selectedCategory);

  try {
    let jokeData;
    if (selectedCategory === "false") {
      alert("Please select a category or choose 'Random'.");
      categorySelect.classList.add("error");
      setTimeout(() => {
        categorySelect.classList.remove("error");
      }, 500);
    } else if (selectedCategory === "random") {
      jokeData = await fetchRandomJoke();
    } else {
      jokeData = await fetchCategoryJoke(selectedCategory);
    }
    displayJoke(jokeData);
  } catch (error) {
    console.error("Error fetching joke:", error, response.status);
    alert("An error occurred while fetching the joke. Please try again later.");
  }
}

// Function to display jokes
async function displayJoke(jokeData) {
  if (jokeData) {
    jokeText.textContent = jokeData.value;

    const li = document.createElement("li");
    li.innerHTML = jokeData.value;
    li.classList.add("listedJokes");
    document.getElementById("jokeList").appendChild(li);
  } else {
    jokeText.textContent =
      "Error fetching Chuck Norris joke! Please try again later.";
  }
}

// Event listener for button 'click'
getJokeBtn.addEventListener("click", getJokes);
window.addEventListener("load", fetchJokeCategories);

// Footer body
const footer_body = document.getElementById('footer_body');
footer_body.innerHTML = `&COPY; ${new Date().getFullYear()} | Dipankar Paul<br/>Made with pure HTML, CSS, JavaScript and Chuck Norris Jokes Api`;

console.log("End");
