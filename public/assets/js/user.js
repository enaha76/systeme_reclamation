var displayDiv = document.getElementById("displayDiv");

const currentDate = new Date();
const options = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'Africa/Nouakchott',

};
const formattedDate = currentDate.toLocaleDateString('en-US', options);
const lastDuration2= lastDuration.trim();
console.log(lastDuration2); // output the value of lastDurationFormatted
console.log(formattedDate); // output the value of formattedDate

if (lastDuration2 === formattedDate) {
  
  displayDiv.style.display = "none";
} 
console.log(displayDiv);