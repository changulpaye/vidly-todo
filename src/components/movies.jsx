import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUser } from "../services/authService";
import { getGenres } from "../services/genreService";
import { deleteMovie, getMovies } from "../services/movieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import MoviesTable from "./moviesTable";



class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: null,
  };

  async componentDidMount() {
    let genre = { _id: "", name: "All Genres" };
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    let genres = [genre, ...data];
    this.setState({ genres, movies });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");
      this.setState( { movies: originalMovies});  
    }
  };

  handleLiked = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      sortColumn,
      selectedGenre,
      searchQuery,
    } = this.state;
    let filtered = allMovies;

    if (searchQuery) {
      filtered = searchQuery
        ? allMovies.filter((m) =>
            m.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : allMovies;
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const user = getCurrentUser();

    const { totalCount, data: movies } = this.getPageData();
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={(genre) => this.handleGenreSelect(genre)}
          ></ListGroup>
        </div>

        <div className="col">
          { (user && user.isAdmin) && <Link className="btn btn-primary" to="/movies/new">
            New Movie
          </Link>}
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <MoviesTable
            movies={movies}
            onLiked={(movie) => this.handleLiked(movie)}
            onDelete={(movie) => this.handleDelete(movie)}
            onSort={(path) => this.handleSort(path)}
            sortColumn={sortColumn}
          ></MoviesTable>
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default Movies;
