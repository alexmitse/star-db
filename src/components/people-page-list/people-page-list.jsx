/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ItemList from '../item-list';
import Pagination from '../pagination';
import Spinner from '../spinner';
import './people-page-list.css';
import SwapiService from '../../services/swapi-service';
import Filter from '../filter/filter';

export default function PeolpePageList() {
  const swapiService = new SwapiService();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const page = query.get('page');
  console.log(page);

  const [peopleCount, setPeopleCount] = useState(null);
  const [peopleList, setPeopleList] = useState(null);
  const [currentElement, setCurrentElement] = useState(1);
  const [filter, setFilter] = useState(false);
  const [sizeList, setSizeList] = useState(10);

  useEffect(() => {
    swapiService
      .getAllPeople(
        `${+page > 9 && +page < 1 && !(currentElement === +page) ? '' : page} `,
        filter,
      )
      .then(([peopleListFromServer, peopleCountFromServer]) => {
        if (filter) {
          setPeopleList(
            peopleListFromServer[page - 1].filter(
              (item) => item.gender === filter,
            ),
          );
          setPeopleCount(
            peopleListFromServer.reduce((sum, current) => {
              return (
                sum + current.filter((item) => item.gender === filter).length
              );
            }, 0),
          );
          setSizeList(
            peopleListFromServer.filter((item) => item.gender === filter)
              .length,
          );
        } else {
          setPeopleList(peopleListFromServer);
          setPeopleCount(peopleCountFromServer);
        }
      });
  }, [filter]);

  const onChangeCurrentElement = (element) => {
    if (!(element > 9 || element < 1 || currentElement === element)) {
      swapiService
        .getAllPeople(`${element}`, filter)
        .then(([peopleListFromServer]) => {
          if (filter) {
            console.log(
              element,
              // peopleListFromServer[page - 1].filter(
              //   (item) => item.gender === filter,
              // ),
            );
            setPeopleList(
              peopleListFromServer[element - 1].filter(
                (item) => item.gender === filter,
              ),
            );
            setCurrentElement(element);
          } else {
            setPeopleList(peopleListFromServer);
            setCurrentElement(element);
          }
        });
    }
  };

  if (!peopleList) {
    return <Spinner />;
  }

  return (
    <div className="people-page-list">
      <div className="people-page">
        <ItemList list={peopleList} lable="people" />
        <Pagination
          totalCount={peopleCount}
          currentPage={page === ':page' ? currentElement : page}
          setCurrentPage={onChangeCurrentElement}
          name="people"
          size={sizeList}
        />
      </div>
      <div className="people-page-filter">
        <Filter setFilter={setFilter} />
      </div>
    </div>
  );
}
