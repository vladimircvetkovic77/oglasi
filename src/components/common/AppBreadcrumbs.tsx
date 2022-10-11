import React from "react";
import { ReactComponent as ChevronLeft } from "../../assets/icons/chevronleft.svg";
import { useNavigate } from "react-router-dom";

interface AppBreadcrumbsProps {
  items: string[];
  links: string[];
  backItem: string;
}

const AppBreadcrumbs = ({ items, links, backItem }: AppBreadcrumbsProps) => {
  const navigate = useNavigate();
  return (
    <div className="appbreadcrumbs-container">
      <div className="chevron">
        <ChevronLeft onClick={() => navigate(-1)} />
      </div>
      <div onClick={() => navigate(-1)} className="back-item">
        {backItem}
      </div>
      <div className="vertical-divider"></div>
      {items.map((item, index) => {
        return (
          <div key={index} className="breadcrumbs-item">
            <div
              className={`item ${index === items.length - 1 ? `active` : ``}`}
              onClick={() => navigate(links[index])}
            >
              {item}
            </div>
            {index !== items.length - 1 && (
              <div className="point-divider"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default AppBreadcrumbs;
