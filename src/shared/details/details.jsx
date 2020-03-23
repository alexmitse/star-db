import React from 'react';
import { Link } from 'react-router-dom';

import './details.css';

export default function PersonDetails({ details }) {
  const renderDetails = (obj) => {
    const { lable, id, name, ...detailObj } = obj;
    let lableImageRequest = lable;
    if (lable === 'people') {
      lableImageRequest = 'characters';
    }
    const detailInformations = (information) => {
      return (
        <ul className="ul-group-information">
          {Object.keys(information).map((item) => {
            switch (Object.prototype.toString.call(information[item])) {
              case '[object Object]':
                return (
                  <li key={information[item]} className="list-group-item-up">
                    <span className="term">{item}</span>
                    <Link
                      to={`/${item}/id=${information[item].id}`}
                      className="a-item"
                    >
                      {`${information[item].name}.`}
                    </Link>
                  </li>
                );
              case '[object String]':
                return (
                  <li key={information[item]} className="list-group-item-up">
                    <span className="term">{item}</span>
                    <span className="term-item">{information[item]}</span>
                  </li>
                );
              case '[object Array]':
                return (
                  <li key={name} className="list-group-item-up">
                    <span className="term">{item}</span>
                    <ul className="list-group list-group-flush">
                      {information[item].map((elementOfItem) => {
                        return (
                          <li
                            key={elementOfItem[name]}
                            className="list-group-item"
                          >
                            <Link
                              to={`/${item}/id=${elementOfItem.id}`}
                              className="a-item"
                            >
                              {`${elementOfItem.name}. `}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              default:
                return false;
            }
          })}
        </ul>
      );
    };
    return (
      <div className="container-details">
        <div className="image-description">
          <img
            className="item-image"
            src={`https://starwars-visualguide.com/assets/img/${lableImageRequest}/${id}.jpg`}
            alt="character"
          />
          <div className="descripton">
            <h4 className="name">{name}</h4>
          </div>
        </div>
        <div className="item-information">{detailInformations(detailObj)}</div>
      </div>
    );
  };
  return renderDetails(details);
}
