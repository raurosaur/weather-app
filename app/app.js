const key = '2ca6d6f2a0aab4ee884df1bfc76751bb';
const grid = document.querySelectorAll('.info div');
const scenes = document.querySelectorAll('.scenes');
const convertC = temp => (temp - 273).toFixed(1) + '˚C';
const titleCase = str => str[0].toUpperCase() + str.substring(1);
const waves = document.querySelector('.waves');
const sun = document.querySelector('.sunny img');
const info = document.querySelector('.info');

//Hide/Show Class
const hide = () => {
    for (let scene of scenes)
        scene.classList.remove('show');
},
show = (el) => { el.classList.add('show') };

//Scene Functions
const sunny = () => {
    waves.classList.add('green');
    hide();
    show(scenes[0]);
    scenes[0].querySelector('img').classList.toggle('move');
},
clouds = () => {
    waves.classList.add('green');
    hide();
    show(scenes[1]);
},
rain = () => {
    waves.classList.remove('green');
    hide();
    show(scenes[2]);
},
snow = () => {
    waves.classList.remove('green');
    hide();
    show(scenes[3]);
};

//Return Scene Function
getScene = (id) => {
    if(id >= 200 && id <= 531)
        return rain;
    if(id >= 600 && id <= 700)
        return snow;
    if(id === 800)
        return sunny;
    if(id >= 801 && id <= 805)
        return clouds;
};

//API and DOM Manipulation
async function getWeather(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    try{
        const response = await fetch(url, {mode: 'cors'});
        const jsonObject = await response.json(); 
        parse(jsonObject);
        const id = jsonObject["weather"][0]["id"];
        //console.log(jsonObject);
        const scene = getScene(id);
        if(scene) scene();
    }
    catch(e){
        console.log(e);
    }
}

//Parse into DOM
function parse(response){
    const details = [
        response["name"], //city
        titleCase(response["weather"][0]["description"]), // desc
        convertC(response["main"]["temp"]), //temp
        `Max\n${convertC(response["main"]["temp_max"])}`, //max
        `Min\n${convertC(response["main"]["temp_min"])}`, //min
        `Feels Like\n${convertC(response["main"]["feels_like"])}`, //feels like
        `Visibility\n${response["visibility"]} m`, //visibiity
        `Wind Speed: ${response["wind"]["speed"]} m/s`, //wind speed
        `Wind Direction: ${response["wind"]["deg"]}˚` //wind direction
    ];

    for(let i = 0; i < details.length; i++)
        grid[i].innerText = details[i];
}


getWeather('mumbai');
info.onclick = snow;