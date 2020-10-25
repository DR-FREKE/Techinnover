import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { setCustomer } from "../../ReduxStore/action/action.creator";

const Customer = (props) => {
  let idRef = useRef(null);
  const [state, setState] = useState({
    name: "",
    age: "",
    email: "",
    familyMember: [{ member_name: "", relation: "", member_age: "" }],
    passport_pic: null,
    dob: null,
    isValid: false,
    file: `${process.env.PUBLIC_URL}/avatar.webp`,
  });
  useEffect(() => {
    validateForm();
    if (props.message) {
      alert(props.message);
    }
  }, [
    state.age,
    state.name,
    state.email,
    state.passport_pic,
    state.dob,
    props.message,
    props.fail_message,
  ]);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const onFileChange = (event) => {
    setState({
      ...state,
      passport_pic: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    });
  };
  const handleFamChange = (event, index) => {
    const values = [...state.familyMember];
    values[index][event.target.name] = event.target.value;
    setState({
      ...state,
      familyMember: values,
    });
  };

  const validateForm = () => {
    if (
      checkAge() &&
      state.name.length > 0 &&
      state.email.length > 0 &&
      state.dob != null &&
      state.passport_pic != null &&
      isAgeMatchDOB()
    ) {
      setState({
        ...state,
        isValid: true,
      });
    } else {
      setState({
        ...state,
        isValid: false,
      });
    }
  };
  const checkAge = () => {
    if (state.age >= 18 && state.age <= 65) {
      return true;
    } else {
      return false;
    }
  };
  const isAgeMatchDOB = () => {
    const ageEntered = state.age * 31556952000;
    const dobEntered = new Date(state.dob).getTime();

    const cal_age = Date.now() - dobEntered;
    const diff = new Date(cal_age);

    const dobToAge = Math.abs(diff.getUTCFullYear() - 1970) * 31556952000;

    if (parseInt(ageEntered) == dobToAge) {
      return true;
    } else {
      return false;
    }
  };

  const addMoreForms = () => {
    // add more input forms for members
    setState({
      ...state,
      familyMember: [
        ...state.familyMember,
        { member_name: "", relation: "", member_age: "" },
      ],
    });
  };

  const removeForm = (index) => () => {
    const values = [...state.familyMember];
    values.splice(index, 1);

    setState({
      ...state,
      familyMember: values,
    });
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("age", state.age);
    formData.append("email", state.email);
    formData.append("familyMember", JSON.stringify(state.familyMember));
    formData.append(
      "dob",
      new Date(state.dob).toLocaleDateString().replace(/\//g, "-")
    );
    formData.append("passport", state.passport_pic);
    const size = 1024 * 1024;

    if (state.passport_pic.size > size) {
      alert("file too large");
    } else {
      props.setCustomer(formData);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="grid">
        <div className="form-box">
          <div className="form-div">
            <div className="form-header">
              <div className="header-topic">Customer Form</div>
              <span>
                Welcome to Techinnover Survey Form, please fill in the
                necessary.
              </span>
            </div>
            <div className="form-body">
              <form className="form" onSubmit={onSubmit}>
                <div className="container">
                  <div className="row">
                    <div className="col col-md-12">
                      <div className="input-div filer">
                        <input
                          type="file"
                          placeholder="upload"
                          onChange={onFileChange}
                          accept=".jpg"
                          hidden
                          ref={idRef}
                        />
                        <img
                          src={state.file}
                          alt=""
                          onClick={() => idRef.current.click()}
                        />
                      </div>
                      <span className="filer-text">Passport here</span>
                    </div>
                    <div className="col col-8">
                      <div className="input-div">
                        <input
                          type="text"
                          name="name"
                          value={state.name}
                          onChange={handleChange}
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div className="col col-4">
                      <div className="input-div">
                        <input
                          type="text"
                          name="age"
                          value={state.age}
                          onChange={handleChange}
                          placeholder="Age"
                        />
                      </div>
                    </div>
                    <div className="col col-8">
                      <div className="input-div">
                        <input
                          type="email"
                          name="email"
                          value={state.email}
                          placeholder="enter your mail"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col col-4">
                      <div className="input-div">
                        <DatePicker
                          selected={state.dob}
                          onChange={(date) => setState({ ...state, dob: date })}
                          placeholderText="dob"
                          name="dob"
                          isClearable
                          closeOnScroll={true}
                        />
                        {/* <input
                          type="date"
                          name="dob"
                          value={state.dob}
                          placeholder="date of birth"
                          onChange={handleChange}
                        /> */}
                      </div>
                    </div>
                    <div className="col-md-12 py-2">
                      {state.familyMember.map((content, index) => (
                        <>
                          <div className="member-div" key={index}>
                            <div className="divider"></div>
                            <div className="member-container py-3">
                              <div className="member-head">
                                <div className="topic">
                                  <span>Family Member</span>
                                </div>
                                <div className="add-more-div">
                                  {index > 0 && (
                                    <button
                                      className="remove"
                                      type="button"
                                      onClick={removeForm(index)}>
                                      <i className="fa fa-minus"></i>
                                    </button>
                                  )}
                                  <button
                                    className="add-more"
                                    type="button"
                                    onClick={addMoreForms}>
                                    <i className="fa fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="member-body">
                                <div className="row">
                                  <div className="col col-12">
                                    <div className="input-div">
                                      <input
                                        type="text"
                                        name="member_name"
                                        value={content.member_name}
                                        placeholder="Name"
                                        onChange={(event) =>
                                          handleFamChange(event, index)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col col-6">
                                    <div className="input-div">
                                      <input
                                        type="text"
                                        name="relation"
                                        value={content.relation}
                                        placeholder="Relationship"
                                        onChange={(event) =>
                                          handleFamChange(event, index)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col col-6">
                                    <div className="input-div">
                                      <input
                                        type="text"
                                        name="member_age"
                                        value={content.member_age}
                                        placeholder="Age"
                                        onChange={(event) =>
                                          handleFamChange(event, index)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                    <div className="col-md-12">
                      <div className="btn-div">
                        <button
                          type="button"
                          onClick={onSubmit}
                          style={{
                            backgroundColor: state.isValid
                              ? "#490d40"
                              : "#e5e7e9",
                          }}
                          disabled={!state.isValid}>
                          {!props.loading ? "Submit Form" : "loading..."}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="image-box">
          <div className="img-holder">
            <img src={`${process.env.PUBLIC_URL}/landing.png`} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.customers.message,
  fail_message: state.customers.fail_message,
  loading: state.customers.loading,
});

export default connect(mapStateToProps, { setCustomer })(Customer);
