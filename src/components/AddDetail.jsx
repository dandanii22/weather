import { useEffect, useState } from "react";
import { AddDetailWrap } from "../styled/Style";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";

// eslint-disable-next-line react/prop-types
// 설마 페이지마다 test용으로 useEffect 걸어서 데이터 연결해줘야하는건가..?
const AddDetail = ({ keyword, hours }) => {
  const [temp_min, setTemp_min] = useState(0);
  const [temp_max, setTemp_max] = useState(0);
  const [temp_feel, setTemp_feel] = useState(0);

  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");

  const [wind_speed, setWind_speed] = useState(0);
  const [wind_deg, setWind_deg] = useState(0);

  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);

  const [clouds, setClouds] = useState(0);
  const [visibility, setVisibility] = useState(0);

  const debouncedValue = useDebounce(keyword, 1000);

  useEffect(() => {
    if (debouncedValue) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${debouncedValue}&appid=dd67186d5fda0b5940d40327767f0935&units=metric`;
      // const url = `https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=dd67186d5fda0b5940d40327767f0935&units=metric`;
      axios.get(url).then((res) => {
        const data = res.data;
        setTemp_min(data.main.temp_min);
        setTemp_max(data.main.temp_max);
        setTemp_feel(data.main.feels_like);
        setSunrise(data.sys.sunrise);
        setSunset(data.sys.sunset);
        setWind_speed(data.wind.speed);
        setWind_deg(data.wind.deg);
        setHumidity(data.main.humidity);
        setPressure(data.main.pressure);
        setClouds(data.clouds.all);
        setVisibility(data.visibility / 1000);
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
          ✔️ <span>최저기온</span> : {Math.round(temp_min)}℃
        </p>
        <p>
          ✔️ <span>최고기온</span> : {Math.round(temp_max)}℃
        </p>
        <p>
          ✔️ <span>체감온도</span> : {Math.round(temp_feel)}℃
        </p>
        <br />
        <p>
          ✔️ <span>일출</span> : {timeConvert(sunrise)}
        </p>
        <p>
          ✔️ <span>일몰</span> : {timeConvert(sunset)}
        </p>
        <br />
        <p>
          ✔️ <span>풍향</span> : {wind_deg}
        </p>
        <p>
          ✔️ <span>풍속</span> : {wind_speed} m/s
        </p>
        <br />
        <p>
          ✔️ <span>기압</span> : {pressure} hPa
        </p>
        <p>
          ✔️ <span>습도</span> : {humidity} %
        </p>
        <br />
        <p>
          ✔️ <span>구름</span> : {clouds} %
        </p>
        <p>
          ✔️ <span>가시거리</span> : {visibility} km
        </p>
      </div>
    </AddDetailWrap>
  );
};

export default AddDetail;
