import BookSingleCard from "./BookSingleCard";

type Book = {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
};

const BooksCard = ({ books }: { books: Book[] }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((item: Book) => (
        <BookSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default BooksCard;
