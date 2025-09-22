import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Events = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [newEvent, setNewEvent] = useState(initialEventState());
  const navigate = useNavigate();


  function initialEventState() {
    return {
      eventName: '',
      clientName: '',
      contactNumber: '',
      email: '',
      password: '',
      venue: '',
      city: '',
      startDate: '',
      endDate: ''
    };
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/events`)

      .then(response => {
        setRows(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEvent) {
     axios.put(`${process.env.REACT_APP_API_BASE_URL}/events/${currentEvent._id}`, newEvent)

        .then((res) => {
          const updatedEvent = { ...newEvent, _id: currentEvent._id };
          setRows(rows.map(event => event._id === currentEvent._id ? updatedEvent : event));
          resetForm();
        })
        .catch(err => console.log(err));
    } else {
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/events`, newEvent)

        .then(response => {
          setRows([...rows, response.data]);
          resetForm();
        })
        .catch(err => console.log(err));
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setNewEvent(event);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}/events/${id}`)

      .then(() => {
        setRows(rows.filter(event => event._id !== id));
      })
      .catch(err => console.log(err));
  };

  const resetForm = () => {
    setNewEvent(initialEventState());
    setCurrentEvent(null);
    setModalOpen(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mt-4 mb-4">
        <h2 className="text-3xl font-bold text-pink-400">Event Requests</h2>
        <p className="text-gray-300 mt-1">Manage and review all current event requests</p>
      </div>

      {/* Top bar */}
      <div className="flex justify-between items-center mb-4 mx-2">
        <input
          type="text"
          placeholder="Search events..."
          className="px-4 py-2 w-1/3 bg-purple-800 border border-purple-600 text-white rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder:text-gray-400"
        />
        <button
          onClick={() => setModalOpen(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-5 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
        >
          + Add Event
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-lg shadow-lg border border-purple-800 mx-2">
        {loading ? (
          <div className="text-center py-4 text-white">Loading...</div>
        ) : (
          <table className="w-full table-auto text-sm">
            <thead className="bg-gradient-to-r from-pink-600 to-purple-700 text-white text-left">
              <tr>
                <th className="px-4 py-3">Event Name</th>
                <th className="px-4 py-3">Start Date</th>
                <th className="px-4 py-3">End Date</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Venue</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
  {rows.map((row, idx) => (
    <tr
      key={idx}
      onClick={() => navigate(`/dashboard/events/${row._id}`)}

      className="cursor-pointer bg-gradient-to-r from-purple-900 to-black border-b border-purple-800 hover:bg-purple-800 transition duration-300"
    >
      <td className="px-4 py-3">{row.eventName}</td>
      <td className="px-4 py-3">{formatDate(row.startDate)}</td>
      <td className="px-4 py-3">{formatDate(row.endDate)}</td>
      <td className="px-4 py-3">{row.clientName}</td>
      <td className="px-4 py-3">{row.contactNumber}</td>
      <td className="px-4 py-3">{row.venue}</td>
      <td className="px-4 py-3">{row.email}</td>
      <td className="px-4 py-3 flex space-x-2" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => handleEdit(row)} className="text-blue-500 hover:text-blue-700">
          Edit
        </button>
        <button onClick={() => handleDelete(row._id)} className="text-red-500 hover:text-red-700">
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-3 pb-4">
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            className="w-10 h-10 rounded-full bg-purple-700 hover:bg-pink-500 transition-all duration-300 font-semibold"
          >
            {num}
          </button>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4 text-black">{currentEvent ? 'Edit Event' : 'Add New Event'}</h3>
            <form onSubmit={handleSubmit}>
              {[
                { name: 'eventName', placeholder: 'Event Name' },
                { name: 'clientName', placeholder: 'Client Name' },
                { name: 'contactNumber', placeholder: 'Contact Number' },
                { name: 'venue', placeholder: 'Venue' },
                { name: 'email', placeholder: 'Email', type: 'email' },
                // { name: 'password', placeholder: 'Password', type: 'password' }, // optional
              ].map(({ name, placeholder, type = 'text' }) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  value={newEvent[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="mb-4 p-2 w-full border-2 border-black rounded-md text-black"
                />
              ))}
              <input
                type="date"
                name="startDate"
                value={newEvent.startDate}
                onChange={handleChange}
                className="mb-4 p-2 w-full border-2 border-black rounded-md text-black"
              />
              <input
                type="date"
                name="endDate"
                value={newEvent.endDate}
                onChange={handleChange}
                className="mb-4 p-2 w-full border-2 border-black rounded-md text-black"
              />
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-300 rounded-md text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-500 text-white rounded-md"
                >
                  {currentEvent ? 'Update' : 'Add'} Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
