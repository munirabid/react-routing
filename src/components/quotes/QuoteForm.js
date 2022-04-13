import { useRef, useState } from "react";

import classes from "./QuoteForm.module.css";
import Card from "./../UI/Card";
import LoadingSpinner from "./../UI/LoadingSpinner";

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const formFocusHandler = () => {
    console.log("clicked");
    setIsFocused(true);
  };

  const finishEnteringData = () => {
    setIsFocused(false);
  };

  return (
    <div>
      <Card>
        <form
          onFocus={formFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringData} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default QuoteForm;
