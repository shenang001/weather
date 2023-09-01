/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */
function getWeather(cityCode){
    myAxios({
        url:'http://hmajax.itheima.net/api/weather',
        params:{
          city: cityCode,
        }
    }).then(res =>{
        console.log(res.data);
        const wData = res.data;
        // 数据显示到页面
        // 日期
        const dateStr = `
        <span class="dateShort">${wData.date}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${wData.dateLunar}</span>
        </span>`
        document.querySelector('.title').innerHTML = dateStr;
        document.querySelector('.area').innerHTML = wData.area;
        // 天气
        const weatherStr = `
        <div class="tem-box">
        <span class="temp">
          <span class="temperature">${wData.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${wData.psPm25}</span>
          <span class="psPm25Level">${wData.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src="./imgs/小雨-line.png" class="weatherImg" alt="">
            <span class="weather">${wData.weather}</span>
          </li>
          <li class="windDirection">${wData.windDirection}</li>
          <li class="windPower">${wData.windPower}</li>
        </ul>
      </div>`
      document.querySelector('.weather-box').innerHTML = weatherStr;
    //   今日天气情况
    const {weather,sunriseTime,sunsetTime,temDay,temNight,ultraviolet,humidity} = wData.todayWeather;
        const todayStr = `
        <div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${weather}</span>
          <span class="temNight">${temNight}</span>
          <span>-</span>
          <span class="temDay">${temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${sunsetTime}</span>
        </li>
      </ul>`;
        document.querySelector('.today-weather').innerHTML = todayStr;

        // 7日天气预报
        const dayForecast = wData.dayForecast;
        console.log(dayForecast);
       const dayForecastStr = dayForecast.map(item =>{
            // console.log(item);
            return `<li class="item">
            <div class="date-box">
              <span class="dateFormat">${item.dateFormat}</span>
              <span class="date">${item.date}</span>
            </div>
            <img src=${item.weatherImg} alt="" class="weatherImg">
            <span class="weather">${item.weather}</span>
            <div class="temp">
              <span class="temNight">${item.temNight}</span>-
              <span class="temDay">${item.temDay}</span>
              <span>℃</span>
            </div>
            <div class="wind">
              <span class="windDirection">${item.windDirection}</span>
              <span class="windPower">&lt;${item.windPower}</span>
            </div>
          </li>`
        })
        document.querySelector('.week-wrap').innerHTML = dayForecastStr;
    })
}
getWeather('110100');

    // 获取input事件 关键字查找
    document.querySelector('.search-city').addEventListener('input', e=>{
        // console.log(e.target.value);
        myAxios({
            url:'http://hmajax.itheima.net/api/weather/city',
            params:{
                city:e.target.value,
            }
          
        }).then(res =>{
            console.log(res.data);
            const cityName = res.data;
          const cityNameStr =  cityName.map(item =>{
                return `<li class="city-item" data-code=${item.code}>${item.name}</li>`
            }).join('');
            // console.log(cityNameStr);
            document.querySelector('.search-list').innerHTML = cityNameStr;
        })
    })

    // 因为城市是动态获取的 所以采用事件委托和事件对象
    document.querySelector('.search-list').addEventListener('click', e =>{
        // 当点击的元素类包含city-item时 才会继续执行
      if(e.target.classList.contains('city-item')){
        const cityCode = e.target.dataset.code;
        console.log(cityCode);
        getWeather(cityCode);
      }

    })
    

