import { Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { ReactComponent as User } from "../../assets/icons/user.svg";
import { ReactComponent as Blackheart } from "../../assets/icons/blackheart.svg";
import { ReactComponent as LargeLogo } from "../../assets/icons/largelogo.svg";
import { ReactComponent as Hamburger } from "../../assets/icons/hamburger.svg";
import { ReactComponent as MobileLogo } from "../../assets/icons/phonelogo.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import AppButton, {
  AppButtonClasses,
  AppButtonTypes,
} from "../common/AppButton";
import AppInputWithSearch from "../common/AppInputWithSearch";
const Layout = (): JSX.Element => {
  return (
    <div className="layout-container">
      <div className="header-container">
           <div className="header-mobile">
                  <Hamburger />
                  <MobileLogo />
                  <Search />
           </div>
        <div className="header-main">
          <div className="header-left">
            <div className="header-logo">
              <Logo />
            </div>
            <div className="search-holder">
              <AppInputWithSearch
                clearOnSearch
                placeholder="Upisite pojam..."
                onSearch={(search) => console.log(search)}
              />
            </div>
          </div>
          <div className="header-right">
            <AppButton
              classes={[AppButtonClasses.SIMPLE_BUTTON_BLACKHEART]}
              icon={<Blackheart style={{ marginRight: "5px" }} />}
              text="Omiljeni oglasi"
              onClick={() => {}}
              type={AppButtonTypes.LINK}
            />
            <AppButton
              classes={[AppButtonClasses.SIMPLE_BUTTON_USER]}
              icon={<User style={{ marginRight: "5px" }} />}
              text="Prijavi se"
              onClick={() => {}}
              type={AppButtonTypes.LINK}
            />
            <AppButton
              style={{
                borderRadius: "12px",
                height: "40px",
                width: "138px",
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: "Poppins",
                textAlign: "center",
                padding: "0px",
              }}
              type={AppButtonTypes.PRIMARY}
              text="Predaj oglas"
              onClick={() => console.log("clicked")}
            />
          </div>
        </div>
      </div>
      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <Outlet />
      </div>
      <div className="footer">
        <div className="short-footer">Index Oglasi Copyright © 2021</div>
        <div className="footer-inner">
          <div className="first-column">
            <LargeLogo style={{ marginBottom: "233px" }} />
            <div>Index Oglasi Copyright © 2021</div>
          </div>
          <div className="second-column">
            <div className="row-one">
              <div>
                <div className="title">Trebate pomoc?</div>
                <div className="subtitle">01/549 4478</div>
              </div>
              <div style={{ marginLeft: "63px" }}>
                <div className="title">Radno vrijeme</div>
                <div className="subtitle">Svaki dan 8-24</div>
              </div>
            </div>
            <div className="row-two">
              <div>
                <div className="title">E-mail</div>
                <div className="subtitle">indexoglasi@margon.hr</div>
              </div>
            </div>
          </div>
          <div className="third-column">
            <div className="column-one">
              <div>Uvjeti korištenja</div>
              <div>Oglašavanje</div>
              <div>Upute za korištenje</div>
              <div>FAQ</div>
            </div>
            <div className="column-two">
              <div>Pravila o privatnosti</div>
              <div>Upute za postavljanje videa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
