var weatherMain;
var phrase1;
var phrase2;
var numIcon;
var selectedCity;
var latCoord;
var lonCoord;
var massCities = ["Кременчук","Полтава","Піщане","Потоки","Щербаки","Нова Галещина","Омельник","Миколаїв","Одеса","Харків","Кривий Ріг","Черкаси","Кропивницький","Чернігів","Дніпро","Суми","Вінниця","Хмельницький","Житомир","Рівне","Київ","Чернівці","Тернопіль","Івано-Франківськ","Львів","Луцьк","Херсон","Запоріжжя","Горішні Плавні","Біла Церква","Умань"];
massCities.sort();

if($("#tips").length){
  elemDatalist = document.getElementById('tips');
  for (i = 0; i < massCities.length; i++){
      elemOption = document.createElement('option');
      elemOption.text = massCities[i];
      elemDatalist.appendChild(elemOption);
  }
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 1000 * 60 * 60 * 12
};
if($("#tips").length){
  var currentValue = localStorage.getItem("coords");
  if (currentValue != null) {
    var currentValue = localStorage.getItem("coords").split(";");
  }
  
  if (currentValue === null) {
    getPos();
  }
  else{
    if (currentValue[2] < new Date()) {
      localStorage.removeItem("coords");
      getPos();
    }
    else{
      sendAPI(currentValue[0], currentValue[1]);
    }
  }
}



function getPos(){
  navigator.geolocation.getCurrentPosition(success, error, options);
}

function sendAPI_City(){
  elem = $('#formWhichCity').val();
  if (elem == "") {
    return false;
  }
  $("document").ready( function(){
    let promise = new Promise((resolve, reject) => {

      $.get(`https://api.openweathermap.org/data/2.5/weather?q=${elem}&units=metric&appid=2de62d2b11192b2f43ec8020a5d64503
`,
      function(data){
        fillContent(data);
        resolve(latCoord, lonCoord);
      });
    });

    promise
  .then(
    result => {
      $.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latCoord}&lon=${lonCoord}&exclude=daily&units=metric&appid=2de62d2b11192b2f43ec8020a5d64503`,
      function(dataD){
        fillTomorrow(dataD);
      });
    },
    error => {
      console.error("Some problems");
    }
  );

  });
}


function success(pos) {
  crd = pos.coords;

  // console.log('Ваше текущее местоположение:');
  // console.log(`Широта: ${crd.latitude}`);
  // console.log(`Долгота: ${crd.longitude}`);
  // console.log(`Плюс-минус ${crd.accuracy} метров.`);

  var values = new Array();
  var date = new Date();
  date.setHours(date.getHours() + 24);
  values.push(crd.latitude);
  values.push(crd.longitude);
  values.push(date);
  localStorage.setItem("coords", values.join(";"));

  sendAPI(crd.latitude, crd.longitude);
};

function sendAPI(lat, long){
  $("document").ready( function(){
    $.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=2de62d2b11192b2f43ec8020a5d64503`,
    function(data){
      fillContent(data);
    });
    $.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=daily&units=metric&appid=2de62d2b11192b2f43ec8020a5d64503`,
    function(dataD){
      fillTomorrow(dataD);
    });
  });
}

function fillContent(arg){
  latCoord = arg.coord.lat;
  lonCoord = arg.coord.lon;
  selectedCity = arg.name;
  $("#fillContent0").text(arg.name);
  switch (arg.weather[0].main) {
  case "Thunderstorm":
    weatherMain = "Гроза";
    phrase1 = "Грохочет гром";
    phrase2 = "Сверкает молния в ночи";
    $("#page-wrapper").addClass("back0");
    $("#banner").addClass("back0");
    $(".style4").addClass("back0");
    break;
  case "Drizzle":
    weatherMain = "Мряка";
    phrase1 = "Дождик, дождик, веселей!";
    phrase2 = "Капай, капай, не жалей! ";
    $("#page-wrapper").addClass("back1");
    $("#banner").addClass("back1");
    $(".style4").addClass("back1");
    break;
  case "Rain":
    weatherMain = "Дощ";
    phrase1 = "Надо мною тишина";
    phrase2 = "Небо полное дождя";
    $("#page-wrapper").addClass("back2");
    $("#banner").addClass("back2");
    $(".style4").addClass("back2");
    break;
  case "Snow":
    weatherMain = "Сніг";
    phrase1 = "Белый снег, серый лёд";
    phrase2 = "На растрескавшейся земле";
    $("#page-wrapper").addClass("back3");
    $("#banner").addClass("back3");
    $(".style4").addClass("back3");
    break;
  case "Clear":
    weatherMain = "Ясно";
    phrase1 = "Мимо нас, мимо нас";
    phrase2 = "Пьяное солнце";
    $("#page-wrapper").addClass("back4");
    $("#banner").addClass("back4");
    $(".style4").addClass("back4");
    break;
  case "Clouds":
    weatherMain = "Хмарно";
    phrase1 = "Облака - белокрылые лошадки";
    phrase2 = "Облака, что вы мчитесь без оглядки?";
    $("#page-wrapper").addClass("back5");
    $("#banner").addClass("back5");
    $(".style4").addClass("back5");
    break;
  default:
    $("#page-wrapper").addClass("default");
    $("#banner").addClass("default");
    $(".style4").addClass("default");
    weatherMain = arg.weather[0].main;
}
  $("#fillContent1").text(phrase1);
  $("#fillContent2").text(phrase2);
  $("#fillContent01").text(Math.round(arg.main.temp * 10)/10);
  $("#fillContent02").text(upCaseFirst(arg.weather[0].description));

  numIcon = arg.weather[0].icon;
  $("#fillContent001").attr("src", 'images/icons-weather/'+numIcon+'.png');
}

function fillTomorrow(arg){
  $("#fillContent3").text(selectedCity);
  $("#fillContent4").attr("src", 'images/icons-weather/'+arg.hourly[2].weather[0].icon+'.png');
  $("#fillContent5").text(Math.round(arg.hourly[2].temp * 10)/10);
  $("#fillContent6").text(upCaseFirst(arg.hourly[2].weather[0].description));

  $("#fillContent7").text(selectedCity);
  $("#fillContent8").attr("src", 'images/icons-weather/'+arg.hourly[23].weather[0].icon+'.png');
  $("#fillContent9").text(Math.round(arg.hourly[23].temp * 10)/10);
  $("#fillContent10").text(upCaseFirst(arg.hourly[23].weather[0].description));

  $("#fillContent11").text(selectedCity);
  $("#fillContent12").attr("src", 'images/icons-weather/'+arg.hourly[47].weather[0].icon+'.png');
  $("#fillContent13").text(Math.round(arg.hourly[47].temp * 10)/10);
  $("#fillContent14").text(upCaseFirst(arg.hourly[47].weather[0].description));
}

function error(err) {

  // console.warn(`ERROR(${err.code}): ${err.message}`);
  // console.error(err.code);
  sendAPI(50.4333, 30.5167);
};

function upCaseFirst(str){
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

$(function(){
  var fixedOffset = 48;
  $('#tp1').on('click', function(e){
    $('html,body').stop().animate({ scrollTop: $('#one').offset().top - fixedOffset}, 1000);
    e.preventDefault();
  });
});

$(function(){
  var fixedOffset = 48;
  $('#tp2').on('click', function(e){
    $('html,body').stop().animate({ scrollTop: $('#cta').offset().top - fixedOffset}, 1000);
    e.preventDefault();
  });
});

$(function(){
  var fixedOffset = 48;
  $('#tp3').on('click', function(e){
    $('html,body').stop().animate({ scrollTop: $('#footer').offset().top - fixedOffset}, 1000);
    e.preventDefault();
  });
});
