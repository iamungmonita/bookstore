export function getBooks() {
    return fetch('http://localhost:4000/get-books', {
        method: "GET"
    })
}
export function getAuthors() {
    return fetch('http://localhost:4000/get-authors', {
        method: "GET"
    })
}
