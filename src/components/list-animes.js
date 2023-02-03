import React, { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import fakeData from "./MOCK_DATA.json";
import axios from "axios";
import Table from "./table";

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
        ],
      },
    ],
    []
  );

  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("https://kitsu.io/api/edge/anime");
  const [next, setNext] = useState();
  const [last, setLast] = useState();

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios(url);
      setData(result.data.data);
      setNext(result.data.links.next);
      setLast(result.data.links.last);
    })();
  }, [url]);
  return (
    <div className="App">
      <button
        onClick={() => {
          setUrl(next);
        }}
      >
        Next
      </button>
      <button
        onClick={() => {
          setUrl(last);
        }}
      >
        Last
      </button>
      <Table columns={columns} data={data} />
    </div>
  );
}
