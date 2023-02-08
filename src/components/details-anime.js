import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./details-anime.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { format, render, cancel, register } from "timeago.js";
import { detailsActions } from "./store/details-slice";

export default function Anime() {
  const data = useSelector((state) => state.details.anime); // get anime clicked from the store
  const [anime, setAnime] = useState(data.data.data);
  const [existFavs, setExistFavs] = useState(false);
  const dispatch = useDispatch();

  var coverStyle = {
    backgroundImage: "url(" + anime.attributes.coverImage.small + ")",
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
    let exist = false;
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
  });

  return (
    <div>
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
                    className="ms-3 mt-5 d-flex flex-column"
                    style={{ width: "200px" }}
                  >
                    <button
                      className="btn btn-click"
                      onClick={
                        dispatch(detailsActions.setShowDetails(true)) // let the variable to true to know that a movie is clicked and show it
                      }
                    >
                      Retour
                    </button>

                    <img
                      src={anime.attributes.posterImage.small}
                      alt="Generic placeholder image"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: "200px", zIndex: "1" }}
                    ></img>
                    {!existFavs ? (
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        data-mdb-ripple-color="dark"
                        style={{ zIndex: "1" }}
                        onClick={addToFavs}
                      >
                        Ajouter aux favoris
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        data-mdb-ripple-color="dark"
                        style={{ zIndex: "1" }}
                        onClick={removeFromFavs}
                      >
                        Retirer des favoris
                      </button>
                    )}
                  </div>

                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <h5>{anime.attributes.titles.en_jp}</h5>
                    <p>{anime.attributes.titles.ja_jp}</p>
                    <p>{anime.attributes.ageRatingGuide}</p>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">{anime.attributes.ratingRank}</p>
                      <p className="small text-muted mb-0">Rang</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">{anime.attributes.subtype}</p>
                      <p className="small text-muted mb-0">Type</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">
                        {format(anime.attributes.startDate)}
                      </p>
                      <p className="small text-muted mb-0">Date de sortie</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Description</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <p className="font-italic mb-1">
                        {anime.attributes.description}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent photos</p>
                    <p className="mb-0">
                      <a href="#!" className="text-muted">
                        Show all
                      </a>
                    </p>
                  </div>
                  <div className="row g-2">
                    <div className="col mb-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                        alt="image 1"
                        className="w-100 rounded-3"
                      ></img>
                    </div>
                    <div className="col mb-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                        alt="image 1"
                        className="w-100 rounded-3"
                      ></img>
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                        alt="image 1"
                        className="w-100 rounded-3"
                      ></img>
                    </div>
                    <div className="col">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                        alt="image 1"
                        className="w-100 rounded-3"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
