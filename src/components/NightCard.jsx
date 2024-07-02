import { NightCardWrap } from "../styled/Style";

const NightCard = ({ item, editBtn, onDel, showDatailPage }) => {
  const { id, city, country, temp, imgCode } = item;
  return (
    <NightCardWrap>
      <div className="wrap">
        {!editBtn && (
          <div className="editbutton" onClick={() => onDel(id)}>
            <i className="xi-minus"></i>
          </div>
        )}
        <div className="card" onClick={() => showDatailPage(item)}>
          <p className="cityname">
            {city} , {country}
          </p>
          <img
            className="weathericon"
            src={`../../public/images/${imgCode}.png`}
            alt="weathericon"
          />
          <p className="temper">{Math.round(temp * 10) / 10}℃</p>
        </div>
      </div>
    </NightCardWrap>
  );
};

export default NightCard;
