
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { AHelmet, Book, Dropdown, NavBar } from "@/core/components"
import { Footer } from "@/core/layout"
import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import { getAuthors } from "@/services"

import useApi from "@/useApi"
import { constCategoryId } from "@/constant/categoryId"
const home = () => {
  const [books, setBooks] = useState([])
  const [refresh, setRefresh] = useState(false)
  const router = useRouter()
  const promiseAuthor = () => Promise.resolve(getAuthors())
  const { response } = useApi({ service: promiseAuthor(), effect: [] })
  const [authors, setAuthors] = useState([])
  const [authorName, setAuthorName] = useState('')
  const [category, setCategory] = useState()



  const selectBook = (id) => {
    const result = books.find((book) => book._id === id)
    router.push(`books/${result._id}`)
  }
  useEffect(() => {
    fetch(`http://localhost:4000/get-books`, {
      method: "GET"
    }).then((response) => response.json()).then((res) => {
      setBooks(res)
    })
  }, [])

  useEffect(() => { setAuthors(response) }, [response])
  const [dropdown, setDropdown] = useState(false)
  const filterBookByAuthor = (id, name) => {
    setAuthorName(name)
    fetch(`http://localhost:4000/authors?authorId=${id}`, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => setBooks(data))
    setDropdown(false)
  }
  const filterBookByCategory = (id, name) => {
    setCategory(name)
    fetch(`http://localhost:4000/books?categoryId=${id}`, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => setBooks(data))
    setDropdown(false)
  }
  const filterRef = useRef()
  const outsideClick = (e) => {
    if (filterRef.current && !filterRef.current.contains(e.target)) {
      setDropdown(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', outsideClick)
    return () => {
      document.removeEventListener('click', outsideClick)
    }
  }, [])

  return (
    <main >
      <NavBar />
      <div className="flex items-center gap-5 ml-5 mt-5 relative  hover:cursor-pointer" ref={filterRef}>
        <p className="font-semibold">Sort By:</p>
        <div className="flex items-center border w-48 ">

          <Dropdown
            items={authors}
            label=""
            sendFunction={(id, name) => { filterBookByAuthor(id, name) }} />
        </div>
        <div className="flex items-center border w-48">
          <Dropdown
            items={constCategoryId}
            label=""
            sendFunction={(id, name) => { filterBookByCategory(id, name) }} />
        </div>
      </div>
      <div className="flex items-center gap-5 p-5 flex-wrap flex-col sm:flex-row">
        <AHelmet>BOOKMARK ME</AHelmet>
        {books.length ? books.map((book) =>
          <div
            onClick={() => selectBook(book._id)}
            key={book._id}>
            <Book title={book.title} author={book.author} price={book.price} url={book.fileUrl} />
          </div>
        ) : `no book from ${authorName}`}
      </div>
      <Footer />
    </main >
  )
}
export default home





