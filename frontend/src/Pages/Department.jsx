import axios from "axios";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppointmentForm from "../components/AppointmentForm";
import { departments } from "../data/departments";
import { Context } from "../main";

const Department = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, authResolved } = useContext(Context);
  const warnedRef = useRef(false);

  useEffect(() => {
    if (!authResolved) return;
    if (isAuthenticated) return;
    if (warnedRef.current) return;
    warnedRef.current = true;
    toast.warning("Please login to view this department.");
    navigate("/login");
  }, [authResolved, isAuthenticated, navigate]);

  const department = useMemo(
    () => departments.find((d) => d.slug === slug),
    [slug]
  );

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(
          "https://hospital-backend-tpva.onrender.com/api/v1/user/doctors",
          { withCredentials: true },
        );
        setDoctors(Array.isArray(data?.doctors) ? data.doctors : []);
      } catch (e) {
        setDoctors([]);
        const status = e?.response?.status;
        const responseData = e?.response?.data;
        const serverMessage =
          responseData && typeof responseData === "object"
            ? responseData.message
            : undefined;
        console.error("Failed to load doctors:", {
          url: "https://hospital-backend-tpva.onrender.com/api/v1/user/doctors",
          status,
          message: e?.message,
          data: responseData,
        });
        setError(
          serverMessage ??
            (status ? `Failed to load doctors (HTTP ${status}).` : null) ??
            e?.message ??
            "Failed to load doctors.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const departmentDoctors = useMemo(() => {
    if (!department) return [];
    return doctors.filter((doc) => doc.doctorDepartment === department.name);
  }, [doctors, department]);

  if (!department) {
    return (
      <div className="container department-page">
        <div className="department-hero">
          <h1 className="department-title">Department Not Found</h1>
          <p className="department-subtitle">
            The department you are looking for does not exist.
          </p>
          <Link className="department-back" to="/">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container department-page">
        <div
          className="department-hero department-hero--with-bg"
          style={{ backgroundImage: `url(${department.imageUrl})` }}
        >
          <div className="department-hero-inner">
            <h1 className="department-title">{department.name}</h1>
            <p className="department-subtitle">
              Choose a doctor and book an appointment in {department.name}.
            </p>
          </div>
        </div>

        <div className="department-section">
          <div className="department-section-header">
            <h2>Available Doctors</h2>
            <span className="department-count">
              {loading ? "Loading..." : `${departmentDoctors.length} found`}
            </span>
          </div>

          {error ? <p className="department-error">{error}</p> : null}

          {loading ? (
            <div className="department-grid department-grid--loading">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="doctor-card doctor-card--skeleton" />
              ))}
            </div>
          ) : departmentDoctors.length === 0 ? (
            <p className="department-empty">
              No doctors are currently available in {department.name}.
            </p>
          ) : (
            <div className="department-grid">
              {departmentDoctors.map((doc) => (
                <div
                  key={doc._id ?? `${doc.email ?? ""}-${doc.phone ?? ""}`}
                  className="doctor-card"
                >
                  <div className="doctor-avatar">
                    {doc?.docAvatar?.url ? (
                      <img
                        src={doc.docAvatar.url}
                        alt={`${doc.firstName} ${doc.lastName}`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="doctor-avatar-fallback">
                        {`${doc?.firstName?.[0] ?? "D"}${doc?.lastName?.[0] ?? ""}`}
                      </div>
                    )}
                  </div>
                  <div className="doctor-meta">
                    <h3 className="doctor-name">
                      Dr. {doc.firstName} {doc.lastName}
                    </h3>
                    <p className="doctor-dept">{doc.doctorDepartment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AppointmentForm
        heading={`Book Appointment (${department.name})`}
        initialDepartment={department.name}
        lockDepartment={true}
      />
    </>
  );
};

export default Department;
