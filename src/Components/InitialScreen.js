import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import MovieList from './MovieList';

const InitialScreen = () => {

  const [movies,setMovies] = useState([]);
  const [pageNumber,setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOptions, setSearchOptions] = useState('');
  const [history,setHistory] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const fetchMoviesList = async () => {
        setLoading(true);
        const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=${pageNumber}`;
        const response = await fetch(url);
        const data = await response.json();
        const {results} = data;
        setMovies(results);
        setLoading(false); 
    }
    fetchMoviesList();
  },[pageNumber]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    let temp_Arr = history;
    if(temp_Arr.length === 3){
        temp_Arr.shift();
    }
    temp_Arr.push(
        {
            title:e.target.value,
            language:searchOptions
        }
    )
    setHistory(temp_Arr);
  }
  const handleOptionChange = (e) => {
    if(e.target.value==="Choose...") setSearchOptions("");
    else setSearchOptions(e.target.value);
    let temp_Arr = history;
    if(temp_Arr.length === 3){
        temp_Arr.shift();
    }
    temp_Arr.push(
        { 
            title:searchQuery,
            language:e.target.value
        }
    )
    setHistory(temp_Arr);
  }

    const modifyMovies = (movie) => {
        if(searchOptions && searchQuery){
            return movie.original_title.toLowerCase().includes(searchQuery.toLowerCase()) &&
             movie.original_language.toLowerCase().includes(searchOptions.toLowerCase());
        }
        else if(searchOptions){
            return movie.original_language.toLowerCase().includes(searchOptions.toLowerCase());
        }
        else if(searchQuery){
            return movie.original_title.toLowerCase().includes(searchQuery.toLowerCase());
        }
        else return movie;
    }

  const filteredData = movies.filter(modifyMovies)

  const handleClick = (props) => {
    setPageNumber(props);
  }
  const handlePrev = (props) => {
    if(props>=2)
    setPageNumber(props-1);
  }
  const handleNext = (props) => {
    setPageNumber(props+1);
  }

  const handleDelete = (props) => {
    let temp_Arr = history;
    temp_Arr = temp_Arr.filter((item,index) => index!==props);
    setHistory(temp_Arr);
  }

  const handleDeleteAll = () => {
    setHistory([]);
  }

  return (
    <div className='mt-2'>
      {loading && <Spinner />}
      <div className="row mb-4">
        <div className="col-md-8">
            <input type="text" className="form-control" placeholder='title' id="title" value={searchQuery} onChange={handleChange}/>
        </div>
        <div className="col-md-4">
            <select id="language" className="form-select" placeholder='language' onChange={handleOptionChange}>
                <option select="true">Choose...</option>
                <option>en</option>
                <option>ms</option>
                <option>fi</option>
                <option>ja</option>
                <option>fr</option>
                <option>ru</option>
                <option>ko</option>
                <option>no</option>
                <option>pt</option>
                <option>it</option>
                <option>es</option>
                <option>cn</option>
                <option>tr</option>
                <option>zh</option>
            </select>
        </div>
      </div>
      {history.length>0 && <div className='my-4'>
        <div className='my-4'>
            <div className="my-4 fw-bold fs-3 text-dark d-flex justify-content-start">
                Search History
            </div>
            <table className="table">
            <thead>
                <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Title/language</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {history.map((hist,index) => (
                    <tr data-index={index} key={index}>  
                        <th scope="row">{index+1}</th>
                        <td>{hist.title}   /   {hist.language}</td>   
                        <td>
                            <button className='btn btn-outline-primary' onClick={() => handleDelete(index)}>Delete</button>
                        </td> 
                    </tr>   
                ))}
            </tbody>
            </table>
        </div>
      <div className='d-flex justify-content-end'>
        <button onClick={handleDeleteAll} className='btn btn-outline-info'>Delete Search History</button>
      </div>
      </div>}
      <div className="row">
          {!loading && filteredData.map((movie,index) => {
              return (
                  <div className="col-md-4" key={index}>
                      <MovieList title={movie.original_title} language={movie.original_language} vote={movie.vote_count} desc = {movie.overview}/>
                  </div>
              )
          })}
      </div>
      <div className='mt-3 d-flex justify-content-end'>
        <button onClick={() => handlePrev(pageNumber)} className="btn p-2">&#8249;</button>
        <div className="p-2">Page</div>
        <button onClick={() => handleClick(pageNumber)} className="p-2 btn">{pageNumber}</button>
        <button onClick={() => handleClick(pageNumber+1)} className="p-2 btn">{pageNumber+1}</button>
        <button onClick={() => handleClick(pageNumber+2)} className="p-2 btn">{pageNumber+2}</button>
        <button onClick={() => handleNext(pageNumber)} className="p-2 btn">&#8250;</button>
      </div>
    </div>
  )
}

export default InitialScreen
