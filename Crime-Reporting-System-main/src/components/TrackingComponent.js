import React, { useState } from 'react';
import './TrackingComponent.css'; // Importing the CSS file

const TrackingComponent = () => {
  const [caseID, setCaseID] = useState('');
  const [officer, setOfficer] = useState('');
  const [status, setStatus] = useState('');
  const [detailsRequest, setDetailsRequest] = useState('');

  const handleUpdate = (message) => {
    setStatus(message);
  };

  const handleCaseIDChange = (event) => {
    setCaseID(event.target.value);
  };

  const handleOfficerAssignment = (event) => {
    setOfficer(event.target.value);
  };

  const handleRequestDetails = (event) => {
    setDetailsRequest(event.target.value);
  };

  return (
    <div className="tracking-container">
      <h2>Seamless Communication & Tracking</h2>

      <div className="input-section">
        <label>Case Reference ID:</label>
        <input 
          type="text" 
          value={caseID} 
          onChange={handleCaseIDChange} 
          placeholder="Enter Case ID" 
        />

        <label>Officer Assigned:</label>
        <input 
          type="text" 
          value={officer} 
          onChange={handleOfficerAssignment} 
          placeholder="Officer's Name" 
        />

        <label>Request More Details/Document:</label>
        <input 
          type="text" 
          value={detailsRequest} 
          onChange={handleRequestDetails} 
          placeholder="Details/Document Request" 
        />
      </div>

      <div className="updates-section">
        <button onClick={() => handleUpdate(`Case #${caseID} has been updated.`)}>
          Update Status
        </button>
        <button onClick={() => handleUpdate(`Officer ${officer} assigned to the case.`)}>
          Assign Officer
        </button>
        <button onClick={() => handleUpdate(`Request for additional details: ${detailsRequest}`)}>
          Request More Info
        </button>
      </div>

      <div className="status-section">
        <h3>Status Updates:</h3>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default TrackingComponent;
