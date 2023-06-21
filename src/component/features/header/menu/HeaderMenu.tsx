import React from "react";
import { MenuData } from "./MenuData";
import { Link } from "react-router-dom";

// TODO:　Googleログインを使用しているユーザーはパスワードリセットページを表示させないようにする。
const HeaderMenu = () => {
  const Menu = MenuData.map((value, key) => {
    return (
      <li key={key}>
        <Link to={value.link}>
          <div>{value.title}</div>
        </Link>
      </li>
    );
  });

  const contents = (
    <div>
      <div>
        <p>設定</p>
      </div>
      <ul>{Menu}</ul>
    </div>
  );
  return contents;
};

export default HeaderMenu;
