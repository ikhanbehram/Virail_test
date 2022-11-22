import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchResult from "../../components/searchResult";
import { virailApiCall } from "../../services/service";

const ResultsPage = () => {
  const [arrivalTickets, setArrivaltickets] = useState([]);
  const [loading, setLoading] = useState(false);
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
   const arrivals = arrivalsMapping.map(async (arrival) => {
      const data = await virailApiCall(arrival);
      const cheapest = data.arrivalsData.reduce((prev, curr) =>
        prev.priceVal < curr.priceVal ? prev : curr
      );
	  return {...cheapest, to: data.label};
    });
	 const data = await Promise.all(arrivals);
	 setArrivaltickets(data);
  };

  useEffect(() => {
    if (!state) {
      return navigate("/", { replace: true });
    }
    getArrivals();
  }, []);

  return (
    <section>
      <div className="results-page-wrapper">
        <div className="results-page-header">
          <h1>Results 😀</h1>
        </div>
        {loading && !arrivalTickets.length ? (
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
