import { Link } from "react-router-dom";

const Card = ({ id, thumbnail, title, rating }) => {
  return (
    <Link to={`/movies/${id}`}>
      <div className="hover:scale-105 transition cursor-pointer">
        <img
          src={thumbnail}
          alt={title}
          className="rounded-lg"
        />

        

        <h3 className="text-gray-100 text-sm font-bold mt-2 truncate">
          {title}
        </h3>
        <p className="text-yellow-400 text-xs">
          ⭐⭐⭐⭐ {rating}
        </p>
      </div>
      
    </Link>
  );
};

export default Card;


