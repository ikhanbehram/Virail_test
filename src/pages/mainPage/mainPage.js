import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectCreatable from "../../components/creatableSelect";
import DateComponent from "../../components/dateComponent";
import { autoCompleteApi, virailApiCall } from "../../services/service";
import { mapApiData } from "../../utils";

const MainPage = () => {
  const navigate = useNavigate();
  const [departure, setDeparture] = useState(null);
  const [arrivals, setArrivals] = useState([]);
  const [departureDate, setDepartureDate] = useState(null);
  const [errors, setErrors] = useState(null);

  const onChangeDeparture = ({value}) => {
	setDeparture(value);
  }

  const cityOptions = async (inputValue) => {
		const {data} = await autoCompleteApi(inputValue);
		return mapApiData(data.results);	
  };

  const onSubmit = async (e) => {
    e.preventDefault();
	if (!departure || !arrivals || !arrivals.length || !departureDate) {
		setErrors('Looks like there is problem in form!');
		return;
	} else {
		setErrors(null);
		console.log(departure, arrivals, departureDate);
		const callApi = await virailApiCall();
		console.log(callApi);
	}
    // navigate("/results");
  };
  return (
    <section>
      <div className="main-page-wrapper">
        <div className="main-header">
          <div className="main-header-heading">
            <h1>Find the cheapest ticket for your trip</h1>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div className="main-search">
            <div className="departure-input">
              <SelectCreatable
                label="Departure"
                placeholderText="Your Departure"
				onChange={onChangeDeparture}
				promiseOptions={cityOptions}
              />
            </div>
            <div className="arrival-input">
              <SelectCreatable
                isMulti={true}
                label="Arrivals"
                placeholderText="Your Arrivals"
                onChange={(arrival) => {
                  setArrivals(arrival);
                }}
				promiseOptions={cityOptions}
              />
            </div>
            <div className="departure-date">
              <DateComponent
                label="Departure Date"
                name="departureDate"
                onChange={(e) => {
                  setDepartureDate(e.target.value);
                }}
              />
            </div>
            <button type="submit" onClick={onSubmit}>
              Submit
            </button>
          </div>
		{errors && <span className="error-msg">{errors}</span>}
        </form>
      </div>
    </section>
  );
};

export default MainPage;
