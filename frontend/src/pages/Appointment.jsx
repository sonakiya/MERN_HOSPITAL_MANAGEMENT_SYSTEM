import React, { useEffect, useState } from "react";
import AppointmentForm from "../components/AppointmentForm";
import Hero from "../components/Hero";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const [latestAppointment, setLatestAppointment] = useState(null);

  useEffect(() => {
    const fetchLatestAppointment = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/mypatientappointments",
          { withCredentials: true }
        );
        if (data.appointments && data.appointments.length > 0) {
          const sorted = data.appointments.sort(
            (a, b) => new Date(b.appointment_date) - new Date(a.appointment_date)
          );
          setLatestAppointment(sorted[0]);
        }
      } catch (error) {
        toast.error("Failed to fetch appointment status");
      }
    };
    fetchLatestAppointment();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "green";
      case "Pending":
        return "orange";
      case "Rejected":
        return "red";
      default:
        return "#ccc";
    }
  };

  return (
    <>
      <Hero
        title={"Schedule Your Appointment | ZeeCare Medical Institute"}
        imgUrl={"/signin.png"}
      />

      <AppointmentForm />

      {latestAppointment && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              borderLeft: `5px solid ${getStatusColor(latestAppointment.status)}`,
              backgroundColor: "#fff",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>My Latest Appointment</h3>
            <p>
              <strong>Doctor:</strong> Dr. {latestAppointment.doctor.firstName}{" "}
              {latestAppointment.doctor.lastName}
            </p>
            <p>
              <strong>Department:</strong> {latestAppointment.department}
            </p>
            <p>
              <strong>Date:</strong> {latestAppointment.appointment_date}
            </p>
            <p
              style={{
                fontWeight: "bold",
                color: getStatusColor(latestAppointment.status),
                marginTop: "0.5rem",
              }}
            >
              Status: {latestAppointment.status}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Appointment;
