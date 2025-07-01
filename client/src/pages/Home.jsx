import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div className="animated-home">
        <section className="features-section py-5 bg-light mt-5 mb-5 ">
          <div className="container">
            <h2 className="text-center mb-5 fw-bold py-1" data-aos="fade-up">
              Platform Highlights
            </h2>

            <div className="row g-4 py-4">
              <div className="col-md-4" data-aos="zoom-in">
                <div className="card shadow feature-card text-center h-100">
                  <div className="card-body">
                    <i className="bi bi-person-lines-fill fs-1 text-success"></i>
                    <h5 className="mt-3">Smart Resume Hub</h5>
                    <p>Centralized place to upload and manage all resumes.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
                <div className="card shadow feature-card text-center h-100">
                  <div className="card-body">
                    <i className="bi bi-ui-checks-grid fs-1 text-success"></i>
                    <h5 className="mt-3">Custom Job Board</h5>
                    <p>Create, update, and manage job listings with ease.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4" data-aos="zoom-in" data-aos-delay="400">
                <div className="card shadow feature-card text-center h-100">
                  <div className="card-body">
                    <i className="bi bi-send-check-fill fs-1 text-success"></i>
                    <h5 className="mt-3">Status & Alerts</h5>
                    <p>Instant email alerts for job application progress.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4"></div>
        </section>

        <footer className="text-center py-4 text-white bg-dark">
          <p>Terms of Service | Privacy Policy</p>
          <p className="mb-0">
            Designed by NoJobs © {new Date().getFullYear()} — All Rights
            Reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;
