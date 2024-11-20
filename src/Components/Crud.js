import React, { useState } from "react";

export default function Crud() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [active, setActive] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Two inputs filed
    const add = {
      name,
      address,
    };

    if (edit) {
      // Update data
      let update = [...data];
      update[active] = add;
      setMessage("Data updated successfully!");
      setData(update);
      setEdit(false);
      setActive(null);
    } else {
      // Add data
      setData([...data, add]);
      setMessage("Data added successfully!");
    }
    setName("");
    setAddress("");
    setTimeout(() => setMessage(""), 3000);
  };

  // Data show input
  const handleEdit = (index) => {
    const update = data[index];
    setName(update.name);
    setAddress(update.address);
    setActive(index);
    setEdit(true);
  };

  // Data Delete
  const handleDelete = (entry) => {
    if (window.confirm("Are you sure you want to delete?")) {
      let del = data.filter((item) => item !== entry);
      setData([...del]);
      setMessage("Data deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // View functionality
  const handleView = (entry) => {
    setActive(entry);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setActive(null);
  };

  // Check if both name and address fields are filled to enable the Add button
  const isFormValid = name.trim() !== "" && address.trim() !== "";

  return (
    <>
      <div className="crud-container">
        <h1>CRUD OPERATION</h1>

        {/* Display message */}
        {message && <div className="message">{message}</div>}

        {/* Form , input and add button */}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="input-field"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="input-field"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              type="submit"
              className="submit-button"
              disabled={!isFormValid}
            >
              {edit ? "Update" : "Add"}
            </button>
          </form>
        </div>

        {/* table contain */}

        <table className="data-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="tabel-overflow">
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.address}</td>
                <td>
                  <button
                    className="action-button"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-button"
                    onClick={() => handleDelete(entry)}
                  >
                    Delete
                  </button>
                  <button
                    className="action-button"
                    onClick={() => handleView(entry)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog Box */}
      <div open={isOpen} onClose={closeDialog}>
        {active && (
          <div className="overlay">
            <div className="dialog-box">
              <h2>View Details</h2>
              <p>
                <strong>Name:</strong> {active.name}
              </p>
              <p>
                <strong>Address:</strong> {active.address}
              </p>
              <button className="close-button" onClick={closeDialog}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
