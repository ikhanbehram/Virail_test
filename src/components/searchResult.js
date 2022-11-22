const SearchResult = ({ price, duration, expired, provider, transport }) => {
  return (
    <div
      className="search-result-wrapper"
      style={{
        background: !expired
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(251, 101, 143, 0.3)",
      }}
    >
      <div className="search-result-icon">
        {transport === "bus" ? (
          <span>🚌</span>
        ) : transport === "train" ? (
          <span>🚂</span>
        ) : transport === "plane" ? (
          <span>🛩</span>
        ) : (
          <span>🚘</span>
        )}
      </div>
      <div className="search-result-desc">
        <h5>Duration: {duration}</h5>
        <h5>Provider: {provider}</h5>
      </div>
      <div className="search-result-price">{price}</div>
    </div>
  );
};

export default SearchResult;
