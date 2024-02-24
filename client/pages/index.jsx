
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { AHelmet, Book, NavBar } from "@/core/components"

const home = () => {
  const [books, setBooks] = useState([])
  const router = useRouter()
  useEffect(() => {
    fetch(`http://localhost:3001/get-books`, {
      method: "GET"
    }).then((response) => response.json()).then((res) => {
      setBooks(res)
    })
  }, [])
  const selectBook = (id) => {
    const result = books.find((book) => book._id === id)
    router.push(`books/${result._id}`)
  }
  return (
    <main>
      <NavBar />
      <div className="flex items-center gap-5 p-5 flex-wrap flex-col sm:flex-row">
        <AHelmet>BOOKMARK ME</AHelmet>
        {books.map((book) =>
          <div
            onClick={() => selectBook(book._id)}
            key={book._id}>
            <Book title={book.title} author={book.author} price={book.price} url={book.fileUrl} />
          </div>
        )}
      </div>
    </main>
  )
}
export default home





