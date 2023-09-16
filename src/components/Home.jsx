import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries } from '../Redux/homeSlice';
import position from '../assets/location.png';
import './Home.css';

function Home() {
  const dispatch = useDispatch();
  const countriesData = useSelector((state) => state.home.data);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const filteredCountries = countriesData
    ? countriesData.filter(
      (country) => country.name.toLowerCase().includes(filter.toLowerCase()),
    )
    : [];
  return (
    <div className="homeContainer">
      <div className="principal">
        <h2>Air Quality Index In Tunisia</h2>
      </div>
      <input
        type="text"
        placeholder="Search by Country Name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <h2>Tunisia States</h2>
      <div className="gridList">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <div
              key={country.name}
              className={`gridListItem ${index % 4 === 1 || (index - 1) % 4 === 1 ? 'even' : 'odd'}`}
            >
              <span>{country.name}</span>
              <div className="position">
                <img src={position} alt="" />
                <br />
                Latitude:
                {' '}
                {country.lat.toFixed(2)}
                Longitude:
                {' '}
                {country.lon.toFixed(2)}
              </div>
              <Link
                to={`/Details?lat=${country.lat}&lon=${country.lon}&countryName=${country.name}`}
              >
                <button type="button">See details</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No matching countries found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
