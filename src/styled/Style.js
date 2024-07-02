import styled from "styled-components";

export const MainWrap = styled.div`
  width: 100%;
  background: #5b9ee0;
  &.on {
    background: #11122c;
    h2 {
      color: #fff;
    }
  }
  padding-bottom: 20%;
  h2 {
    font-size: 40px;
    padding-top: 40px;
    margin-bottom: 40px;
    text-align: center;
    font-weight: 700;
  }

  .cardwrap {
    margin: auto;
    width: 550px;
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
`;

export const InputWrap = styled.form`
  position: relative;
  display: flex;
  width: 500px;
  justify-content: space-between;
  margin: auto;

  input[type="text"] {
    align-items: center;
    width: 500px;
    height: 40px;
    border-radius: 30px;
    text-align: left;
    padding-left: 30px;
    border: none;
    outline: none;
  }

  input::placeholder {
    color: #424f56;
    font-size: 18px;
  }
  button {
    border: none;
    background: none;
    position: absolute;
    font-size: 25px;
    top: 8px;
    right: 20px;
    i {
      color: #424f56;
      cursor: pointer;
    }
  }
`;

export const DayCardWrap = styled.div`
  .editbutton {
    width: 30px;
    height: 30px;
    background: #000;
    position: absolute;
    top: -10px;
    right: -10px;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    z-index: 1000;

    i {
      color: #fff;
      font-weight: 700;
    }

    &:hover {
      background: red;
    }
  }
  .wrap {
    position: relative;
    width: 250px;
    height: 250px;
    border-radius: 30px;
    background: #aedbff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    margin-bottom: 30px;
    &:hover {
      background: #cce8ff;
    }

    .card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .cityname {
        font-weight: 700;
        font-size: 23px;
      }
      .weathericon {
        width: 100px;
        height: 90px;
      }
      .temper {
        font-weight: 700;
        font-size: 25px;
      }
    }
  }
`;

export const NightCardWrap = styled.div`
  .editbutton {
    width: 30px;
    height: 30px;
    background: #fff;
    position: absolute;
    top: -10px;
    right: -10px;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    z-index: 1000;
    cursor: pointer;

    i {
      color: #000;
      font-weight: 700;
    }
    &:hover {
      background: red;
    }
    &:hover i {
      color: #fff;
      cursor: pointer;
    }
  }
  .wrap {
    position: relative;
    width: 250px;
    height: 250px;
    border-radius: 30px;
    background: #414156;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    cursor: pointer;

    &:hover {
      background: #7c7c95;
    }
    .card {
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      .cityname {
        font-weight: 700;
        font-size: 23px;
        color: #fff;
      }
      .weathericon {
        width: 100px;
        height: 100px;
      }
      .temper {
        font-weight: 700;
        font-size: 25px;
        color: #fff;
      }
    }
  }
`;
export const EditBtnWrap = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #28428a;
  cursor: pointer;
  position: relative;
  right: -70%;
  top: -5%;
  line-height: 60px;
  text-align: center;

  &:hover {
    background: red;
  }

  &.on {
    background: #fff;
  }
  &.on:hover {
    background: yellow;
  }

  img {
    width: 40px;
    height: 40px;
    margin-top: 8px;
    color: #000;
  }
`;

export const ClearEditBtnWrap = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #28428a;
  cursor: pointer;
  position: relative;
  right: -70%;
  top: -5%;

  &:hover {
    background: red;
  }

  &.on {
    background: #fff;
  }
  &.on:hover {
    background: yellow;
  }

  img {
    width: 40px;
    height: 40px;
    margin-top: 8px;
    color: #000;
    margin-left: 10px;
  }
`;

export const DetailCardWrap = styled.div`
  margin: auto;
  width: 550px;
  height: 700px;
  background: #aedbff;
  border-radius: 10px;
  z-index: 100;
  position: absolute;
  top: 220px;
  left: 50%;
  transform: translateX(-50%);

  &.active {
    background: #414156;

    i {
      color: #fff;
    }
    .detailWeather {
      background: #d9d9dd;
    }

    .tag {
      border-bottom: 1px solid #fff;
      p {
        color: #fff;

        &.on {
          color: yellow;
          border-bottom: 3px solid yellow;
        }
      }
    }
  }

  .icon {
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 0 20px;
    margin-bottom: 30px;
    i {
      font-size: 30px;
      font-weight: 700;
      cursor: pointer;
    }
  }

  .detailWeather {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eff8ff;
    width: 500px;
    height: 200px;
    margin: auto;
    border-radius: 30px;
    text-align: center;

    img {
      width: 150px;
      height: 150px;
      margin-right: 100px;
    }
    .cityname {
      font-weight: 700;
      font-size: 30px;
    }
    .temper {
      font-weight: 700;
      font-size: 35px;
    }
  }
  .tag {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #000;
    width: 500px;
    text-align: center;
    margin: auto;

    p {
      font-size: 20px;
      font-weight: 700;
      margin-top: 20px;
      width: 250px;
      padding-bottom: 10px;

      &.on {
        color: red;
        border-bottom: 3px solid red;
        z-index: 5;
      }
    }
  }
`;

export const AddDetailWrap = styled.div`
  width: 500px;
  height: 310px;
  background: #eff8ff;
  margin: auto;
  border-radius: 30px;
  margin-top: 20px;
  line-height: 1.3;
  overflow-y: scroll;

  &.active {
    background: #d9d9dd;
  }
  &::-webkit-scrollbar {
    width: 10px;
    height: 5px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  .detail_inner {
    padding: 20px 30px;

    p {
      font-size: 20px;
      span {
        font-weight: 700;
      }
    }
  }
`;

export const HourlyDetail = styled.div`
  width: 500px;
  height: 310px;
  background: #eff8ff;
  margin: auto;
  border-radius: 30px;
  margin-top: 20px;
  line-height: 1.3;
  overflow-y: scroll;

  &.active {
    background: #d9d9dd;
  }
  &::-webkit-scrollbar {
    width: 10px;
    height: 5px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  .detail_inner {
    padding: 0 30px;
    .row {
      &:first-child .date {
        border-top: none;
        padding-top: 20px;
        margin-top: 0;
      }
      .date {
        display: flex;
        align-items: center;
        font-weight: 700;
        font-size: 23px;
        margin-bottom: 20px;
        padding-top: 20px;
        margin-top: 20px;
        border-top: 1px solid #000;

        i {
          margin-right: 10px;
          color: red;
        }
      }
      .timewrap {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .row-time {
          font-weight: 700;
          font-size: 20px;
          margin-right: 230px;
        }

        img {
          width: 50px;
          height: 50px;
          margin-right: 20px;
        }

        .row-temp {
          font-size: 20px;
        }
      }
    }
  }
`;
