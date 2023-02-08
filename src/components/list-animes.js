import React, { useEffect, useState, useMemo, CSSProperties } from "react";
import axios from "axios";
import Table from "./table";
import "./list-animes.css";
import Select from "react-select";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import Anime from "./details-anime";
import { useDispatch, useSelector } from "react-redux";
import { detailsActions } from "./store/details-slice";
import clipboard from "react-spinners/ClipLoader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

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
                style={{ color: "white" }}
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
  const [loading, setLoading] = useState(false);

  const [yearsList, setYearsList] = useState([]);
  const [ageRatingList, setAgeRatingList] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
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
    let array = [
      { value: "G", label: "General Audiences" },
      {
        value: "PG",
        label: "Parental Guidance Suggested",
      },
      { value: "R", label: "Restricted" },
      { value: "R18", label: "Explicit" },
    ];
    setAgeRatingList(array);
  }, []);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios(url);

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
  const handleChangeYears = (selectedOption) => {
    setUrl(
      `https://kitsu.io/api/edge/anime?filter[year]=${selectedOption.value}`
    );
  };
  const handleChangeRating = (selectedOption) => {
    setUrl(
      `https://kitsu.io/api/edge/anime?filter[ageRating]=${selectedOption.value}`
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
    <div className="App ">
      {loading ? (
        <>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <ClimbingBoxLoader
              color={"#acadd0"}
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>
      ) : (
        <>
          {!showDetails ? (
            <>
              <h3>{count} Résultats</h3>
              <div className="bar">
                <div className="search-box">
                  <button className="btn-search">
                    <i className="fa fa-search fa-search "></i>
                  </button>
                  <input
                    onChange={handleFilterChange}
                    type="text"
                    className="input-search"
                    placeholder="Type to Search..."
                    style={{ flexGrow: "1" }}
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
                  onChange={handleChangeYears}
                  style={{ flexGrow: "8" }}
                />

                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={ageRatingList[0]}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={true}
                  isRtl={false}
                  isSearchable={false}
                  name="color"
                  options={ageRatingList}
                  onChange={handleChangeRating}
                  style={{ flexGrow: "8" }}
                />
              </div>
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
            </>
          ) : (
            <Anime />
          )}
        </>
      )}
    </div>
  );
}
