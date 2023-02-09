import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./details-anime.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { format } from "timeago.js";
import { FaTrash } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { Button } from "@mui/material";
import { MdKeyboardReturn } from "react-icons/md";

import axios from "axios";

import { detailsActions } from "./store/details-slice";

export default function Anime(props) {
  const data = useSelector((state) => state.details.anime); // get anime clicked from the store
  const [anime] = useState(data.data.data);
  const [existFavs, setExistFavs] = useState(false);
  const [animesSuggestions, setAnimesSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const getRating = (anime) => {
    const rating = anime.attributes.averageRating;
    return (rating * 5) / 100;
  };
  var coverStyle = {
    backgroundImage: anime.attributes.coverImage
      ? "url(" + anime.attributes.coverImage.small + ")"
      : "../../public/default-placeholder-cover.png",

    height: "350px",
  };

  const existingFavs = JSON.parse(localStorage.getItem("favs") || "[]"); // animes from local storage

  const addToFavs = () => {
    let exist = false;
    // add a anime
    existingFavs.forEach((element, index) => {
      if (element.id === anime.id) {
        exist = true;
        return;
      }
    });
    if (!exist) {
      existingFavs.push(anime);
      localStorage.setItem("favs", JSON.stringify(existingFavs)); // set the new array to storage
      setExistFavs(true);
    }
  };
  const removeFromFavs = () => {
    // add a anime
    existingFavs.forEach((element, index) => {
      if (element.id === anime.id) {
        existingFavs.splice(index, 1);
        setExistFavs(false);
        localStorage.setItem("favs", JSON.stringify(existingFavs)); // set the new array to storage

        return;
      }
    });
  };
  useEffect(() => {
    existingFavs.forEach((element, index) => {
      if (element.id === anime.id) {
        setExistFavs(true);
        return;
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      let url = `https://kitsu.io/api/edge/anime/${anime.id}/relationships/categories`;

      const result = await axios(url);
      var array = [];

      result.data.data.forEach(async (element) => {
        let secondUrl = `https://kitsu.io/api/edge/anime/${element.id}`;
        let axiosResult = await axios(secondUrl)
          .catch(function (error) {
            if (error.request)
              console.log("Anime with ID :" + element.id + " Not found");
          })
          .then(function success(data) {
            if (data) array.push(data.data.data);
          });
      });
      setAnimesSuggestions(array);
      console.log(animesSuggestions);
    })();
  }, []);

  return (
    <>
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
          <div className="h-100 gradient-custom-2">
            <div>
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-12 col-xl-12">
                  <div className="card">
                    <div
                      className="rounded-top text-white d-flex flex-row"
                      style={coverStyle}
                    >
                      <div
                        className="ms-3 mt-2 d-flex flex-column"
                        style={{ width: "200px" }}
                      >
                        <div className=" p-3">
                          <MdKeyboardReturn
                            onClick={(e) => {
                              dispatch(detailsActions.setShowDetails(true));
                              props.setDetails(false);
                            }}
                          />
                          Acceuil
                        </div>

                        {anime.attributes.posterImage ? (
                          <img
                            src={anime.attributes.posterImage.small}
                            alt={anime.attributes.en_jp}
                            className="img-fluid img-thumbnail mt-6 mb-3"
                            style={{ width: "200px", zIndex: "1" }}
                          ></img>
                        ) : (
                          <img
                            src="../../public/default-placeholder.png"
                            alt={anime.attributes.en_jp}
                            className="img-fluid img-thumbnail mt-6 mb-3"
                            style={{ width: "200px", zIndex: "1" }}
                          ></img>
                        )}

                        {!existFavs ? (
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            data-mdb-ripple-color="dark"
                            style={{ zIndex: "1" }}
                            onClick={addToFavs}
                          >
                            <div
                              className="row"
                              style={{ position: "relative" }}
                            >
                              <div className="col-md-10">
                                Ajouter aux favoris
                              </div>
                              <div
                                className="col-md-1"
                                style={{
                                  position: "absolute",
                                  top: "45%",
                                  left: "80%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              >
                                <FaHeart />
                              </div>
                            </div>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-outline-dark"
                            data-mdb-ripple-color="dark"
                            style={{ zIndex: "1" }}
                            onClick={removeFromFavs}
                          >
                            <div
                              className="row"
                              style={{ position: "relative" }}
                            >
                              <div className="col-md-10">
                                {" "}
                                Retirer des favoris
                              </div>
                              <div
                                className="col-md-1"
                                style={{
                                  position: "absolute",
                                  top: "45%",
                                  left: "80%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              >
                                <FaTrash />
                              </div>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                    <div
                      className=" text-black"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <div
                          className="lead fw-normal mb-1"
                          style={{ marginLeft: "15%" }}
                        >
                          <div
                            className="p-4 text-black"
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                            <div className="d-flex text-center py-0 ">
                              <div
                                className="mb-0 "
                                style={{
                                  fontFamily: "Arial Rounded MT Bold",
                                  fontSize: "50px",
                                }}
                              >
                                <h3>{anime.attributes.titles.en_jp}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-0" style={{ marginRight: "2%" }}>
                          <div className="d-flex justify-content-end text-center py-1  ">
                            <div>
                              {anime.attributes.ratingRank ? (
                                <p className="mb-1 h5">
                                  {anime.attributes.ratingRank}
                                </p>
                              ) : (
                                <p className="mb-1 h5">NB</p>
                              )}

                              <p className="small text-muted mb-0">Rang</p>
                            </div>
                            <div className="px-3">
                              <p className="mb-1 h5">
                                {anime.attributes.subtype}
                              </p>
                              <p className="small text-muted mb-0">Type</p>
                            </div>
                            <div>
                              <p className="mb-1 h5">
                                {format(anime.attributes.startDate)}
                              </p>
                              <p className="small text-muted mb-0">
                                Date de sortie
                              </p>
                            </div>
                          </div>{" "}
                        </div>
                      </div>
                    </div>

                    <div className="card-body p-4 text-black">
                      <div className="mb-5">
                        <p className="lead fw-normal mb-1">Description</p>
                        <div
                          className="p-4"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <p className="font-italic mb-1">
                            {anime.attributes.description}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <p className="lead fw-normal mb-0">Suggestions</p>
                        <p className="mb-0">
                          <a href="#!" className="text-muted">
                            Show all
                          </a>
                        </p>
                      </div>

                      {animesSuggestions.map((anime) => {
                        <>
                          <div
                            className="col-md-4 mt-3 p-3"
                            style={{ display: "flex", flexWrap: "wrap" }}
                          >
                            <div className="cardFavs">
                              <div className="image-containerFavs">
                                <div className="first">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span className="discount">
                                      {anime.attributes.subtype}
                                    </span>
                                  </div>
                                </div>

                                <img
                                  src={anime.attributes.posterImage.small}
                                  className="img-fluid rounded thumbnail-image"
                                  alt={anime.attributes.en_jp}
                                ></img>
                              </div>

                              <div className="product-detail-containerFavs p-2">
                                <div className="d-flex justify-content-between align-items-center">
                                  <h5 className="dress-name">
                                    {anime.attributes.titles.en_jp}
                                  </h5>

                                  <div className="d-flex flex-column mb-2">
                                    <div>
                                      <i className="fa fa-star-o rating-star"></i>
                                      <span className="rating-number">
                                        {anime.attributes.averageRating}
                                      </span>
                                    </div>{" "}
                                  </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="color-select d-flex ">
                                    <div
                                      className="row row-cols-12 row-cols-lg-12 g-12 g-lg-12"
                                      style={{
                                        maxWidth: "2%",
                                        maxHeight: "1px",
                                      }}
                                    >
                                      <Rating
                                        name="half-rating-read"
                                        defaultValue={getRating(anime)}
                                        precision={0.1}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center pt-4">
                                  <div>
                                    <span className="rating-number">
                                      {anime.attributes.startDate}
                                    </span>
                                  </div>

                                  <span className="buy">
                                    Rang: {anime.attributes.ratingRank}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
