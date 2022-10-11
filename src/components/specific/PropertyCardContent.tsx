import React from "react";
import { ReactComponent as EmptyHeart } from "../../assets/icons/emptyheart.svg";
import { ReactComponent as FullHeart } from "../../assets/icons/fullredheart.svg";
import formatCurrency, { Currency } from "../../utilities/formatCurrency";
import { formatDate } from "../../utilities/formatDate";

interface PropertyCardContentProps {
  title: string;
  subtitleOne: string;
  subtitleTwo?: string;
  priceEuro: number;
  priceKuna: number;
  isFavourite: boolean;
  handleFavourite: (property: any) => void;
  date: string;
}
const PropertyCardContent = ({
  title,
  subtitleOne,
  subtitleTwo,
  priceEuro,
  priceKuna,
  isFavourite,
  handleFavourite,
  date,
}: PropertyCardContentProps) => {
  return (
    <>
      <div
        style={{
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingTop: "21px",
          height: "152px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          <div className="card-title">{title}</div>
          <div className="card-subtitle-one">{subtitleOne}</div>
          <div className="card-subtitle-two">{subtitleTwo}</div>
          <div className="card-subtitle-price">
            <div className="euro-price">
              &euro; {formatCurrency(priceEuro, Currency.EUR)}
            </div>
            <div className="kuna-price">
              ~{formatCurrency(priceKuna, Currency.KN)} kn
            </div>
          </div>
        </div>
        <div
          style={{
            height: "1px",
            borderTop: "1px solid rgba(0, 0, 0, 0.04)",
            width: "100%",
          }}
        ></div>
      </div>
      <div className="card-footer">
        <div className="card-footer-left">{ formatDate(date, "DD.MM.YYYY.")}</div>
        <div onClick={handleFavourite} className="card-footer-right">
          {isFavourite ? <FullHeart /> : <EmptyHeart />}
        </div>
      </div>
    </>
  );
};
export default PropertyCardContent;
