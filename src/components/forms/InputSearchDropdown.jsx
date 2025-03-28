import {React, useEffect, useState } from 'react';
import styled from 'styled-components';

const InputSearchDropdown = ({ options, onOptionSelected, ...props }) => {
  const [searchTerm, setSearchTerm] = useState(props.defaultValues ? props.defaultValues : '');
  const [filteredOptions, setFilteredOptions] = useState();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredOptions(options.filter((option) => 
        (option.name.toLowerCase() === searchTerm.toLowerCase()) && (option.name.length === e.target.value.length)
    ));
  };

  useEffect(()=>{
    if (searchTerm) {
        setFilteredOptions(options.filter((option) => 
            (option.name.toLowerCase() === searchTerm.toLowerCase()) && (option.name.length === searchTerm.length)
        ));
    }
  }, [searchTerm])

  const handleOptionSelected = (option) => {
    setSearchTerm(option);
    setFilteredOptions(options);
    setShowDropdown(false);
    onOptionSelected(option);
  };

  return (
    <ReachSearch className='react_search_dropdown'>
        <h3 className='react_search_dropdown_title'>Search Organisation:</h3>
      <div className='field'>
        <input
          type="text"
          value={searchTerm}
          name={props.names}
          onChange={handleSearch}
          onFocus={() => (filteredOptions) && setShowDropdown(true)}
          onBlur={() => setShowDropdown(false)}
          readOnly={props.disableds ? props.disableds : false}
        />

        {showDropdown && (
          <ul className='drop_down_list'>
            {filteredOptions.map((option, index) => (
              <li key={index} onClick={() => handleOptionSelected(option)}>
                {option.name}
              </li>
            ))}
          </ul>
        )}
        </div>
    </ReachSearch>
  );
};

export default InputSearchDropdown;

const ReachSearch = styled.div`
    h3.react_search_dropdown_title{
        font-size: 1em;
        margin-top: 40px;
        font-weight: 600;
    }

    input{
        border: var(--borderDefault);
        :disabled{
            background: #f4f4f4;
        }
    }
    .drop_down_list{
      box-shadow: var(--shadow);
      li{
        padding: 10px;
        border-bottom: var(--borderDefault);
        cursor: pointer;
      }
    }
`;
