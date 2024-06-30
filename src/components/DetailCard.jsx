import axios from "axios";
import { DetailCardWrap } from "../styled/Style";
import { useState } from "react";
import AddDetail from "./AddDetail";

// eslint-disable-next-line react/prop-types
const DetailCard = ({ keyword, test, closeDetail, setWeatherData }) => {
  const [city, setCity] = useState("0");
  const [country, setCountry] = useState("0");
  const [temp, setTemp] = useState(0);
  const [imgCode, setImgCode] = useState("09d");

  const getWeatherData = (keyword) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${keyword}&appid=dd67186d5fda0b5940d40327767f0935&units=metric`;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=dd67186d5fda0b5940d40327767f0935&units=metric`;
    axios.get(url).then((res) => {
      const data = res.data;
      setCity(data.name);
      setCountry(data.sys.country);
      setTemp(data.main.temp);
      setImgCode(data.weather[0].icon);
    });
  };

  getWeatherData(keyword);

  return (
    <DetailCardWrap>
      <div className="icon">
        <i className="xi-plus-circle"></i>
        <i className="xi-close" onClick={closeDetail}></i>
      </div>
      <div className="detailWeather">
        <img src={`../../public/images/${imgCode}.png`} alt="" />
        <div>
          <p className="cityname">
            {city} , {country}
          </p>
          <p className="temper">{temp}℃</p>
        </div>
      </div>
      <AddDetail keyword={keyword} test={test} />
    </DetailCardWrap>
  );
};

export default DetailCard;
