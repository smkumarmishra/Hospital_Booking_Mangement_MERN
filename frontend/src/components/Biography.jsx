import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            KituCare Hospital is a trusted healthcare institution dedicated to
            providing high-quality medical services and compassionate patient
            care. Established with the vision of improving community health,
            KituCare Hospital focuses on delivering reliable treatment, advanced
            medical facilities, and professional healthcare support to patients.
            The hospital is equipped with modern technology and a team of
            skilled doctors, nurses, and medical staff who work together to
            ensure the best possible treatment for every patient. KituCare
            Hospital offers a range of medical services including general
            consultation, emergency care, diagnostics, and specialized
            treatments. With a strong commitment to patient safety, comfort, and
            ethical medical practices, KituCare Hospital aims to build a
            healthier society and become a trusted name in healthcare services.
          </p>
          <p>We are all in 2020!</p>
          <p>KituCare Medical Institute</p>
          <p>
            KituCare Hospital is a trusted healthcare institution dedicated to
            providing high-quality medical services and compassionate patient
            care. Established with the vision of improving community health,
            KituCare Hospital focuses on delivering reliable treatment, advanced
            medical facilities, and professional healthcare support to patients.
            The hospital is equipped with modern technology and a team of
            skilled doctors, nurses, and medical staff who work together to
            ensure the best possible treatment for every patient. KituCare
            Hospital offers a range of medical services including general
            consultation, emergency care, diagnostics, and specialized
            treatments. With a strong commitment to patient safety, comfort, and
            ethical medical practices, KituCare Hospital aims to build a
            healthier society and become a trusted name in healthcare services.
          </p>
          <p>KituCare Medical Institute</p>
          <p>Creating a healthier tomorrow, one patient at a time.</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
