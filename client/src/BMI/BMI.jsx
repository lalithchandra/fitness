import React, { useState } from "react";
import "./BMI.css"; // Make sure this path is correct

function BmiCalculator() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [bmiResult, setBmiResult] = useState("");

  const validateForm = (e) => {
    e.preventDefault(); // prevent default form submission behavior

    if (age === "" || height === "" || weight === "" || gender === "") {
      alert("All fields are required!");
    } else {
      countBmi();
    }
  };

  const countBmi = () => {
    const bmi = Number(weight) / (((Number(height) / 100) * Number(height)) / 100);

    let result = "";
    if (bmi < 18.5) {
      result = "Underweight";
    } else if (18.5 <= bmi && bmi <= 24.9) {
      result = "Healthy";
    } else if (25 <= bmi && bmi <= 29.9) {
      result = "Overweight";
    } else if (30 <= bmi && bmi <= 34.9) {
      result = "Obese";
    } else if (35 <= bmi) {
      result = "Extremely obese";
    }

    setBmiResult(result);
    // Do not reset the form immediately
  };

  const resetForm = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setGender("");
  };

  return (
    <div className="body-bmi">
      <h3 className="heading">
        <b>B</b>ody <b>M</b>ass <b>I</b>ndex calculator
      </h3>
      <form className="form-bmi" id="form-bmi" onSubmit={validateForm}>
        <div className="row-one-bmi">
          <p className="text-bmi">Age</p>
          <input
            type="text"
            className="text-input-bmi"
            id="age-bmi"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            autoComplete="off"
            required
          />
          <p className="text-bmi">Gender</p>
          <select
            className="dropdown-bmi"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        <div className="row-two-bmi">
          <p className="text-bmi">Height (cm)</p>
          <input
            type="text"
            className="text-input-bmi"
            id="height-bmi"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            autoComplete="off"
            required
          />
          <p className="text-bmi">Weight (kg)</p>
          <input
            type="text"
            className="text-input-bmi"
            id="weight-bmi"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <button type="submit" id="submit-bmi">
          Submit
        </button>
      </form>

      {bmiResult && (
        <div>
          <h1>{bmiResult}</h1>
          <h2>
            BMI:{" "}
            {parseFloat(
              Number(weight) /
                (((Number(height) / 100) * Number(height)) / 100)
            ).toFixed(2)}
          </h2>
        </div>
      )}
    </div>
  );
}

export default BmiCalculator;