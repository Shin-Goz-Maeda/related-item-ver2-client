import React, { useState } from "react";
import { AuthContext } from "../../../constants/loginUser";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import HeaderMenu from "./menu/HeaderMenu";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

const HeaderComponent = () => {
  const { userLoggedInState } = useContext(AuthContext);
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const navigate = useNavigate();

  // ログアウト処理
  const handleLogout = () => {
    userLoggedInState(false, null);
    signOut(auth);
    navigate("/signInPage");
  };

  const contents = (
    <div>
      <div>
        <MenuIcon onClick={() => setDrawerOpened(true)} />
        <Drawer
          anchor={"left"}
          open={drawerOpened}
          onClose={() => setDrawerOpened(false)}
        >
          <HeaderMenu />
        </Drawer>
      </div>
      <div>
        <Link to="/">
          <img src="/img/Logo.jpeg" alt="ロゴ" />
        </Link>
      </div>
      <div>
        <Button>
          <Link to="login" onClick={handleLogout}>
            ログアウト
          </Link>
        </Button>
      </div>
    </div>
  );
  return contents;
};

export default HeaderComponent;
