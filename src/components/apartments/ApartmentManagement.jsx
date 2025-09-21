import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApartmentManagement = () => {
  const [apartments, setApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [mapData, setMapData] = useState([]);

  const fetchApartments = async () => {
    try {
      const res = await getAllApartments();
      setApartments(res.data);

      // Convert full address to lat/lng using Google Geocoding API
      const geocoded = await Promise.all(
        res.data.map(async (apt) => {
          const encodedAddress = encodeURIComponent(apt.location);
          const geoRes = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=YOUR_GOOGLE_MAPS_API_KEY`
          );
          const geoData = await geoRes.json();
          if (geoData.status === "OK") {
            const { lat, lng } = geoData.results[0].geometry.location;
            return { ...apt, lat, lng };
          }
          return { ...apt, lat: 0, lng: 0 };
        })
      );
      setMapData(geocoded);
    } catch (error) {
      toast.error("Failed to fetch apartments");
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const handleEdit = (apartment) => {
    setSelectedApartment(apartment);
  };

  const handleSaved = () => {
    setSelectedApartment(null);
    fetchApartments();
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={1000} />

      <h2 className="mb-4">Apartment Management</h2>

      <div className="row">
        <div className="col-md-4">
          <h4>{selectedApartment ? "Edit Apartment" : "Add New Apartment"}</h4>
        </div>

        <div className="col-md-8">
          <h4>All Apartments</h4>
    
          <h4 className="mt-4">Apartments on Map</h4>
          
        </div>
      </div>
    </div>
  );
};

export default ApartmentManagement;
