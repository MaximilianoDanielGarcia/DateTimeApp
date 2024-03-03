const blockquote = document.getElementsByTagName('blockquote')[0];
const author = document.getElementById('author');
const country = document.getElementById('country');
const date = document.getElementById('date');
const time = document.getElementById('time');
const zone = document.getElementById('zone');
const body = document.getElementsByTagName('body')[0];
const gretingText = document.getElementById('greting-text');
const gretingIcon = document.getElementById('gretings-icon');
const btnMoreInfo = document.getElementById('btn-more-info');
const btnLessInfo = document.getElementById('btn-less-info');
const moreInfoSection = document.getElementsByClassName('more-info')[0];
const blockquoteSection = document.getElementsByClassName('blockquotes-section')[0];

const currentTimeZone = document.getElementById('current-timezone');
const dayOfYear = document.getElementById('day-of-year');
const dayOfWeek = document.getElementById('day-of-week');
const weekNumber = document.getElementById('week-number');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let widthScreen = window.outerWidth;

window.addEventListener("resize", reportWindowSize);

function reportWindowSize() {
    widthScreen = window.outerWidth;
}

function openCloseInfoSection() {
    moreInfoSection.classList.toggle('show');

    if (!moreInfoSection.classList.contains('show')) {
        btnMoreInfo.style.display = 'flex';
        btnLessInfo.style.display = 'none';

    }
    else {
        btnMoreInfo.style.display = 'none';
        btnLessInfo.style.display = 'flex';
    }

    if(widthScreen <= 600){
        blockquoteSection.classList.toggle('hidden');
    }
}

async function getBlockquote() {
    const response = await fetch("https://api.quotable.io/random");
    const randomBlockquote = await response.json();

    blockquote.innerHTML = `"${randomBlockquote.content}"`;
    author.innerHTML = randomBlockquote.author;
}

async function getBaseIP() {
    const response = await fetch("https://api.ipbase.com/v1/json/");
    const baseIp = await response.json();

    country.innerHTML = `In ${baseIp.region_name}, ${baseIp.country_name}`;
}

async function getDateTime() {
    const response = await fetch("https://worldtimeapi.org/api/ip");
    const dateTime = await response.json();

    let newDate = new Date(dateTime.datetime);
    let hours = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
    let minutes = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();

    date.innerHTML = `${newDate.getDate()} ${months[newDate.getMonth()]} ${newDate.getFullYear()}`
    time.innerHTML = `${hours}:${minutes}`;
    zone.innerHTML = `GMT${dateTime.abbreviation}`;

    let timeZoneSplitted = dateTime.timezone.replace('_', ' ').split('/');

    currentTimeZone.innerHTML = `${timeZoneSplitted[1]}, ${timeZoneSplitted[2]}`;
    dayOfYear.innerHTML = dateTime.day_of_year;
    dayOfWeek.innerHTML = dateTime.day_of_week;
    weekNumber.innerHTML = dateTime.week_number;

    if (hours >= 20 || hours < 5) {

        body.style.backgroundImage = "url('./images/desktop/bg-image-nighttime.jpg')";
        gretingIcon.src = './images/icon-moon.svg';
        moreInfoSection.classList.add('dark');
    }
    else {
        body.style.backgroundImage = "url('./images/desktop/bg-image-daytime.jpg')";
        gretingIcon.src = './images/icon-sun.svg';
        moreInfoSection.classList.remove('dark');
    }

    //greting

    if (hours > 5 && hours < 12) {
        gretingText.innerHTML = "Good morning, it's currently";
    }
    else if (hours >= 12 && hours < 18) {
        gretingText.innerHTML = "Good afternoon, it's currently"
    }
    else {
        gretingText.innerHTML = "Good evening, it's currently";
    }


}

setInterval(() => {

    getBlockquote();
    getDateTime();

}, 60000)

getBaseIP();
getDateTime();