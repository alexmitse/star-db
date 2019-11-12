/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import './people-page.css';

export default function PeolpePage() {
  const [selectedPerson, setSelectedPerson] = useState(null);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  function onPersonSelected(person) {
    setSelectedPerson(person);
  }
  if (selectedPerson !== query.get('persone')) {
    onPersonSelected(query.get('persone'));
    setSelectedPerson(query.get('persone'));
  }

  return (
    <div className="row mb2">
      <div className="col-md-6">
        <ItemList OnItemSelected={onPersonSelected} personId={selectedPerson} />
      </div>
      <div className="col-md-6">
        <PersonDetails personId={selectedPerson} />
      </div>
    </div>
  );
}
