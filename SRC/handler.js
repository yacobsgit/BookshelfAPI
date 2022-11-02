/* eslint-disable no-constant-condition */
/* eslint-disable no-const-assign */
/* eslint-disable no-cond-assign */
/* eslint-disable no-undef */

const { nanoid } = require('nanoid')
const books = require('./books')

const addbookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading
  } = request.payload
  if (name = undefined) { const response = h.response({ status: 'fail', message: 'Gagal menambahkan buku. Mohon isi nama buku' }); response.code(400); return response }
  if (readPage > pageCount) { const response = h.response({ status: 'fail', message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' }); response.code(400); return response }
  const id = nanoid(16)
  const finished = (pageCount === readPage)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  }
  push(newBook)

  const isSuccess = filter((book) => book.id === id).length > 0
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: id }
    })
    response.code(201)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllbooksHandler = (request, h) => {
  const { name, reading, finished } = request.query

  let filteredbooks = books
  if (name !== undefined) { filteredbooks = filteredbooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase())) }
  if (reading !== undefined) { filteredbooks = filteredbooks.filter((book) = books.reading === !!Number(reading)) }
  if (finished !== undefined) { filteredbooks = filteredbooks.filter((book) = _finished === !!Number(finished)) }
  const response = h.response({
    status: 'success',
    data: {
      books: filteredbooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }))
    }
  })
  response.code(200)
  return response
}

const getbookByIdHandler = (request, h) => {
  const { id } = request.params
  const book = filter((n) => n.id === id)[0]
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        books
      }
    }
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

const editbookByIdHandler = (request, h) => {
  const { id } = request.params
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading
  } = request.payload
  const updatedAt = new Date().toISOString()
  const index = findIndex((book) => book.id === id)
  if (index !== -1) {
    // eslint-disable-next-line no-constant-condition
    if (name = undefined) { const response = h.response({ status: 'fail', message: 'Gagal menambahkan buku. Mohon isi nama buku' }); response.code(400); return response }
    if (readPage > pageCount) { const response = h.response({ status: 'fail', message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' }); response.code(400); return response }
    const finished = (pageCount === readPage)
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deletebookByIdHandler = (request, h) => {
  const { id } = request.params
  const index = findIndex((book) => book.id === id)
  if (index !== -1) {
    splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  addbookHandler, getAllbooksHandler, getbookByIdHandler, editbookByIdHandler, deletebookByIdHandler
}
