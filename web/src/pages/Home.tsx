import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/books")
      .then((res) => setBooks(res.data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  type Book = {
    _id: string;
    title: string;
    author: string;
    publishYear: number;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books</h1>
        <Link to="/books/create">
          <button className="btn btn-primary bg-green-800 text-white p-4">
            Add Book
          </button>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="table w-full border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">ID</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md"></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: Book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-600 text-center rounded-md">
                  {index + 1}
                </td>
                <td className="border border-slate-600 text-center rounded-md">
                  {book.title}
                </td>
                <td className="border border-slate-600 text-center rounded-md max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-600 text-center rounded-md max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="border border-slate-600 text-center rounded-md">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-2xl text-blue-800" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-800" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
