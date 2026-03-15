import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { departments } from "../data/departments";

const AppointmentForm = ({
  // eslint-disable-next-line react/prop-types
  initialDepartment,
  // eslint-disable-next-line react/prop-types
  lockDepartment = false,
  // eslint-disable-next-line react/prop-types
  heading = "Appointment",
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState(
    initialDepartment ?? departments?.[0]?.name ?? "Pediatrics",
  );
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    if (initialDepartment) {
      setDepartment(initialDepartment);
      setDoctorFirstName("");
      setDoctorLastName("");
    }
  }, [initialDepartment]);

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "https://hospital-backend-tpva.onrender.com/api/v1/doctors",
        { withCredentials: true },
      );
      setDoctors(data.doctors);
      console.log(data.doctors);
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) => doctor.doctorDepartment === department,
  );
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "https://hospital-backend-tpva.onrender.com/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment(
        lockDepartment
          ? (initialDepartment ?? department)
          : (initialDepartment ?? departments?.[0]?.name ?? "Pediatrics"),
      );
      setDoctorFirstName("");
      setDoctorLastName("");
      setHasVisited(false);
      setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <div className="form-shell form-shell--appointment">
          <div className="form-shell__aside" aria-hidden="true">
            <div className="form-shell__badge">Appointments</div>
            <h2 className="form-shell__asideTitle">Book your visit</h2>
            <p className="form-shell__asideText">
              Choose a department, select a doctor, and pick a date that works
              for you.
            </p>
            <img className="form-shell__asideArt" src="/services.png" alt="" />
          </div>

          <div className="form-shell__content">
            <div className="form-shell__header">
              <h2 className="form-shell__title">{heading}</h2>
              <p className="form-shell__subtitle">
                Please enter accurate information to confirm your appointment.
              </p>
            </div>

            <form className="form-shell__form" onSubmit={handleAppointment}>
              <div className="form-section">
                <div className="form-section__title">Patient Details</div>

                <div className="form-grid2">
                  <div className="form-field form-field--icon form-field--user">
                    <label htmlFor="ap-first-name">First Name</label>
                    <input
                      id="ap-first-name"
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="form-field form-field--icon form-field--user">
                    <label htmlFor="ap-last-name">Last Name</label>
                    <input
                      id="ap-last-name"
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid2">
                  <div className="form-field form-field--icon form-field--email">
                    <label htmlFor="ap-email">Email</label>
                    <input
                      id="ap-email"
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-field form-field--icon form-field--phone">
                    <label htmlFor="ap-phone">Mobile Number</label>
                    <input
                      id="ap-phone"
                      type="number"
                      placeholder="Mobile Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid2">
                  <div className="form-field form-field--icon form-field--id">
                    <label htmlFor="ap-nic">NIC</label>
                    <input
                      id="ap-nic"
                      type="number"
                      placeholder="NIC"
                      value={nic}
                      onChange={(e) => setNic(e.target.value)}
                    />
                  </div>
                  <div className="form-field form-field--icon form-field--calendar">
                    <label htmlFor="ap-dob">Date of Birth</label>
                    <input
                      id="ap-dob"
                      type="date"
                      placeholder="Date of Birth"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid2">
                  <div className="form-field form-field--icon form-field--gender">
                    <label htmlFor="ap-gender">Gender</label>
                    <select
                      id="ap-gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="form-field form-field--icon form-field--calendar">
                    <label htmlFor="ap-date">Appointment Date</label>
                    <input
                      id="ap-date"
                      type="date"
                      placeholder="Appointment Date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="form-section__title">Appointment Details</div>

                <div className="form-grid2">
                  <div className="form-field form-field--icon form-field--dept">
                    <label htmlFor="ap-department">Department</label>
                    <select
                      id="ap-department"
                      value={department}
                      onChange={(e) => {
                        setDepartment(e.target.value);
                        setDoctorFirstName("");
                        setDoctorLastName("");
                      }}
                      disabled={lockDepartment}
                    >
                      {departments.map((depart) => {
                        return (
                          <option value={depart.name} key={depart.slug}>
                            {depart.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-field form-field--icon form-field--doctor">
                    <label htmlFor="ap-doctor">Doctor</label>
                    <select
                      id="ap-doctor"
                      value={
                        doctorFirstName || doctorLastName
                          ? JSON.stringify({
                              firstName: doctorFirstName,
                              lastName: doctorLastName,
                            })
                          : ""
                      }
                      onChange={(e) => {
                        const { firstName, lastName } = JSON.parse(
                          e.target.value,
                        );
                        setDoctorFirstName(firstName);
                        setDoctorLastName(lastName);
                      }}
                      disabled={!department}
                    >
                      <option value="">Select Doctor</option>
                      {filteredDoctors.length === 0 ? (
                        <option value="" disabled>
                          No doctors available
                        </option>
                      ) : (
                        filteredDoctors.map((doctor) => (
                          <option
                            key={
                              doctor._id ??
                              `${doctor.email ?? ""}-${doctor.phone ?? ""}`
                            }
                            value={JSON.stringify({
                              firstName: doctor.firstName,
                              lastName: doctor.lastName,
                            })}
                          >
                            {doctor.firstName} {doctor.lastName}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-field form-field--icon form-field--location form-field--textarea">
                  <label htmlFor="ap-address">Address</label>
                  <textarea
                    id="ap-address"
                    rows="10"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                  />
                </div>
              </div>

              <div className="form-toggleRow">
                <span>Have you visited before?</span>
                <input
                  type="checkbox"
                  checked={hasVisited}
                  onChange={(e) => setHasVisited(e.target.checked)}
                />
              </div>

              <button className="form-shell__btn" type="submit">
                GET APPOINTMENT
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
