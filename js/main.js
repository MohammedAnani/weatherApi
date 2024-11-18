// thisDay

var searchInput=document.getElementById("searchInput")

var todayName=document.getElementById("todayName");
var dateOne=document.getElementById("dateOne");
var todayMonth=document.getElementById("todayMonth")
var cityOne=document.getElementById("cityOne");
var temperatureOne=document.getElementById("temperatureOne");
var weatherImg=document.getElementById("weatherImg")
var conditionOne=document.getElementById("conditionOne");
var humidityOne=document.getElementById("humidityOne");
var windSpeedOne=document.getElementById("windSpeedOne");
var windDirectionOne=document.getElementById("windDirectionOne");


//nextDay
var nextDay=document.getElementsByClassName("nextDay")
var nextImg=document.getElementsByClassName("nextImg")
var nextMaxTemp=document.getElementsByClassName("nextMaxTemp")
var nextMinTemp=document.getElementsByClassName("nextMinTemp")
var nextCondition=document.getElementsByClassName("nextCondition")


// Call API 

async function getApi(cityName){

   apiRespons=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2df68a17d7ba4acb93a175400241111&q=${cityName}&days=3`);
   finalResonse=await apiRespons.json();
   return finalResonse
 
}
// Call All Function
async function startApp(city="cairo"){

  var api= await getApi(city)
  displayApi(api)
  nextDays(api)
  
  
  
}
startApp()

  // thisDay

function displayApi(apiResult){ //apiReslut = x = ay parameter

   var todayDate=new Date()

   todayName.innerHTML=todayDate.toLocaleDateString("en-us",{weekday:"long"})
   dateOne.innerHTML=todayDate.getDate()
   todayMonth.innerHTML=todayDate.toLocaleDateString("en-us",{month:"long"})


   cityOne.innerHTML=apiResult.location.name;
   temperatureOne.innerHTML=apiResult.current.temp_c;
   weatherImg.src=apiResult.current.condition.icon;
   conditionOne.innerHTML=apiResult.current.condition.text;
   humidityOne.innerHTML=apiResult.current.humidity;
   windSpeedOne.innerHTML=apiResult.current.wind_kph;
   windDirectionOne.innerHTML=apiResult.current.wind_dir;



}


   //nextDay


function nextDays(apiResult){
  var apiNext=apiResult.forecast.forecastday;
  for(var i=0;i<apiNext.length;i++){
    var tomorrowDate=new Date(apiNext[i+1].date)
    nextDay[i].innerHTML=tomorrowDate.toLocaleDateString("en-us",{weekday:"long"})
    nextImg[i].src=apiNext[i+1].day.condition.icon;
    nextMaxTemp[i].innerHTML=apiNext[i+1].day.maxtemp_c;
    nextMinTemp[i].innerHTML=apiNext[i+1].day.mintemp_c;
    nextCondition[i].innerHTML=apiNext[i+1].day.condition.text;
  }  
}

// search

searchInput.addEventListener("input",function(){
  startApp(searchInput.value);
  
})
