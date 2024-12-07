import React, { useState, useEffect } from "react";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const [showForm, setShowForm] = useState(false); // Added showForm state to control form visibility

  // Fetch vehicles when the component mounts
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true); // Set loading state to true when fetching
    try {
      const response = await fetch("http://localhost:8000/accounts/get_vehicles", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Send token to authenticate
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setVehicles(data); // Set vehicles data if available
      } else {
        throw new Error("Failed to fetch vehicles");
      }
    } catch (error) {
      setError("Error fetching vehicles.");
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false); // Set loading to false once the fetch is done
    }
  };

  const handleAddVehicleClick = () => {
    console.log("Add Vehicle button clicked!");
    setShowForm(true); // Show the form when the button is clicked
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form submitted");

    const vehicleType = e.target.vehicleType.value;
    const vehicleModel = e.target.vehicleModel.value;
    const modelYear = e.target.modelYear.value;
    const rcNumber = e.target.rcNumber.value;
    const licenseNumber = e.target.licenseNumber.value;

    const vehicleData = {
      vehicleType: vehicleType,  // Form field values
      vehicleModel: vehicleModel,
      modelYear: modelYear,
      rcNumber: rcNumber,
      licenseNumber: licenseNumber,
    };
  
    try {
      const response = await fetch('http://localhost:8000/accounts/add_vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,  // If you're using JWT
        },
        body: JSON.stringify(vehicleData),
        credentials: 'include',  // Send credentials (cookies, session)
      });
  
      if (!response.ok) {
        throw new Error('Failed to add vehicle');
      }
  
      const data = await response.json();
      console.log('Vehicle added successfully:', data);
      // Optionally handle success (e.g., clear form, show confirmation)
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <div>
      <main>
        <div className="container">
          {error && <div className="error-message">{error}</div>} {/* Show error message */}
          {loading && <div className="loading-message">Loading...</div>} {/* Show loading message */}

          {/* Display vehicles if available */}
          {vehicles.length > 0 && (
            <div id="vehicleDisplay" className="vehicle-display">
              {vehicles.map((vehicle, index) => (
                <div className="vehicle-box" key={index}>
                  <h4>{vehicle.vehicleType}</h4>
                  <p><b>Model:</b> {vehicle.vehicleModel}</p>
                  <p><b>Year:</b> {vehicle.modelYear}</p>
                  <p><b>RC Number:</b> {vehicle.rcNumber}</p>
                  <p><b>License:</b> {vehicle.licenseNumber}</p>
                </div>
              ))}
            </div>
          )}

          {/* Show Add Vehicle button only if the form is not visible */}
          {!showForm && (
            <button id="addVehicleBtn" className="btn" onClick={handleAddVehicleClick}>
              Add Vehicle
            </button>
          )}

          {/* Vehicle registration form */}
          {showForm && (
            <div id="vehicleForm" className="form-box">
              <h3>Register Vehicle</h3>
              <form id="vehicleDetailsForm" onSubmit={handleFormSubmit}>
                <label htmlFor="vehicleType">Vehicle Type:</label>
                <select id="vehicleType" name="vehicleType" required>
                  <option value="Car">Car</option>
                  <option value="Truck">Truck</option>
                  <option value="Bus">Bus</option>
                </select>

                <label htmlFor="vehicleModel">Vehicle Model:</label>
                <input
                  type="text"
                  id="vehicleModel"
                  name="vehicleModel"
                  placeholder="e.g., Toyota"
                  required
                />

                <label htmlFor="modelYear">Model Year:</label>
                <input
                  type="number"
                  id="modelYear"
                  name="modelYear"
                  placeholder="e.g., 2023"
                  required
                />

                <label htmlFor="rcNumber">RC Number:</label>
                <input
                  type="text"
                  id="rcNumber"
                  name="rcNumber"
                  placeholder="e.g., ABC1234"
                  required
                />

                <label htmlFor="licenseNumber">Driving License:</label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  placeholder="e.g., DL123456"
                  required
                />

                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
