import React, { useEffect, useState } from 'react'

const InitialScreen = () => {

  const [movies,setMovies] = useState([]);
  const [pageNumber,setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOptions, setSearchOptions] = useState('');
  
  useEffect(() => {
    const fetchMoviesList = async () => {
        const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=${pageNumber}`;
        const response = await fetch(url);
        const data = await response.json();
        const {results} = data;
        setMovies(results);
        console.log(results); 
    }
    fetchMoviesList();
  },[pageNumber]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }
  const handleOptionChange = (e) => {
    console.log(e.target.value,"opsadc")
    if(e.target.value==="Choose...") setSearchOptions("");
    else setSearchOptions(e.target.value);
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
    console.log(props,"propswsfvdafv");
    setPageNumber(props);
  }
  const handlePrev = (props) => {
    console.log(props,"prev");
    setPageNumber(props-1);
  }
  const handleNext = (props) => {
    console.log(props,"next");
    setPageNumber(props+1);
  }

  return (
    <div className='mt-2'>
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
      <table className="table">
        <thead>
            <tr>
            <th scope="col">S.No</th>
            <th scope="col">Original_title</th>
            <th scope="col">Original_language</th>
            <th scope="col">Vote_count</th>
            </tr>
        </thead>
        <tbody>
            {filteredData.map((movie, index) => (  
                <tr data-index={index} key={index}>  
                    <th scope="row">{index+1}</th>
                    <td>{movie.original_title}</td>  
                    <td>{movie.original_language}</td> 
                    <td>{movie.vote_count}</td> 
                </tr>  
                ))}  
        </tbody>
      </table>
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
