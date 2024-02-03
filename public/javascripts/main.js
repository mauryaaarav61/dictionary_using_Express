document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("searchButton").addEventListener("click", search);
});

function search() {
  const words = document.getElementById("wordInput").value;
  const displayResult = document.getElementById("displayResult");
  const errorElement = document.getElementById("error");
 
  displayResult.innerHTML = "";
  if (errorElement) {
    errorElement.textContent = "";
  }

  if (!words.trim()) {
    if (errorElement) {
      errorElement.textContent = "Input empty. Please enter something.";
    }
    return;
  }

  if (!words.match(/^[A-Za-z]+$/)) {
    if (errorElement) {
      errorElement.textContent = "Please enter a valid input.";
    }
    return;
  }
  displayResult.innerHTML = "<p>Loading...</p>";


  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${words}`)
    .then((response) => response.json())
    .then((data) => {
      console.log( data);

      if (Array.isArray(data) && data.length > 0) {
        const inputData = data[0];
        const definitions = inputData.meanings[0].definitions;
        const partOfSpeech = inputData.meanings[0].partOfSpeech;

        displayResult.innerHTML = `
          <h2>${words}</h2>
          <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
          <p><strong>Definition:</strong></p>
          <ul>
            ${definitions
              .map(
                (definition, index) =>
                  `<li>${index + 1}. ${definition.definition}</li>`
              )
              .join("")}
          </ul>
        `;
      } else {

        if (errorElement) {
          errorElement.textContent = `Definition not found for ${words}`;
        }
      }
    })
    .catch((error) => {
      console.error("API request error:", error);
      if (errorElement) {
        errorElement.textContent = "Invalid entry, Please try again.";
      }
    });
}
