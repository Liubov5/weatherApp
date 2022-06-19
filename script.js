let row_block = document.querySelector(".row-block")
let icons = {
	"Clear": "images/clear sky.svg",
	"Clouds":"images/few clouds.svg",
	"Drizzle":"images/broken clouds.svg",
	"Rain": "images/rain.svg",
	"Thunderstorm": "images/thunderstorm.svg",
	"Snow": "images/snow.svg",
	"Mist": "images/snow.svg",
	"Smoke":"images/snow.svg",
	"Haze":"images/snow.svg",
	"Dust":"images/snow.svg",
	"Fog":"images/snow.svg",
	"Sand":"images/snow.svg",
	"Ash":"images/snow.svg",
	"Squall":"images/snow.svg",
	"Tornado":"images/snow.svg",
}
let colors = {
	"Clear": "#E6DF95",
	"Clouds":"#4DB0D3",
	"Drizzle":"#4DB0D3",
	"Rain": "#2B8BAD",
	"Thunderstorm": "#0E2E3A",
	"Snow": "#BCE1EF",
	"Mist": "#BCE1EF",
	"Smoke":"#BCE1EF",
	"Haze":"#BCE1EF",
	"Dust":"#BCE1EF",
	"Fog":"#BCE1EF",
	"Sand":"#BCE1EF",
	"Ash":"#BCE1EF",
	"Squall":"#BCE1EF",
	"Tornado":"#BCE1EF",
}
fetch('http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=89285bf38e34413962fc6c5b3dcb1e3d')
.then(function(resp){ return resp.json()})
.then(function(data){
	create(data)
})
.catch(function(e){
	console.log(e)
})

function create(data){
	
	let obj = data.list[11];
	let a  = new Date(obj.dt*1000+(data.city.timezone*1000));
	let x = new Date(obj.dt_txt)

	let arr = data.list.filter((item)=>{
		let x = new Date(item.dt_txt);
		
		if(x.getHours() == 0){
			return x;
		} 
	})
	
	console.log(arr)
	for(item of arr){	
		let key = item.weather[0].main;
		let item_wrap = document.createElement("div");
		row_block.appendChild(item_wrap)
		item_wrap.classList.add("col-2", "ms-4", "rounded","py-5","item-wrap");	 
		item_wrap.style.background = colors[key]
		
		
		let date = new Date(item.dt_txt);
		var options = { weekday: 'long', month: 'long', day: 'numeric' };
		let new_date = date.toLocaleDateString("ru-Ru", options);
		let new_date_elem = document.createElement("p");
		item_wrap.appendChild(new_date_elem);
		new_date_elem.innerHTML = "<strong>" + new_date + "</strong>";
		new_date_elem.classList.add("text-center")

		let img = document.createElement("img");
		item_wrap.appendChild(img);
		img.classList.add("icon")
		
		img.src =  icons[key];

		let temp = item.main.temp;
		temp = parseInt(temp);
		let temp_elem = document.createElement("h1");
		item_wrap.appendChild(temp_elem);
		temp_elem.innerText = temp + "°";
		temp_elem.classList.add("text-center", "mt-5")     
		
		let pop_elem = document.createElement("h4");
		item_wrap.appendChild(pop_elem);
		pop_elem.innerHTML = "<img src='precipitation.svg'> " + item.pop + "%";
		pop_elem.classList.add("text-center","mt-5", "text-light")
	}
	
}


/*
Вывести дату в понятные слова +
вывести температуру +
вывести цвет блоков в зависимости от погоды +
навести красоту
*/