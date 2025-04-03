/*
  index.js
  Script for sampler functionality, contains:
    - Text-to-speech
    - Audio samples
    - Display sample length
*/
const SAMPLES = [
    { name: "Downfall", src: "audio/downfall.mp3", length: 5 },
    { name: "Thud", src: "audio/thud.mp3", length: 2 },
    { name: "Drum Beat", src: "audio/drumBeat.mp3", length: 5 },
    { name: "Losing Horn", src: "audio/losing_horn.mp3", length: 1.38 },
    { name: "Crickets", src: "audio/crickets.mp3", length: 1.4 },
    { name: "Sci fi", src: "audio/sci-fi.mp3", length: 2.0 },
    { name: "Soft Piano", src: "audio/soft_piano.mp3", length: 1.2 },
    { name: "Drum Beat2", src: "audio/drumBeat.mp3", length: 1.8 },
   
    { name: "WOWOW", src: "audio/wow.mp3", length: 5 },
    { name: "Waterphone", src: "audio/waterphone.mp3", length: 2 },
    { name: "Forest sounds", src: "audio/forest_ambience.mp3", length: 5 },
    { name: "Losing Horn", src: "audio/losing_horn.mp3", length: 1.38 },
    { name: "Car Horn", src: "audio/car_horn.mp3", length: 1.4 },
  ];
  
  // Number of samples per page
  const SAMPLES_PER_PAGE = 9;
  
  // Current page index (0-based)
  let currentPage = 0;
  
  // Grab references to DOM elements
  const audioGrid = document.getElementById("audio-grid");
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");
  const pageInfo = document.getElementById("page-info");
  const ttsButton = document.getElementById("tts-button");
  const ttsInput = document.getElementById("tts-input");
  
  // ------------------ TEXT-TO-SPEECH FEATURE ------------------ //
  ttsButton.addEventListener("click", () => {
    const text = ttsInput.value.trim();
    if (text !== "") {
      // Create a new utterance object
      const utterance = new SpeechSynthesisUtterance(text);
      // Speak the text
      speechSynthesis.speak(utterance);
    }
  });
  
  // ------------------ PAGINATION ------------------ //
  function renderSamples(pageIndex) {
    audioGrid.innerHTML = "";
  
    // Calculate start and end indices
    const startIndex = pageIndex * SAMPLES_PER_PAGE;
    const endIndex = startIndex + SAMPLES_PER_PAGE;
  
    // Slice the SAMPLES array to get only the samples for this page
    const samplesToShow = SAMPLES.slice(startIndex, endIndex);
  
    // Render each sample as a button
    samplesToShow.forEach((sample) => {
      const button = document.createElement("button");
      button.classList.add("audio-button");
  
      // Add the sample name
      const sampleName = document.createElement("div");
      sampleName.classList.add("sample-name");
      sampleName.textContent = sample.name;
  
      // Add the sample length
      const sampleLength = document.createElement("div");
      sampleLength.classList.add("sample-length");
      sampleLength.textContent = sample.length + "s";
  
      // Append name & length to button
      button.appendChild(sampleName);
      button.appendChild(sampleLength);
  
      // Add click event to play the audio
      button.addEventListener("click", () => {
        const audio = new Audio(sample.src);
        audio.play();
      });
  
      // Add button to the grid
      audioGrid.appendChild(button);
    });
  
    const totalPages = Math.ceil(SAMPLES.length / SAMPLES_PER_PAGE);
    pageInfo.textContent = `Sample Bank ${pageIndex + 1}`;
  
    // This handles the visibility of pagination arrows
    if (pageIndex === 0) {
      prevPageButton.style.display = "none";
    } else {
      prevPageButton.style.display = "inline-block";
    }
  
    // This Hides "next" if we're on the last page
    if (pageIndex === totalPages - 1) {
      nextPageButton.style.display = "none";
    } else {
      nextPageButton.style.display = "inline-block";
    }
  }
  
  // Go to previous page
  prevPageButton.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      renderSamples(currentPage);
    }
  });
  
  // Go to next page
  nextPageButton.addEventListener("click", () => {
    const totalPages = Math.ceil(SAMPLES.length / SAMPLES_PER_PAGE);
    if (currentPage < totalPages - 1) {
      currentPage++;
      renderSamples(currentPage);
    }
  });
  
  // ------------------ INITIALIZE ------------------ //
  // When the page loads, this renders the first page
  document.addEventListener("DOMContentLoaded", () => {
    renderSamples(currentPage);
  });
  