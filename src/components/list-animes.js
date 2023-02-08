import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Table from "./table";
import "./list-animes.css";
import Select from "react-select";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import Anime from "./details-anime";
import { useDispatch, useSelector } from "react-redux";
import { detailsActions } from "./store/details-slice";

export default function Animes() {
  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "Animes",
        // First group columns
        columns: [
          {
            Header: "ID",
            accessor: "id",
          },
          {
            Header: "Titre",
            accessor: "attributes.titles.en_jp",
          },
          {
            Header: "Titre japonais",
            accessor: "attributes.titles.ja_jp",
          },
          {
            Header: "Age recommandé",
            accessor: "attributes.ageRatingGuide",
            sortable: false,
          },
          {
            Header: "Date de sortie",
            accessor: "attributes.startDate",
          },
          {
            Header: "Rang",
            accessor: "attributes.ratingRank",
          },
          {
            Header: "Click here",
            Cell: ({ row }) => (
              <button
                className="btn btn-link"
                style={{color:"white"}}
                onClick={(e) => goToAnimeDetails(row)}
              >
                Voir plus
              </button>
            ),
          },
        ],
      },
    ],
    []
  );

  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);
  const showDetails = useSelector((state) => state.details.showDetails); // verify if favorites button is clicked or not to show favs

  const [url, setUrl] = useState(
    `https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=0`
  );
  const [next, setNext] = useState({ value: null, status: true });
  const [last, setLast] = useState({ value: null, status: true });
  const [first, setFirst] = useState({ value: null, status: true });
  const [count, setCount] = useState(0);
  const [yearsList, setYearsList] = useState([]);
  const dispatch = useDispatch();
  // when clicked to details go to movie details

  const generateArrayOfYears = () => {
    var max = new Date().getFullYear();
    var min = max - 50;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push({ value: i, label: i });
    }
    return years;
  };
  useEffect(() => {
    setYearsList(generateArrayOfYears());
  }, []);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios(url);

      console.log(url);
      setData(result.data.data);
      setCount(result.data.meta.count);
      setNext({ value: result.data.links.next, status: true });
      setLast(result.data.links.last);
      setFirst(result.data.links.first);
      if (url === last) {
        setNext({ value: result.data.links.next, status: false });
      }
    })();
  }, [url]);

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setUrl(`https://kitsu.io/api/edge/anime?filter[text]=${value}`);
  };
  const handleChange = (selectedOption) => {
    setUrl(
      `https://kitsu.io/api/edge/anime?filter[year]=${selectedOption.value}`
    );
  };
  const goToAnimeDetails = async (row) => {
    const id = row.allCells[0].value;
    const url = `https://kitsu.io/api/edge/anime/${id}`;

    const result = await axios(url);

    dispatch(detailsActions.setShowDetails(true)); // let the variable to true to know that a movie is clicked and show it
    dispatch(detailsActions.showDetails(result)); // update the movie clicked
  };

  return (
    <>
      {!showDetails ? (
        <div className="App ">
          <h3>{count} Results</h3>

          <div className="search-box">
            <button className="btn-search">
              <i className="fa fa-search fa-search "></i>
            </button>
            <input
              onChange={handleFilterChange}
              type="text"
              className="input-search"
              placeholder="Type to Search..."
            ></input>
          </div>

          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={yearsList[0]}
            isDisabled={false}
            isLoading={false}
            isClearable={true}
            isRtl={false}
            isSearchable={false}
            name="color"
            options={yearsList}
            onChange={handleChange}
          />
          <Table columns={columns} data={data} />
          <div className="button-container">
            <div className="btn">
              <a
                onClick={() => {
                  setUrl(first);
                }}
              >
                First
              </a>
            </div>
            {next.status && (
              <div className="btn">
                <a
                  onClick={() => {
                    setUrl(next.value);
                  }}
                >
                  Next
                </a>
              </div>
            )}

            <div className="btn">
              <a
                onClick={() => {
                  setUrl(last);
                }}
              >
                Last
              </a>
            </div>
          </div>
        </div>
      ) : (
        <Anime />
      )}
    </>
  );
}
