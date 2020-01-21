import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ItemList from '../../../shared/item-list';
import Pagination from '../../../shared/pagination';
import Spinner from '../../../shared/spinner';
import './people-page-list.css';
import SwapiService from '../../../services/swapi-service';
import QueryWork from '../../../shared/query-work';

export default function PeolpePageList() {
  const swapiService = new SwapiService();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const page = query.get('page');
  const [peopleCount, setPeopleCount] = useState(null);
  const [peopleList, setPeopleList] = useState(null);
  const [currentElement, setCurrentElement] = useState(1);
  const [filter] = useState(false);
  const [sizeList] = useState(10);

  const data = [
    {
      films: {
        type: 'checkbox',
        dataList: [`films_1`, `films_2`, `films_3`, `films_4`],
      },
    },
    { gender: { type: 'list', dataList: ['male', 'female', 'a'] } },
    { rotationPeriod: { type: 'number', dataList: ['0', '5'] } },
  ];

  useEffect(() => {
    swapiService
      .getAllPeople(
        `${
          +page > 9 || // change 9 on variable
          (+page < 1 && !(currentElement === +page)) ||
          page === null
            ? 1
            : page
        } `,
        filter,
      )
      .then(([peopleListFromServer, peopleCountFromServer]) => {
        setPeopleList(peopleListFromServer);
        setPeopleCount(peopleCountFromServer);
      });
  }, []);

  const onChangeCurrentElement = (element) => {
    if (!(element > 9 || element < 1 || currentElement === element)) {
      swapiService
        .getAllPeople(`${element}`, filter)
        .then(([peopleListFromServer]) => {
          setPeopleList(peopleListFromServer);
          setCurrentElement(element);
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
        <QueryWork data={data} />
      </div>
    </div>
  );
}
