import { RadioChangeEvent } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import AppBreadcrumbs from "../components/common/AppBreadcrumbs";
import AppRadioButtonGroup, {
  AppRadioButtonGroupClasses,
} from "../components/common/AppRadioButtonGroup";
import { AppSelect } from "../components/common/AppSelect";
import AppSimpleInput, {
  AppSimpleInputClasses,
} from "../components/common/AppSimpleInput";
import { PageLinks, Pages } from "../types/general";
import { ReactComponent as SquareMeterIcon } from "../assets/icons/sqm.svg";
import { ReactComponent as EuroIcon } from "../assets/icons/eurocurrency.svg";
import { ReactComponent as RedChevron } from "../assets/icons/redchevron.svg";
import { ReactComponent as Chevron } from "../assets/icons/chevron.svg";
import AppButton, { AppButtonTypes } from "../components/common/AppButton";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProperties, Property, setIsFavorite } from "../store/properties";
import AppCard from "../components/common/AppCard";
import setTextLimit from "../utilities/setTextLimit";
import PropertyCardContent from "../components/specific/PropertyCardContent";
import { config } from "../config";

enum FilterType {
  BUYING = "Kupujem",
  RENTING = "Iznajmljujem",
}

export default function Properties() {
  const ITEMS_PER_PAGE = 8;
  const numberOfRooms = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [filteredPropeties, setFilteredProperties] = useState<Property[]>([]);
  const [radioButtonValue, setRadioButtonValue] = useState(FilterType.BUYING);
  const [filteredAttempts, setFilteredAttempts] = useState(0);
  const [typeOfProperty, setTypeOfProperty] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState(0);
  const [errorAreaNotNumber, setErrorAreaNotNumber] = useState("");
  const [price, setPrice] = useState(0);
  const [roomsFrom, setRoomsFrom] = useState("");
  const [roomsTo, setRoomsTo] = useState("");
  const [errorPriceNotNumber, setErrorPriceNotNumber] = useState("");
  const [visibleItems, setVisibleItems] = useState(1);
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.properties);
  const onRadioButtonChange = useCallback((e: RadioChangeEvent) => {
    setRadioButtonValue(e.target.value);
  }, []);
  const incrementVisibleItems = useCallback(() => {
    setVisibleItems((prev) => prev + 1);
  }, []);
  const handleTypeOfProperty = useCallback((value: string) => {
    if (value === "kuca") {
      setTypeOfProperty("houses");
    } else if (value === "stan") {
      setTypeOfProperty("flats");
    }
  }, []);
  const handleRoomsFrom = useCallback((value: string) => {
    setRoomsFrom(value);
  }, []);
  const handleRoomsTo = useCallback((value: string) => {
    setRoomsTo(value);
  }, []);
  const handleChangeArea = useCallback((e: any) => {
    if (isNaN(e.target.value)) {
      setErrorAreaNotNumber("Area must be a number");
    } else {
      setArea(e.target.value);
      setErrorAreaNotNumber("");
    }
    if (e.target.value === "") {
      setErrorAreaNotNumber("");
    }
  }, []);
  const filterPropeties = useCallback(() => {
    let filterProperties = [];
    setFilteredAttempts((prev) => prev + 1);
    filterProperties = properties.data.filter((property) => {
      if (typeOfProperty === "") {
        return property;
      } else {
        return property.category === typeOfProperty;
      }
    });
    filterProperties = filterProperties.filter((property) => {
      if (location === "") {
        return property;
      } else {
        return property.title.toLowerCase().includes(location.toLowerCase());
      }
    });
    filterProperties = filterProperties.filter((property) => {
      if (area === 0) {
        return property;
      } else {
        return property.summary.area >= area;
      }
    });

    // Filter by price
    filterProperties = filterProperties.filter((property) => {
      if (price === 0) {
        return property;
      } else {
        return property.price < price;
      }
    });

    // Filter by number of rooms
    filterProperties = filterProperties.filter((property) => {
      if (roomsFrom === "" && roomsTo === "") {
        return property;
      } else if (roomsFrom === "" && roomsTo !== "") {
        return property.summary.numberOfRooms <= parseInt(roomsTo);
      } else if (roomsFrom !== "" && roomsTo === "") {
        return property.summary.numberOfRooms >= parseInt(roomsFrom);
      } else {
        return (
          property.summary.numberOfRooms >= parseInt(roomsFrom) &&
          property.summary.numberOfRooms <= parseInt(roomsTo)
        );
      }
    });

    setFilteredProperties(filterProperties);
  }, [
    location,
    typeOfProperty,
    properties.data,
    area,
    price,
    roomsFrom,
    roomsTo,
  ]);

  const handleChangePrice = useCallback((e: any) => {
    if (isNaN(e.target.value)) {
      setErrorPriceNotNumber("Price must be a number");
    } else {
      setPrice(e.target.value);
      setErrorPriceNotNumber("");
    }
    if (e.target.value === "") {
      setErrorPriceNotNumber("");
    }
  }, []);

  const handleChangeLocation = useCallback((e: any) => {
    setLocation(e.target.value);
  }, []);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  return (
    <div className="properties-container">
      <div className="properties__breadcrumbs--container">
        <AppBreadcrumbs
          backItem={Pages.BACK}
          items={[Pages.HOME, Pages.PROPERTIES]}
          links={[PageLinks.HOME, PageLinks.PROPERTIES]}
        />
      </div>
      <div className="properties__filter--container">
        <div className="properties__filter--radio">
          <AppRadioButtonGroup
            classes={[AppRadioButtonGroupClasses.SIMPLE_TWO_RADIOS]}
            options={Object.values(FilterType)}
            initialValue={radioButtonValue}
            onChange={onRadioButtonChange}
          />
        </div>
        <div className="properties__filter--fields">
          <div className="properties__filter--item">
            <AppSelect
              options={["Kuca", "Stan"]}
              placeholder={"Tip nekretnine"}
              onChange={handleTypeOfProperty}
            />
          </div>
          <div className="properties__filter--item">
            <AppSimpleInput
              classes={[AppSimpleInputClasses.SIMPLE_INPUT]}
              placeholder={"Lokacija"}
              onChange={handleChangeLocation}
            />
          </div>
          <div className="properties__filter--item">
            <AppSimpleInput
              classes={[AppSimpleInputClasses.SIMPLE_INPUT]}
              onChange={handleChangeArea}
              placeholder={"Kvadratura od"}
              suffix={<SquareMeterIcon />}
              error={errorAreaNotNumber}
            />
          </div>
          <div className="properties__filter--item">
            <AppSimpleInput
              classes={[AppSimpleInputClasses.SIMPLE_INPUT]}
              placeholder={"Cijena do"}
              suffix={<EuroIcon />}
              onChange={handleChangePrice}
              error={errorPriceNotNumber}
            />
          </div>
          <div className="properties__filter--item">
            <div className="two-items-holder">
              <AppSelect
                options={numberOfRooms}
                placeholder={"Broj soba od"}
                onChange={handleRoomsFrom}
              />
              <div className="vertical-divider"></div>
              <AppSelect
                options={numberOfRooms}
                placeholder={"Broj soba do"}
                onChange={handleRoomsTo}
              />
            </div>
          </div>
          <div className="properties__filter--item">
            <AppButton
              style={{ width: "100%", height: "54px", borderRadius: "5px" }}
              type={AppButtonTypes.PRIMARY}
              text={"TRAZI"}
              onClick={filterPropeties}
            />
          </div>
        </div>
      </div>
      <div className="additional-search">
        Detaljna Pretraga <Chevron style={{ marginLeft: "15px" }} />{" "}
      </div>
      <div className="properties__cards--holder">
        {properties &&
          properties.data.length > 0 &&
          filteredPropeties.length === 0 &&
          !filteredAttempts &&
          properties.data.map((property: Property, index: any) => {
            return (
              <React.Fragment key={index}>
                {index < visibleItems * ITEMS_PER_PAGE && (
                  <div className="card-holder" key={index}>
                    <AppCard imageAsset={property.imageIds}>
                      <PropertyCardContent
                        title={setTextLimit(property.title, 23)}
                        subtitleOne={`${setTextLimit(
                          property.summary.area,
                          25
                        )} m2`}
                        priceEuro={
                          property.priceCurrency === "EUR"
                            ? property.price
                            : property.price / config.EX_RATE_KUNA
                        }
                        priceKuna={
                          property.priceCurrency === "EUR"
                            ? property.price * config.EX_RATE_KUNA
                            : property.price
                        }
                        handleFavourite={() =>
                          dispatch(setIsFavorite(property.id))
                        }
                        isFavourite={property.isFavorite}
                      />
                    </AppCard>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        {filteredPropeties.length > 0 &&
          filteredPropeties.map((property: Property, index: any) => {
            return (
              <React.Fragment key={index}>
                {index < visibleItems * ITEMS_PER_PAGE && (
                  <div className="card-holder" key={index}>
                    <AppCard imageAsset={property.imageIds}>
                      <PropertyCardContent
                        title={setTextLimit(property.title, 23)}
                        subtitleOne={`${setTextLimit(
                          property.summary.area,
                          25
                        )} m2`}
                        priceEuro={
                          property.priceCurrency === "EUR"
                            ? property.price
                            : property.price / 7.35
                        }
                        priceKuna={
                          property.priceCurrency === "EUR"
                            ? property.price * 7.35
                            : property.price
                        }
                        handleFavourite={() =>
                          dispatch(setIsFavorite(property.id))
                        }
                        isFavourite={property.isFavorite}
                      />
                    </AppCard>
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>
      <div onClick={incrementVisibleItems} className="see-more">
        Vidi vise <RedChevron style={{ marginLeft: "8px" }} />
      </div>
    </div>
  );
}
