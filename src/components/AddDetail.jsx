import { useEffect, useState } from "react";
import { AddDetailWrap } from "../styled/Style";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
import { getWeatherUrl } from "../util/getWeatherUrl";

// eslint-disable-next-line react/prop-types
// 설마 페이지마다 test용으로 useEffect 걸어서 데이터 연결해줘야하는건가..?
const AddDetail = ({ keyword, hours }) => {
  const [detailWeatherData, setDetailWeatherData] = useState({
    temp_min: 0,
    temp_max: 0,
    temp_feel: 0,
    sunrise: "",
    sunset: "",
    wind_speed: 0,
    wind_deg: 0,
    humidity: 0,
    pressure: 0,
    clouds: 0,
    visibility: 0,
  });

  const debouncedValue = useDebounce(keyword, 1000);

  useEffect(() => {
    if (debouncedValue) {
      const url = getWeatherUrl("/weather", debouncedValue);
      axios.get(url).then((res) => {
        const data = res.data;
        setDetailWeatherData({
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          temp_feel: data.main.feels_like,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          wind_speed: data.wind.speed,
          wind_deg: data.wind.deg,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          clouds: data.clouds.all,
          visibility: data.visibility / 1000,
        });
      });
    }
  }, [debouncedValue]);

  const timeConvert = (time) => {
    let koreaTime = new Date(time * 1000);
    let koreaTime_str = `${koreaTime.getHours()}시 ${koreaTime.getMinutes()}분`;
    return koreaTime_str;
  };

  return (
    <AddDetailWrap className={hours >= 18 || hours < 6 ? "active" : ""}>
      <div className="detail_inner">
        <p>
          ✔️ <span>최저기온</span> : {Math.round(detailWeatherData.temp_min)}℃
        </p>
        <p>
          ✔️ <span>최고기온</span> : {Math.round(detailWeatherData.temp_max)}℃
        </p>
        <p>
          ✔️ <span>체감온도</span> : {Math.round(detailWeatherData.temp_feel)}℃
        </p>
        <br />
        <p>
          ✔️ <span>일출</span> : {timeConvert(detailWeatherData.sunrise)}
        </p>
        <p>
          ✔️ <span>일몰</span> : {timeConvert(detailWeatherData.sunset)}
        </p>
        <br />
        <p>
          ✔️ <span>풍향</span> : {detailWeatherData.wind_deg}
        </p>
        <p>
          ✔️ <span>풍속</span> : {detailWeatherData.wind_speed} m/s
        </p>
        <br />
        <p>
          ✔️ <span>기압</span> : {detailWeatherData.pressure} hPa
        </p>
        <p>
          ✔️ <span>습도</span> : {detailWeatherData.humidity} %
        </p>
        <br />
        <p>
          ✔️ <span>구름</span> : {detailWeatherData.clouds} %
        </p>
        <p>
          ✔️ <span>가시거리</span> : {detailWeatherData.visibility} km
        </p>
      </div>
    </AddDetailWrap>
  );
};

export default AddDetail;
