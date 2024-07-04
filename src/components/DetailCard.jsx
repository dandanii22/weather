import axios from "axios";
import { DetailCardWrap } from "../styled/Style";
import { useEffect, useState } from "react";
import AddDetail from "./AddDetail";
import Hourly from "./Hourly";
import useDebounce from "../hooks/useDebounce";
import { getWeatherUrl } from "../util/getWeatherUrl";

// eslint-disable-next-line react/prop-types
const DetailCard = ({ keyword, closeDetail, hours, addFav }) => {
  const [weatherData, setWeatherData] = useState({
    city: "",
    country: "",
    temp: 0,
    imgCode: "09d",
  });

  const [classOn, setClassOn] = useState(true);

  const changeDetail = () => {
    setClassOn(!classOn);
  };

  const debouncedValue = useDebounce(keyword, 1000);

  useEffect(() => {
    if (debouncedValue) {
      const url = getWeatherUrl("/weather", debouncedValue);
      axios.get(url).then((res) => {
        const data = res.data;
        setWeatherData({
          city: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          imgCode: data.weather[0].icon,
        });
      });
    }
  }, [debouncedValue]);

  return (
    <DetailCardWrap className={hours >= 18 || hours < 6 ? "active" : ""}>
      <div className="icon">
        <i className="xi-plus-circle" onClick={addFav}></i>
        <i className="xi-close" onClick={closeDetail}></i>
      </div>
      <div className="detailWeather">
        <img
          src={`https://dandanii22.github.io/images/${weatherData.imgCode}.png`}
          alt=""
        />
        <div>
          <p className="cityname">
            {weatherData.city} , {weatherData.country}
          </p>
          <p className="temper">{Math.round(weatherData.temp * 10) / 10}℃</p>
        </div>
      </div>
      <div className="tag">
        <p className={classOn ? "on" : ""} onClick={changeDetail}>
          Details
        </p>
        <p className={classOn ? "" : "on"} onClick={changeDetail}>
          Hourly
        </p>
      </div>

      {classOn ? (
        <AddDetail keyword={keyword} hours={hours} />
      ) : (
        <Hourly keyword={keyword} hours={hours} />
      )}
    </DetailCardWrap>
  );
};

export default DetailCard;
