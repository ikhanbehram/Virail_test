const DateComponent = ({
	label,
	req
}) => {
 return (
	<div className="date-component">
    <label>{label}</label>
	{req && <label>*</label>}
    <input type="date"/>
  </div>
 );
};

export default DateComponent;
