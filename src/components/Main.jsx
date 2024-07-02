/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import { MainWrap } from "../styled/Style";
import { getWeatherUrl } from "../util/getWeatherUrl";
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
  // input창 focus
  const textRef = useRef(null);
  // 초기값
  const test = ["seoul", "incheon", "dalian", "london"];

  useEffect(() => {
    const InitialData = async () => {
      for (let i = 0; i < test.length; i++) {
        const url = getWeatherUrl("/weather", test[i]);
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

  //input form 태그 관련 코드
  const onSubmit = async (e) => {
    e.preventDefault();
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (keyword.match(koreanRegex)) {
      alert("도시명을 영어로 입력해주세요");
      return;
    }
    setShowDetail(true);
  };

  // 수정, 삭제
  const [editBtn, setEditBtn] = useState(true);
  const onEdit = () => {
    setEditBtn(!editBtn);
  };
  const onDel = (id) => {
    setWeatherData(weatherData.filter((item) => id !== item.id));
  };

  //즐겨찾기 추가
  const addFav = () => {
    // 즐겨찾기에 이미 포함되어있는지 확인
    const isAlreadyFav = weatherData.some(
      (item) => item.city.toLowerCase() === keyword.toLowerCase()
    );
    if (isAlreadyFav) {
      alert("이미 즐겨찾기에 등록되어 있습니다.");
    } else {
      const url = getWeatherUrl("/weather", keyword);
      axios.get(url).then((res) => {
        const data = res.data;
        setWeatherData([
          ...weatherData,
          {
            city: keyword,
            country: data.sys.country,
            temp: data.main.temp,
            imgCode: data.weather[0].icon,
            loading: true,
          },
        ]);
      });
      setShowDetail(false);
    }
  };

  //클릭 시 디테일창 오픈
  const [showDetail, setShowDetail] = useState(false);
  const showDatailPage = (clickedItem) => {
    setShowDetail(true);
    setKeyword(clickedItem.city); // 선택한 값의 city값만 출력
  };

  //디테일창 닫기
  const [detailClose, setDetailClose] = useState(false);
  const closeDetail = () => {
    setDetailClose(!detailClose);
    setShowDetail(!showDetail);
    setKeyword("");
  };

  return (
    <MainWrap className={hours >= 18 || hours < 6 ? "on" : ""}>
      <h2>What's the weather like today?</h2>
      <SearchInput
        onSearch={onSearch}
        keyword={keyword}
        onSubmit={onSubmit}
        textRef={textRef}
        setKeyword={setKeyword}
      />
      <div className="cardwrap">
        {weatherData.map((item, index) => {
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
          closeDetail={closeDetail}
          hours={hours}
          addFav={addFav}
        />
      )}
    </MainWrap>
  );
};

export default Main;
