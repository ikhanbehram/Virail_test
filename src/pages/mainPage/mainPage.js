import SelectCreatable from "../../components/creatableSelect";
import DateComponent from "../../components/dateComponent";

const MainPage = () => {
  const onSubmit = (e) => {
    e.preventDefault();
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
              <SelectCreatable label="Departure" placeholderText="Your Departure" />
            </div>
            <div className="arrival-input">
              <SelectCreatable isMulti={true} label="Arrivals" placeholderText="Your Arrivals" />
            </div>
            <div className="departure-date">
              <DateComponent label="Departure Date" />
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MainPage;
