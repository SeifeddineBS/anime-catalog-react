import React, { useEffect, useState } from "react";
import "./favs-animes.css";
import Animes from "./list-animes";

export default function FavsAnimes() {
  const existingFavs = JSON.parse(localStorage.getItem("favs") || "[]"); // animes from local storage

  const removeFromFavs = (anime) => {
    let exist = false;
    // add a anime
    existingFavs.forEach((element, index) => {
      if (element.id === anime.id) {
        existingFavs.splice(index, 1);
        setFavsChanged(!favsChanged);
        localStorage.setItem("favs", JSON.stringify(existingFavs)); // set the new array to storage

        return;
      }
    });
  };
  const [favsChanged, setFavsChanged] = useState(false);
  useEffect(() => {}, [favsChanged]);

  return (
    <>
      <div className="containerFavs mt-5">
        <div className="row">
          {existingFavs.map((anime) => (
            <div className="col-md-3">
              <div className="cardFavs">
                <div className="image-containerFavs">
                  <div className="first">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="discount">
                        {anime.attributes.ratingRank}
                      </span>
                      <span className="wishlist">
                        <i className="fa fa-heart-o"></i>
                      </span>
                    </div>
                  </div>

                  <img
                    src={anime.attributes.posterImage.small}
                    className="img-fluid rounded thumbnail-image"
                  ></img>
                </div>

                <div className="product-detail-containerFavs p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="dress-name">
                      {anime.attributes.titles.en_jp}
                    </h5>

                    <div className="d-flex flex-column mb-2">
                      <div>{anime.attributes.averageRating}</div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center pt-1">
                    <div className="color-select d-flex ">
                      <input
                        type="button"
                        name="grey"
                        className="btnFavs creme"
                      ></input>
                      <input
                        type="button"
                        name="red"
                        className="btnFavs red ml-2"
                      ></input>
                      <input
                        type="button"
                        name="blue"
                        className="btnFavs blue ml-2"
                      ></input>
                    </div>

                    <div className="d-flex ">
                      <span className="item-size mr-2 btnFavs" type="button">
                        S
                      </span>
                      <span className="item-size mr-2 btnFavs" type="button">
                        M
                      </span>
                      <span className="item-size btnFavs" type="button">
                        L
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center pt-1">
                    <div>
                      <i className="fa fa-star-o rating-star"></i>
                      <span className="rating-number">
                        {anime.attributes.averageRating}
                      </span>
                    </div>

                    <span className="buy">{anime.attributes.subtype}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div className=" voutchers">
                  <div className="voutcher-divider">
                    <div className="voutcher-left text-center">
                      <button
                        className="btn btn-link"
                        onClick={() => {
                          removeFromFavs(anime);
                        }}
                      >
                        Retirer
                      </button>
                    </div>
                    <div className="voutcher-right text-center border-left">
                      <h5 className="discount-percent">20%</h5>
                      <span className="off">Off</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
