import axios from "axios";
import { HourlyDetail } from "../styled/Style";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const Hourly = ({ keyword, hours }) => {
  const [forecast, setForecast] = useState([]);
  const debouncedValue = useDebounce(keyword, 1000);
  let temp_date = "";

  useEffect(() => {
    if (debouncedValue) {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${debouncedValue}&appid=dd67186d5fda0b5940d40327767f0935&units=metric`;
      axios.get(url)?.then((res) => {
        const data = res.data;
        setForecast([...data.list]);
      });
    }
  }, [debouncedValue]);

  return (
    <HourlyDetail className={hours >= 18 || hours < 6 ? "active" : ""}>
      <div className="detail_inner">
        {debouncedValue &&
          forecast.map((item, idx) => {
            // 날짜가 바뀌면 새로운 날짜로 보여주기
            const currentDate = item.dt_txt.substr(0, 10);
            if (currentDate !== temp_date) {
              // 현재 날짜로 갱신
              temp_date = currentDate;
              return (
                <div className="row" key={idx}>
                  <div className="date">
                    <i className="xi-calendar"></i>
                    <h3>{currentDate}</h3>
                  </div>

                  <div className="timewrap">
                    <span className="row-time">
                      {item.dt_txt.substr(11, 5)}
                    </span>
                    <img
                      className="info-weather-icon"
                      src={`../../public/images/${item.weather[0].icon}.png`}
                      alt="weather-icon"
                    />
                    <span className="row-temp">
                      {Math.round(item.main.temp)}℃
                    </span>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="row" key={idx}>
                  <div className="timewrap">
                    <span className="row-time">
                      {item.dt_txt.substr(11, 5)}
                    </span>
                    <img
                      className="info-weather-icon"
                      src={`../../public/images/${item.weather[0].icon}.png`}
                      alt="weather-icon"
                    />
                    <span className="row-temp">
                      {Math.round(item.main.temp)}℃
                    </span>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </HourlyDetail>
  );
};

export default Hourly;
