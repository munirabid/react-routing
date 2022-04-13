import { useEffect } from "react";
import { useParams, Route, useMatch, Link, Routes } from "react-router-dom";

import Comments from "./../components/comments/Comments";
import HighlightedQuote from "./../components/quotes/HighlightedQuote";
import { getSingleQuote } from "../lib/api";
import useHttp from "./../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const { sendRequest, status, data, error } = useHttp(getSingleQuote, true);

  const params = useParams();
  const match = useMatch();

  const { id } = params;

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (!data.text) {
    return <p>No data found</p>;
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  return (
    <div>
      <HighlightedQuote text={data.text} author={data.author} />
      <Routes>
        <Route
          path={match.path}
          exact
          element={
            <div className="centered">
              <Link className="btn--flat" to="/comments">
                Load Comments
              </Link>
            </div>
          }
        />
        <Route path="/comments" element={<Comments />} />
      </Routes>
    </div>
  );
};

export default QuoteDetail;
