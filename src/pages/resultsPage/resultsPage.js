import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchResult from "../../components/searchResult";
import { virailApiCall } from "../../services/service";

const ResultsPage = () => {
  const [arrivalTickets, setArrivaltickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const getArrivals = async () => {
    setLoading(true);
    const arrivalsMapping = state.arrivals.map((arv) => {
      return {
        date: state.departureDate,
        from: state.departure.value,
        to: arv,
      };
    });
    try {
      const arrivals = arrivalsMapping.map(async (arrival) => {
        const data = await virailApiCall(arrival);
        const cheapest = data.arrivalsData.reduce((prev, curr) =>
          prev.priceVal < curr.priceVal ? prev : curr
        );
        return { ...cheapest, to: data.label };
      });
      const data = await Promise.all(arrivals);
      setArrivaltickets(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!state || !state.departure || !state.departureDate || !state.arrivals) {
      return navigate("/", { replace: true });
    }
    getArrivals();
  }, []);

  return (
    <section>
      <div className="results-page-wrapper">
        <div className="results-page-header">
          {!loading && !arrivalTickets.length ? (
            <h1>No Results 😑</h1>
          ) : (
            <h1>Results 😀</h1>
          )}
        </div>
		{error && <h1>{error}</h1>}
        {loading && !arrivalTickets.length && !error ? (
          <h3 style={{ color: "white" }}>Loading please wait...</h3>
        ) : (
          arrivalTickets.map((arrivalTicket) => {
            return (
              <div className="results-page-searches" key={arrivalTicket.id}>
                <h3 className="dept-arrival-txt">
                  From {state.departure.label} to {arrivalTicket.to}
                </h3>
                <SearchResult
                  price={arrivalTicket.price}
                  duration={arrivalTicket.duration}
                  provider={arrivalTicket.provider}
                  transport={arrivalTicket.transport}
                />
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default ResultsPage;
