import React, { useEffect, useState } from "react";
import "./favs-animes.css";
import Rating from "@mui/material/Rating";
import { FaTrash } from "react-icons/fa";

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
  const getRating = (anime) => {
    const rating = anime.attributes.averageRating;
    return (rating * 5) / 100;
  };

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
                        {anime.attributes.subtype}
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
                        class="row row-cols-12 row-cols-lg-12 g-12 g-lg-12"
                        style={{ maxWidth: "2%", maxHeight: "1px" }}
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

              <div className="mt-1">
                <div className=" voutchers">
                  <div className="voutcher-divider">
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      data-mdb-ripple-color="dark"
                      style={{
                        zIndex: "1",
                        justifyContent: "center",
                        display: "flex",
                      }}
                      icon="fa-solid fa-arrow-right-to-bracket"
                      onClick={() => {
                        removeFromFavs(anime);
                      }}
                    >
                      Retirer des favoris
                      <FaTrash />
                    </button>
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
