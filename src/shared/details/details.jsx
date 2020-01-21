/* eslint-disable react/prop-types */
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
            if (typeof information[item] === 'string') {
              return (
                <li key={information[item]} className="list-group-item-up">
                  <span className="term">{item}</span>
                  <span className="term-item">{information[item]}</span>
                </li>
              );
            }
            if (information[item].length === undefined) {
              return (
                <li key={item.id} className="list-group-item-up">
                  <span className="term">{item}</span>
                  <span className="term-item list-group-item ">
                    <Link to={`/{lable}/id=${item.id}`} className="a-item">
                      {`${item.name}.`}
                    </Link>
                  </span>
                </li>
              );
            }
            return (
              <li key={name} className="list-group-item-up">
                <span className="term">{item}</span>
                <ul className="list-group list-group-flush">
                  {information[item].map((elementOfItem) => {
                    return (
                      <li key={elementOfItem[name]} className="list-group-item">
                        <Link
                          to={`/${lable}/id=${elementOfItem.id}`}
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
