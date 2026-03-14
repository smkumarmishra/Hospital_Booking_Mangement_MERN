import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { departments } from "../data/departments";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";

const Departments = () => {
  const { isAuthenticated, authResolved } = useContext(Context);
  const navigate = useNavigate();

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="container departments">
        <h2>Departments</h2>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            // "superLargeDesktop",
            // "desktop",
            "tablet",
            "mobile",
          ]}
        >
          {departments.map((depart) => {
            return (
              <Link
                key={depart.slug}
                className="card depart-card"
                to={`/departments/${depart.slug}`}
                aria-label={`Open ${depart.name} department`}
                onClick={(e) => {
                  if (!authResolved) return;
                  if (isAuthenticated) return;
                  e.preventDefault();
                  toast.warning("Please login to view departments.");
                  navigate("/login");
                }}
              >
                <div className="depart-name">{depart.name}</div>
                <img src={depart.imageUrl} alt="Department" />
              </Link>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Departments;
