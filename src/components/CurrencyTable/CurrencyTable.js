import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableSchedule from "../TableSchedule/TableSchedule";
import "./CurrencyTable.css";

export default function CurrencyTable() {
  const [data, setData] = useState(null);
  const [oneTime, setOneTime] = useState(true);
  const [dates, setDates] = useState([]);
  const [indexPlus, setIndex] = useState(0);
  const [page, setPage] = useState(1);

  const getData = async (page) => {
    let response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    );
    let data = response.json();
    return data;
  };

  useEffect(() => {
    if (oneTime) {
      getData(page)
        .then((res) => {
          setData(null);
          setData(res);
        })
        .catch((err) => alert(err));
      setOneTime(false);
    }
  }, []);

  const sortHandle = (table) => {
    let th = document.querySelectorAll("th");
    let td = document.querySelectorAll("td");
    let data = [];

    for (let i = 0; i < td.length; i += 9) {
      data.push({
        index: td[i].innerHTML,
        coin: td[i + 1].innerHTML,
        price: td[i + 2].innerHTML,
        h_1: td[i + 3].innerHTML,
        h_24: td[i + 4].innerHTML,
        d_7: td[i + 5].innerHTML,
        volume: td[i + 6].innerHTML,
        mkt_cap: td[i + 7].innerHTML,
        last_7_d: td[i + 8].innerHTML,
      });
    }

    if (table === 0) {
      if (th[table].innerHTML === "# ˅") {
        th[table].innerHTML = "# ˄";
        data.sort((a, b) => (Number(a.index) > Number(b.index) ? -1 : 1));
      } else {
        th[table].innerHTML = "# ˅";
        data.sort((a, b) => (Number(a.index) > Number(b.index) ? 1 : -1));
      }
    } else if (table === 1) {
      if (th[table].innerHTML === "Coin ˅") {
        th[table].innerHTML = "Coin ˄";
        data.sort((a, b) =>
          a.coin
            .slice(a.coin.indexOf("<p>") + 3, a.coin.indexOf("</p>"))
            .toLocaleLowerCase() >
          b.coin
            .slice(b.coin.indexOf("<p>") + 3, b.coin.indexOf("</p>"))
            .toLocaleLowerCase()
            ? -1
            : 1
        );
      } else {
        th[table].innerHTML = "Coin ˅";
        data.sort((a, b) =>
          a.coin
            .slice(a.coin.indexOf("<p>") + 3, a.coin.indexOf("</p>"))
            .toLocaleLowerCase() >
          b.coin
            .slice(b.coin.indexOf("<p>") + 3, b.coin.indexOf("</p>"))
            .toLocaleLowerCase()
            ? 1
            : -1
        );
      }
    } else if (table === 2) {
      if (th[table].innerHTML === "Price ˅") {
        th[table].innerHTML = "Price ˄";
        data.sort((a, b) =>
          Number(a.price.slice(1)) > Number(b.price.slice(1)) ? -1 : 1
        );
      } else {
        th[table].innerHTML = "Price ˅";
        data.sort((a, b) =>
          Number(a.price.slice(1)) > Number(b.price.slice(1)) ? 1 : -1
        );
      }
    } else if (table === 3) {
      if (th[table].innerHTML === "1h ˅") {
        th[table].innerHTML = "1h ˄";
        data.sort((a, b) =>
          Number(a.h_1.slice(a.h_1.indexOf(">") + 1, a.h_1.indexOf("</"))) >
          Number(b.h_1.slice(b.h_1.indexOf(">") + 1, b.h_1.indexOf("</")))
            ? -1
            : 1
        );
      } else {
        th[table].innerHTML = "1h ˅";
        data.sort((a, b) =>
          Number(a.h_1.slice(a.h_1.indexOf(">") + 1, a.h_1.indexOf("</"))) >
          Number(b.h_1.slice(b.h_1.indexOf(">") + 1, b.h_1.indexOf("</")))
            ? 1
            : -1
        );
      }
    } else if (table === 4) {
      if (th[table].innerHTML === "24h ˅") {
        th[table].innerHTML = "24h ˄";
        data.sort((a, b) =>
          Number(a.h_24.slice(a.h_24.indexOf(">") + 1, a.h_24.indexOf("</"))) >
          Number(b.h_24.slice(b.h_24.indexOf(">") + 1, b.h_24.indexOf("</")))
            ? -1
            : 1
        );
      } else {
        th[table].innerHTML = "24h ˅";
        data.sort((a, b) =>
          Number(a.h_24.slice(a.h_24.indexOf(">") + 1, a.h_24.indexOf("</"))) >
          Number(b.h_24.slice(b.h_24.indexOf(">") + 1, b.h_24.indexOf("</")))
            ? 1
            : -1
        );
      }
    } else if (table === 5) {
      if (th[table].innerHTML === "7d ˅") {
        th[table].innerHTML = "7d ˄";
        data.sort((a, b) =>
          Number(a.d_7.slice(a.d_7.indexOf(">") + 1, a.d_7.indexOf("</"))) >
          Number(b.d_7.slice(b.d_7.indexOf(">") + 1, b.d_7.indexOf("</")))
            ? -1
            : 1
        );
      } else {
        th[table].innerHTML = "7d ˅";
        data.sort((a, b) =>
          Number(a.d_7.slice(a.d_7.indexOf(">") + 1, a.d_7.indexOf("</"))) >
          Number(b.d_7.slice(b.d_7.indexOf(">") + 1, b.d_7.indexOf("</")))
            ? 1
            : -1
        );
      }
    } else if (table === 6) {
      if (th[table].innerHTML === "24h Volume ˅") {
        th[table].innerHTML = "24h Volume ˄";
        data.sort((a, b) =>
          Number(a.volume.slice(1)) > Number(b.volume.slice(1)) ? -1 : 1
        );
      } else {
        th[table].innerHTML = "24h Volume ˅";
        data.sort((a, b) =>
          Number(a.volume.slice(1)) > Number(b.volume.slice(1)) ? 1 : -1
        );
      }
    } else if (table === 7) {
      if (th[table].innerHTML === "Mkt Cap ˅") {
        th[table].innerHTML = "Mkt Cap ˄";
        data.sort((a, b) =>
          Number(a.mkt_cap.slice(1)) > Number(b.mkt_cap.slice(1)) ? -1 : 1
        );
      } else {
        th[table].innerHTML = "Mkt Cap ˅";
        data.sort((a, b) =>
          Number(a.mkt_cap.slice(1)) > Number(b.mkt_cap.slice(1)) ? 1 : -1
        );
      }
    }

    let j = 0;
    for (let i = 0; i < td.length; i += 9) {
      td[i].innerHTML = data[j].index;
      td[i + 1].innerHTML = data[j].coin;
      td[i + 2].innerHTML = data[j].price;
      td[i + 3].innerHTML = data[j].h_1;
      td[i + 4].innerHTML = data[j].h_24;
      td[i + 5].innerHTML = data[j].d_7;
      td[i + 6].innerHTML = data[j].volume;
      td[i + 7].innerHTML = data[j].mkt_cap;
      td[i + 8].innerHTML = data[j].last_7_d;
      j++;
    }
  };

  const selectPage = (event) => {
    let pageNum = event.target.innerHTML;

    switch (pageNum) {
      case "1":
        setIndex(0);
        break;
      case "2":
        setIndex(100);
        break;
      case "3":
        setIndex(200);
        break;
      case "4":
        setIndex(300);
        break;
      case "5":
        setIndex(400);
        break;
    }

    setPage(event.target.innerHTML);
    setData(null);
    getData(pageNum)
      .then((res) => {
        setData(res);
      })
      .catch((err) => alert(err));
  };

  if (data === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="currency-table">
      <div className="pages top">
        <div className="pages-buttons">
          <div onClick={selectPage}>
            <button className={indexPlus === 0 ? "selected-page" : ""}>
              1
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 100 ? "selected-page" : ""}>
              2
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 200 ? "selected-page" : ""}>
              3
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 300 ? "selected-page" : ""}>
              4
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 400 ? "selected-page" : ""}>
              5
            </button>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th
              onClick={() => {
                sortHandle(0);
              }}
            >
              # ˅
            </th>
            <th
              onClick={() => {
                sortHandle(1);
              }}
            >
              Coin ˅
            </th>
            <th
              onClick={() => {
                sortHandle(2);
              }}
            >
              Price ˅
            </th>
            <th
              onClick={() => {
                sortHandle(3);
              }}
            >
              1h ˅
            </th>
            <th
              onClick={() => {
                sortHandle(4);
              }}
            >
              24h ˅
            </th>
            <th
              onClick={() => {
                sortHandle(5);
              }}
            >
              7d ˅
            </th>
            <th
              onClick={() => {
                sortHandle(6);
              }}
            >
              24h Volume ˅
            </th>
            <th
              onClick={() => {
                sortHandle(7);
              }}
            >
              Mkt Cap ˅
            </th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr>
                <td className="index">{index + 1 + indexPlus}</td>
                <td className="td-coin">
                  <Link to={`/${item.id}`}>
                    <img className="table-image" src={item.image} />
                  </Link>
                  <p>{item.name}</p>
                  <p className="table-symbol">{item.symbol.toUpperCase()}</p>
                </td>
                <td>${item.current_price}</td>
                <td>
                  <p
                    className={
                      item.price_change_percentage_1h_in_currency > 0
                        ? "green-td"
                        : "red-td"
                    }
                  >
                    {item.price_change_percentage_1h_in_currency === null
                      ? item.price_change_percentage_1h_in_currency
                      : item.price_change_percentage_1h_in_currency.toFixed(1)}
                  </p>
                </td>
                <td>
                  <p
                    className={
                      item.price_change_percentage_24h_in_currency > 0
                        ? "green-td"
                        : "red-td"
                    }
                  >
                    {item.price_change_percentage_24h_in_currency === null
                      ? item.price_change_percentage_24h_in_currency
                      : item.price_change_percentage_24h_in_currency.toFixed(1)}
                  </p>
                </td>
                <td>
                  <p
                    className={
                      item.price_change_percentage_7d_in_currency > 0
                        ? "green-td"
                        : "red-td"
                    }
                  >
                    {item.price_change_percentage_7d_in_currency === null
                      ? item.price_change_percentage_7d_in_currency
                      : item.price_change_percentage_7d_in_currency.toFixed(1)}
                  </p>
                </td>
                <td>${item.total_volume}</td>
                <td>${item.market_cap}</td>
                <td>
                  <div className="td-schedule">
                    <TableSchedule
                      price={item.sparkline_in_7d}
                      date={item.last_updated}
                      id={item.id}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pages bottom">
        <div className="pages-buttons">
          <div onClick={selectPage}>
            <button className={indexPlus === 0 ? "selected-page" : ""}>
              1
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 100 ? "selected-page" : ""}>
              2
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 200 ? "selected-page" : ""}>
              3
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 300 ? "selected-page" : ""}>
              4
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 400 ? "selected-page" : ""}>
              5
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
