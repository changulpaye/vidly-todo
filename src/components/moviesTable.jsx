import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  state = {};

  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}> {movie.title} </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onClick={() => this.props.onLiked(movie)}
        ></Like>
      ),
    },
  ];

  deleteColumn() {
    return {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    };
  }

  constructor(props) {
    super(props);
    const user = getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn());
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        data={movies}
        onSort={onSort}
      ></Table>
    );
  }
}

export default MoviesTable;
