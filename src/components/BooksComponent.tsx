import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Book from '../types/Book';
import HeaderComponent from './header/Header';

export default function BooksComponent() {
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastpage] = useState<Boolean>(false);
  const [books, setBooks] = useState<Array<Book>>([]);
  const [booksCollection, setBooksCollections] = useState<Array<Book>>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
 
  const getCharacter = async(url: string) =>{
    const response = await axios.get(url)
    return response.data;
  }

  const getBooks =  useCallback(async () => {
    if (!isLastPage) {
      const response = await axios.get(
        `https://www.anapioficeandfire.com/api/books?page=${page}&pageSize=30`
      )
      let temChar:any[] = [];
      let tempResult = await response.data.map((data: any)=>{
        return {...data, charactersNames: []}
      });
      let tempBooks:any[] = [];
      await response.data.forEach(async(dt:Book, index: number)=>{
        await dt.characters.forEach(async( url: any)=>{
          if (!temChar[url]) {
            let tet =  await getCharacter(url)
            temChar[url] = tet   
            tempResult[index] = {...dt, charactersNames: [...tempResult[index].charactersNames, tet]}
          }else{
            tempResult[index] = {...dt, charactersNames: [...tempResult[index].charactersNames, temChar[url]]}
          } 
        })
      })
      await tempBooks.push(tempResult);
      
      setBooks(tempBooks[0]);
      setBooksCollections(tempBooks[0]);
      // setBooks((prevBooks)=>{
      //   console.log('prevBooks: ', prevBooks);
      //         return [...prevBooks, ...tempResult] 
      // })
      // setBooksCollections((prevBooks)=>{
      //         return [...prevBooks, ...tempResult] 
      // })
      if (response?.data?.length === 0) {
        setIsLastpage(true)
      }
      setLoading(false);
    }
 
  }, [page, isLastPage]);

  const infiniteScroll = useCallback(()=> {
    const scrollDifference = (document.documentElement.offsetHeight) - (window.innerHeight + document.documentElement.scrollTop);
    //if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
    if(scrollDifference < 100 || !isLastPage){
      let newPage = page + 1;
      setPage(newPage);
      getBooks();
    }
  }, [isLastPage, getBooks, page])


  useEffect(()=>{
    getBooks();
  },[getBooks])
  
  useEffect(()=>{
    if (search.length) {
      const filteredBooks= booksCollection.filter(function(book) {
        for (let i = 0; i < book?.charactersNames?.length; i++) {
          const character = book?.charactersNames[i];
          if (book?.authors[0]?.toLowerCase().includes(search.toLowerCase()) 
              || book?.publisher?.toLowerCase().includes(search.toLowerCase()) 
              || book?.isbn?.toLowerCase().includes(search.toLowerCase()) 
              || book?.name?.toLowerCase().includes(search.toLowerCase()) 
              || book?.released?.toLowerCase().includes(search.toLowerCase())
              || character?.name?.toLowerCase().includes(search.toLowerCase())){
            return true;
          }
        }
        return false;
      });
      setBooks(filteredBooks);
    }
  },[search, booksCollection])

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll)

    return () => {
      window.removeEventListener('scroll', infiniteScroll)
    }
  }, [infiniteScroll])

  return (
    <>
      <HeaderComponent />
      <div className="container">
        <h1 className="align-center">Books List</h1>
        <div className="row">
          <div className="left">
            
          </div>
          <div className="right">
            <input placeholder="Search..." onChange={(e) => setSearch(e.target.value)} className="align-right" />
          </div>
        </div>
        <br />
        <br />
        {
          loading === true ?
          <h3 className="align-center">Loading...</h3>
          :
          <table width="100%">
            <thead>
              <tr>
                <th>Publisher</th>
                <th>Name</th>
                <th>ISBN</th>
                <th>Authors</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {
                books.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                    <td>{item['publisher']}</td>
                    <td>{item['name']}</td>
                    <td>{item['isbn']}</td>
                    <td>{item['authors']}</td>
                    <td>{item['released']}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        }
      </div>
    </>
  );
}
