import AsyncSelect from "react-select/async";

const SelectCreatable = ({
  isMulti,
  name,
  label,
  placeholderText,
  req,
  options,
  disabled,
  promiseOptions,
  ...rest
}) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid lightgrey",
      padding: 6,
      fontSize: "0.9rem",
      backgroundColor: state.isFocused ? "lightgrey" : "#fff",
      color: "#2b2d2f",
    }),
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "1px solid #35d1f5" : "1px solid lightgrey",
      borderColor: "#35d1f5",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "8px",
      width: "100%",
      boxShadow: state.isFocused
        ? "0rem 0rem 0rem 0.125rem rgba(129, 227, 249, 1)"
        : "",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "14px",
      textTransform: "capitalize",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#2b2d2f",
      fontSize: "14px",
    }),
    menu: (provided) => ({
      ...provided,
      border: "1px solid lightgrey",
      borderRadius: "8px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      width: "80%",
    }),
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: "#9b9b9b",
      fontSize: "14px",
      fontWeight: "500",
      textTransform: "capitalize",
    }),
    multiValue: (provided) => ({
      ...provided,
      color: "#9b9b9b",
      fontSize: ".8rem",
      height: "1.rem",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      display: "none",
    }),
  };

  return (
    <>
      <div>
        <label>{label}</label>
        {req && <label>*</label>}
      </div>
      <AsyncSelect
        isMulti={isMulti}
        name={name}
        placeholder={placeholderText}
        isDisabled={disabled}
        styles={customStyles}
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        {...rest}
      />
    </>
  );
};

export default SelectCreatable;
