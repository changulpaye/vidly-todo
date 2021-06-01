import React, { Component } from "react";
class Generes extends Component {
  render() {
    const { genres, selectedGenre, onGenreSelected } = this.props;
    return (
      <ul className="list-group">
        {genres.map((genre) => (
          <li
            key={genre._id}
            className={
              genre._id === selectedGenre._id
                ? "list-group-item active"
                : "list-group-item"
            }
            style={{ cursor: "pointer" }}
            onClick={() => onGenreSelected(genre)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default Generes;
