/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import { MainWrap } from "../styled/Style";
import SearchInput from "./SearchInput";
import EditBtn from "./EditBtn";
import axios from "axios";
import DayCard from "./DayCard";
import NightCard from "./NightCard";
import DetailCard from "./DetailCard";

const Main = () => {
  // 검색한 도시 정보
  const [keyword, setKeyword] = useState("");

  // 날씨 정보
  const [weatherData, setWeatherData] = useState([]);

  // const [initalizeData] = useState(["busan", "seoul", "lon", "london"]);

  // input창 focus
  const textRef = useRef(null);
  const [editBtn, setEditBtn] = useState(true);
  const test = ["busan", "seoul", "lon", "london"];

  useEffect(() => {
    console.log(test);
    const InitialData = async () => {
      for (let i = 0; i < test.length; i++) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${test[i]}&appid=dd67186d5fda0b5940d40327767f0935&units=metric`;
        //'변수 = await 값' 인 경우 그 값이 변수에 저장
        const res = await axios.get(url);
        const data = res.data;
        setWeatherData((prevWeatherData) => [
          ...prevWeatherData,
          {
            id: data.id,
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            imgCode: data.weather[0].icon,
            loading: false,
          },
        ]);
      }
    };

    InitialData();
  }, []);

  // 시간에 따라 컴포넌트 변경
  const now = new Date();
  const hours = now.getHours();

  // input창 검색
  const onSearch = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  //input form 태그이기 때문에  e.preventDefault(); 처리
  const onSubmit = (e) => {
    e.preventDefault();
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (keyword.match(koreanRegex)) {
      alert("도시명을 영어로 입력해주세요");
      return;
    }

    // 한글이 포함되지 않은 경우, API 호출
    // setWeatherData(keyword);
    textRef.current.focus();

    // DetailCard를 보여주도록 설정
    setShowDetail(true);
  };

  // 수정버튼, 삭제
  const onEdit = () => {
    setEditBtn(!editBtn);
  };
  const onDel = (id) => {
    setWeatherData(weatherData.filter((item) => id !== item.id));
  };

  //클릭 시 디테일창 페이지
  const [showDetail, setShowDetail] = useState(false);
  const showDatailPage = () => {
    setShowDetail(!showDetail);
  };

  //디테일창 닫기
  const [detailClose, setDetailClose] = useState(false);
  const closeDetail = () => {
    setDetailClose(!detailClose);
    setShowDetail(!showDetail);
  };
  // 즐겨찾기 추가
  // const [fav, setFav] = useState(false);
  // const addFav = () => {
  //   if (weatherData.includes(keyword) === true) {
  //     setWeatherData([...weatherData, keyword]);
  //     setFav(true);
  //   } else {
  //     alert("이미 즐겨찾기에 등록되어 있습니다.");
  //   }
  //   setShowDetail(false);
  // };

  const searchData = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${keyword}&appid=dd67186d5fda0b5940d40327767f0935&units=metric`;
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        setWeatherData([
          ...weatherData,
          {
            id: data.id,
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            imgCode: data.weather[0].icon,
            loading: false,
          },
        ]);

        setKeyword("");
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      });
  };

  // const enterData = (e) => {
  //   if (e.keyCode === 13) {
  //     searchData(e);
  //   }
  // };

  return (
    <MainWrap className={hours >= 18 || hours < 6 ? "on" : ""}>
      <h2 className={hours >= 18 || hours < 6 ? "on" : ""}>
        What's the weather like today?
      </h2>
      <SearchInput
        onSearch={onSearch}
        keyword={keyword}
        onSubmit={onSubmit}
        textRef={textRef}
        setKeyword={setKeyword}
        searchData={searchData}
      />
      <div className="cardwrap">
        {Array.isArray(weatherData) &&
          weatherData.map((item, index) => {
            return hours >= 18 || hours < 6 ? (
              <NightCard
                key={index}
                item={item}
                editBtn={editBtn}
                onDel={onDel}
                showDatailPage={showDatailPage}
              />
            ) : (
              <DayCard
                key={index}
                item={item}
                editBtn={editBtn}
                onDel={onDel}
                showDatailPage={showDatailPage}
              />
            );
          })}
      </div>

      <EditBtn hours={hours} onEdit={onEdit} editBtn={editBtn} />
      {showDetail && (
        <DetailCard
          keyword={keyword}
          searchData={searchData}
          closeDetail={closeDetail}
          setWeatherData={setWeatherData}
        />
      )}
    </MainWrap>
  );
};

export default Main;
