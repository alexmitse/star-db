/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ListeningQuery({ onChangedQuery }) {
  const [name, setName] = useState(null);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  if (name !== query.get('page')) {
    onChangedQuery(query.get('page'));
    setName(query.get('page'));
  }

  return <div />;
}
