import React, { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCities } from "../../api/OpenWeatherService";

const Search = ({ onSearchChange }) => {
  // Default to Jos, Nigeria
  const defaultCity = {
    value: "9.8965 8.8583", // Lat & Lon for Jos
    label: "Jos, NG",
  };

  const [searchValue, setSearchValue] = useState(defaultCity);

  const loadOptions = async (inputValue) => {
    const citiesList = await fetchCities(inputValue);

    return {
      options: citiesList.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      })),
    };
  };

  const onChangeHandler = (enteredData) => {
    setSearchValue(enteredData);
    onSearchChange(enteredData);
  };

  // Automatically load Jos on first render
  useEffect(() => {
    onSearchChange(defaultCity);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AsyncPaginate
      placeholder="Search for Nigerian cities"
      debounceTimeout={600}
      value={searchValue}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
