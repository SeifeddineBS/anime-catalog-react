import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./details-anime.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { MdKeyboardReturn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { detailsActions } from "./store/details-slice";

export default function Anime(props) {
  const navigate = useNavigate();

  const data = useSelector((state) => state.details.anime); // get anime clicked from the store
  const [anime] = useState(data.data.data);
  const [existFavs, setExistFavs] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  var coverStyle = {
    backgroundImage: anime.attributes.coverImage
      ? "url(" + anime.attributes.coverImage.small + ")"
      : "../../public/default-placeholder-cover.png",

    height: "350px",
  };

  const getYearFromDate = () => {
    let date = anime.attributes.startDate;
    for (let i = 0; date.length; i++) {
      if (date[i] === "-") {
        date = date.substring(0, i);
        break;
      }
    }
    return date;
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

  return (
    <>
      <meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0" />
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
        <div className="containerDetails">
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
                        <button
                          type="button"
                          className="btn btn-outline-light  mt-6 mb-5"
                          data-mdb-ripple-color="dark"
                          style={{
                            zIndex: "1",
                            justifyContent: "center",
                            display: "flex",
                          }}
                          icon="fa-solid fa-arrow-right-to-bracket"
                          onClick={(e) => {
                            dispatch(detailsActions.setShowDetails(true));
                            props.setDetails(false);
                          }}
                        >
                          <div className="row d-inline-flex align-items-center">
                            <div className="my-0 pr-1">
                              <MdKeyboardReturn className="mb-1 " />
                              Acceuil &nbsp;
                            </div>
                          </div>
                        </button>

                        {anime.attributes.posterImage ? (
                          <img
                            src={anime.attributes.posterImage.small}
                            alt={anime.attributes.en_jp}
                            className="img-fluid img-thumbnail mt-6 mb-1"
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
                          <>
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
                          </>
                        )}
                      </div>
                    </div>
                    <div
                      className=" text-black"
                      style={{ backgroundColor: "#f1f1fc" }}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <div
                          className=" mediaQuery lead fw-normal mb-1"
                        >
                          <div
                            className="p-4 text-black"
                            style={{ backgroundColor: "#f1f1fc" }}
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
                              <p className="mb-1 h5">{getYearFromDate()}</p>
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
                          style={{ backgroundColor: "#f1f1fc" }}
                        >
                          <p className="font-italic mb-1">
                            {anime.attributes.description}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <p className="mb-0">
                          <button
                            type="button"
                            className="btn btn-outline-light"
                            data-mdb-ripple-color="dark"
                            style={{
                              zIndex: "1",
                              justifyContent: "center",
                              display: "flex",
                            }}
                            icon="fa-solid fa-arrow-right-to-bracket"
                            onClick={(e) => navigate("/favorites")}
                          >
                            <div
                              className="row d-inline-flex align-items-center"
                              style={{ color: "red" }}
                            >
                              <div className="my-0 pr-1">
                                <FaHeart className="mb-1" />
                              </div>
                            </div>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
