import React, { useState } from "react";
import "./Demo.css";
import { useLazyGetSummaryQuery } from "../Services/Article";

const Demo = () => {
  const [selectedLength, setSelectedLength] = useState("Select length");
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [errorFlash, setErrorFlash] = useState("");
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the URL is valid before making the request
    if (!isValidURL(article.url)) {
      setErrorFlash("Invalid URL. Please check the URL and try again.");
      setTimeout(() => {
        setErrorFlash("");
      }, 5000); // Clear the error message after 5 seconds
      return;
    }

    // Check if the length is selected
    if (!isValidLength(selectedLength)) {
      setErrorFlash("Please select the length of the summary.");
      setTimeout(() => {
        setErrorFlash("");
      }, 5000); // Clear the error message after 5 seconds
      return;
    }

    setErrorFlash(""); // Clear any previous error messages

    const lengthMapping = {
      short: 1,
      brief: 3,
      detailed: 6,
    };

    const { data, error: summaryError } = await getSummary({
      articleUrl: article.url,
      length: lengthMapping[selectedLength],
    });

    if (summaryError) {
      setErrorFlash("Error generating summary. Please try again.");
      setTimeout(() => {
        setErrorFlash("");
      }, 5000); // Clear the error message after 5 seconds
      return;
    }
    // Here, it checks if data is not null or undefined, and if data has a property called summary. If both conditions are true, it enters the if
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);
      console.log(newArticle.summary);
    }
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const isValidLength = (length) => {
    return ["short", "brief", "detailed"].includes(length);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleDropDownChange = (e) => {
    setSelectedLength(e.target.value);
  };

  return (
    <div className="Demo-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="url"
            placeholder="Enter URL"
            value={article.url}
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            required
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSubmit} type="submit">
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </div>
        <div className="select-container">
          {/* Your select element */}
          <select
            className="select-styled"
            value={selectedLength}
            onChange={handleDropDownChange}
          >
            <option>Select length</option>
            <option value="short">Short</option>
            <option value="brief">Brief</option>
            <option value="detailed">Detailed</option>
          </select>
        </div>
      </form>
      {isFetching && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {errorFlash && (
        <div className="flash-message">
          {errorFlash}
        </div>
      )}
      <div className={`result ${article.summary ? "show" : ""}`}>
        {article.summary && <p>{article.summary}</p>}
      </div>
    </div>
  );
};

export default Demo;
