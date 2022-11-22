const DateComponent = ({ label, req, name, onChange, rest }) => {
  return (
    <div className="date-component">
      <label>{label}</label>
      {req && <label>*</label>}
      <input type="date" name={name} onChange={onChange} {...rest} />
    </div>
  );
};

export default DateComponent;
