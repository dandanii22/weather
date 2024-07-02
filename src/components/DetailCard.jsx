import axios from "axios";
import { DetailCardWrap } from "../styled/Style";
import { useEffect, useState } from "react";
import AddDetail from "./AddDetail";
import Hourly from "./Hourly";
import useDebounce from "../hooks/useDebounce";

// eslint-disable-next-line react/prop-types
const DetailCard = ({ keyword, closeDetail, hours, addFav }) => {
  const [city, setCity] = useState("0");
  const [country, setCountry] = useState("0");
  const [temp, setTemp] = useState(0);
  const [imgCode, setImgCode] = useState("09d");
  const [classOn, setClassOn] = useState(true);

  const changeDetail = () => {
    setClassOn(!classOn);
  };

  const debouncedValue = useDebounce(keyword, 1000);

  useEffect(() => {
    if (debouncedValue) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${debouncedValue}&appid=dd67186d5fda0b5940d40327767f0935&units=metric`;
      axios.get(url).then((res) => {
        const data = res.data;
        setCity(data.name);
        setCountry(data.sys.country);
        setTemp(data.main.temp);
        setImgCode(data.weather[0].icon);
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
        <img src={`../../public/images/${imgCode}.png`} alt="" />
        <div>
          <p className="cityname">
            {city} , {country}
          </p>
          <p className="temper">{Math.round(temp * 10) / 10}℃</p>
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
