// Select all divs for daily, weekly, and monthly stats
const dailyDivs = Array.from(document.querySelectorAll('.daily'));
const weeklyDivs = Array.from(document.querySelectorAll('.weekly'));
const monthlyDivs = Array.from(document.querySelectorAll('.monthly'));

// Fetch the JSON file and import data to elements
fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // Parse the JSON data
  })
  .then(data => {
    // Process the JSON data
    importData(data);
  })
  .catch(error => {
    // Handle any errors
    console.error('There has been a problem with your fetch operation:', error);
  });

function importData(data) {
  // Select all necessary elements
  const dailyCurrentElements = Array.from(document.querySelectorAll('.daily-current'));
  const dailyPreviousElements = Array.from(document.querySelectorAll('.daily-previous'));
  const weeklyCurrentElements = Array.from(document.querySelectorAll('.weekly-current'));
  const weeklyPreviousElements = Array.from(document.querySelectorAll('.weekly-previous'));
  const monthlyCurrentElements = Array.from(document.querySelectorAll('.monthly-current'));
  const monthlyPreviousElements = Array.from(document.querySelectorAll('.monthly-previous'));
  const sectionTitleElements = Array.from(document.querySelectorAll('.section-title'));

  data.forEach((item, i) => {
    const { daily, weekly, monthly } = item.timeframes; // object destructuring
    // rovná se tomuto zápisu:
        // const daily = item.timeframes.daily;
        // const weekly = item.timeframes.weekly;
        // const monthly = item.timeframes.monthly;

    // Update DAILY stats
    dailyCurrentElements[i].innerText = daily.current;
    dailyPreviousElements[i].innerText = daily.previous;

    // Update WEEKLY stats
    weeklyCurrentElements[i].innerText = weekly.current;
    weeklyPreviousElements[i].innerText = weekly.previous;

    // Update MONTHLY stats
    monthlyCurrentElements[i].innerText = monthly.current;
    monthlyPreviousElements[i].innerText = monthly.previous;

    // Update Titles
    const titlesLogged = sectionTitleElements[i].querySelectorAll('.title-logged');
    titlesLogged.forEach(titleLogged => {
      titleLogged.innerText = item.title;
    });
  });
}



// Toggle between daily, weekly, monthly stats

// Pri nahrani stranky show daily stats a ostatni schovej
document.addEventListener('DOMContentLoaded', function(){
    showDailyStats();
})


const selectDaily = document.getElementById('selectDaily');
const selectWeekly = document.getElementById('selectWeekly');
const selectMonthly = document.getElementById('selectMonthly');


selectDaily.addEventListener('click', showDailyStats);
selectWeekly.addEventListener('click', showWeeklyStats);
selectMonthly.addEventListener('click', showMonthlyStats);

function showDailyStats() {
    toggleVisibility('.daily', ['.weekly', '.monthly']);
}

function showWeeklyStats() {
    toggleVisibility('.weekly', ['.daily', '.monthly']);
}

function showMonthlyStats() {
    toggleVisibility('.monthly', ['.daily', '.weekly']);
}

function toggleVisibility(showSelector, hideSelectors) {
    const showElements = document.querySelectorAll(showSelector);
    // .flatMap method - It first maps each element of the array to a new array (using the provided function) - then flattens the resulting arrays into a single array
    const hideElements = hideSelectors.flatMap(selector => Array.from(document.querySelectorAll(selector))); 

    showElements.forEach(element => {
        element.classList.remove('section-logged-hidden');
    });

    hideElements.forEach(element => {
        element.classList.add('section-logged-hidden'); // př. vezme všechny div s .daily a .weekly a přidá k nim třídu s display none
    });
}




