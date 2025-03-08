import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
// import searchIcon from '../../assets/svg/search.svg';

const SearchField = (props) => {
	const router = useRouter();

	const handleUpdateQueryParam = (values) => {
		// Update the search params onChange
		const { query } = router;
		const newQuery = { ...query, search: values };
		router.replace({
			query: newQuery,
		});
	};

	return (
		<SearchFieldTags className="event-input">
			<div className="search_set">
				{/* <Image
                src={searchIcon.src}
                width={25}
                height={43}
                alt="Search Icon"
              /> */}
				<div className="input-div">
					<span className="material-symbols-outlined search">search</span>
				</div>
				<div>
					<input
						className="eventt"
						type="text"
						name="name"
						placeholder={`Search ${props.labels ? props.labels : "Blog"} ...`}
						onChange={(e) => {
							handleUpdateQueryParam(e.target.value);
							props.setSearchValues && props.setSearchValues(e.target.value);
						}}
					/>
				</div>
			</div>
		</SearchFieldTags>
	);
};

export default SearchField;

const SearchFieldTags = styled.div`
  @media (min-width: 760px) {
    width: 20%;
      position: relative;
    
  }

    .input-div {
      position: absolute;
      left: 1%;
      top: 72.5%;
      transform: translateY(-50%);
    }

    .eventt {
      padding-left: 31px;
    }   
  }

  @media (max-width: 759px) {
    .input-div {
      left: 11%; 
      top: 81.5%;
    }
  }

  @media (max-width: 386px) {
    .input-div {
      left: 14%; 
      top: 81.5%;
    }
  }
`;
