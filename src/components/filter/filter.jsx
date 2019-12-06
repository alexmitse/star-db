/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-else-return */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './filter.css';

export default function Filter({ data, onSetObj }) {
  const [objFromServer, setObjFromServer] = useState({});
  const newObj = {};
  useEffect(() => {
    data.forEach((item) => {
      const objNextProperty = item[Object.keys(item)];
      switch (objNextProperty.type) {
        case 'checkbox':
          newObj[objNextProperty.type] = {};
          newObj[objNextProperty.type][[...Object.keys(item)]] = {};
          objNextProperty.dataList.map((el) => {
            newObj[objNextProperty.type][[...Object.keys(item)]][el] = false;
            return newObj[objNextProperty.type][[...Object.keys(item)]][el];
          });
          break;
        case 'list':
          newObj[objNextProperty.type] = {};
          newObj[objNextProperty.type][[...Object.keys(item)]] = [
            ...objNextProperty.dataList,
          ];

          break;
        case 'number':
          newObj[objNextProperty.type] = {};
          newObj[objNextProperty.type][[...Object.keys(item)]] = {
            from: objNextProperty.dataList[0],
            to: objNextProperty.dataList[1],
          };
          break;

        default:
          break;
      }
    });
    setObjFromServer(newObj);
  }, []);

  const obj = {};
  function handlerForm(e) {
    const options = e.target.querySelectorAll('option');
    for (let i = 0; i < options.length; i += 1) {
      if (options[i].selected) {
        Object.keys(objFromServer).forEach((item) => {
          if (item === 'list') {
            Object.keys(objFromServer[item]).forEach((el) => {
              objFromServer[item][el] = [e.target.value];
            });
          }
        });
      }
    }
    if (e.target.checked) {
      if (objFromServer[e.target.type][e.target.value.split('_')[0]]) {
        objFromServer[e.target.type][e.target.value.split('_')[0]][
          e.target.value
        ] = e.target.checked;
      }
    }
    if (!e.target.checked) {
      if (e.target.type === 'checkbox')
        if (objFromServer[e.target.type][e.target.value.split('_')[0]]) {
          objFromServer[e.target.type][e.target.value.split('_')[0]][
            e.target.value
          ] = false;
        }
    }
    if (
      +e.target.value >= +e.target.min &&
      +e.target.value <= +e.target.max &&
      e.target.value !== ''
    ) {
      if (e.target.name === 'from') {
        Object.keys(objFromServer).forEach((item) => {
          if (item === 'number') {
            Object.keys(objFromServer[item]).forEach((el) => {
              obj.from = e.target.value;
              objFromServer[item][el] = obj;
            });
          }
        });
      }
      if (e.target.name === 'to') {
        Object.keys(objFromServer).forEach((item) => {
          if (item === 'number') {
            Object.keys(objFromServer[item]).forEach((el) => {
              obj.to = e.target.value;
              objFromServer[item][el] = obj;
            });
          }
        });
      }
    }
    onSetObj(objFromServer);
    setObjFromServer(objFromServer);
  }

  const renderFilter = (datas) => {
    return Object.keys(datas).map((item) => {
      switch (item) {
        case 'checkbox':
          return (
            <label key="checkbox" style={{ color: 'white' }}>
              {Object.keys(datas[item]).map((el) => el)}
              {Object.keys(datas[item]).map((el) =>
                Object.entries(datas[item][el]).map((keyValue) => {
                  if (keyValue[1])
                    return (
                      <label key={keyValue[0]} style={{ color: 'white' }}>
                        <input
                          type={item}
                          value={keyValue[0]}
                          checked
                          id={el}
                        />
                        {keyValue[0]}
                      </label>
                    );
                  else
                    return (
                      <label key={keyValue[0]} style={{ color: 'white' }}>
                        <input type={item} value={keyValue[0]} id={el} />
                        {keyValue[0]}
                      </label>
                    );
                }),
              )}
            </label>
          );
        case 'list':
          return (
            <label key="list" style={{ color: 'white' }}>
              {Object.keys(datas[item]).map((el) => el)}
              <select>
                {Object.keys(datas[item]).map((el) =>
                  Object.values(datas[item][el]).map((keyValue) => {
                    return (
                      <option
                        key={keyValue}
                        label={keyValue}
                        value={keyValue}
                        id={el}
                      />
                    );
                  }),
                )}
              </select>
            </label>
          );
        case 'number':
          return (
            <label key="number" style={{ color: 'white' }}>
              {Object.keys(datas[item]).map((el) => el)}
              {Object.keys(datas[item]).map((el) => {
                const minmax = [];
                Object.entries(datas[item][el]).map((keyValue) =>
                  minmax.push(keyValue[1]),
                );
                return Object.entries(datas[item][el]).map((keyValue) => {
                  return (
                    <label key={keyValue[0]} style={{ color: 'white' }}>
                      {keyValue[0]}
                      <input
                        name={keyValue[0]}
                        type={item}
                        min={minmax[0]}
                        max={minmax[1]}
                        id={el}
                      />
                    </label>
                  );
                });
              })}
            </label>
          );

        default:
          return new Error('u should be loch');
      }
    });
  };
  return (
    <div className="container-filter">
      <form onChange={handlerForm}>{renderFilter(objFromServer)}</form>
    </div>
  );
}
