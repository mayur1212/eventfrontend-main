import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventManagement = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/events/${id}`)

      .then((res) => setEventData(res.data))
      .catch((err) => console.error('Error fetching event:', err));
  }, [id]);

  if (!eventData) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#1f0036] via-[#1a1440] to-[#06152b] text-white">
      <div className="flex items-center gap-4 mb-6">
        <button className="text-xl hover:text-pink-400 transition">←</button>
        <h1 className="text-3xl font-bold">{eventData.eventName} <span className="text-gray-400">(Venue Details)</span></h1>
      </div>

      <div className="flex gap-4 mb-6">
        {['Event Details', 'Assign Coordinator/Coordinator', 'Session Management', 'Generate SOW'].map((tab, idx) => (
          <button key={idx} className="px-4 py-2 rounded-lg bg-transparent border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-all">
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div>
          <label className="block text-sm font-medium mb-1">Search Coordinator</label>
          <select className="w-full bg-transparent border border-gray-400 p-2 rounded-lg focus:outline-none">
            <option>Select</option>
          </select>
          <p className="text-sm text-pink-400 mt-2 cursor-pointer hover:underline">Add New Coordinator</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">{eventData.eventName} <span className="text-gray-400">(Venue Here)</span></h2>
          <div className="flex gap-4 mb-2">
            <input type="text" value={eventData.startDate} readOnly className="bg-transparent border border-gray-400 p-2 rounded-lg w-full sm:w-1/2" />
            <input type="text" value={eventData.endDate} readOnly className="bg-transparent border border-gray-400 p-2 rounded-lg w-full sm:w-1/2" />
          </div>
          <input type="text" value={eventData.venue} readOnly className="bg-transparent border border-gray-400 p-2 rounded-lg w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
        <div className="bg-[#140920] border border-purple-600 rounded-xl p-4">
          {[1, 2, 3, 4, 5].map((room) => (
            <div key={room} className="bg-[#1a0d2e] rounded-lg p-3 mb-3 border border-pink-400 hover:shadow-lg transition-all">
              <h3 className="text-lg font-bold">Meeting Room {room} <span className="text-pink-400">★</span></h3>
              <p className="text-sm text-gray-300">Start from 12 Jan, 2023 – Ends at 15 Jan, 2023</p>
              <p className="text-sm font-semibold text-pink-400 mt-1">12 Positions</p>
            </div>
          ))}
        </div>

        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-4">Positions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-purple-600 rounded-lg">
              <thead>
                <tr className="bg-[#1f0036] text-pink-400">
                  <th className="p-2 border-r border-purple-600">Position</th>
                  <th className="p-2 border-r border-purple-600">Time</th>
                  <th className="p-2 border-r border-purple-600">Info</th>
                  <th className="p-2 border-r border-purple-600">Quantity</th>
                  <th className="p-2">Contractor</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(7)].map((_, i) => (
                  <tr key={i} className="bg-[#0e0a1f] border-t border-purple-600">
                    <td className="p-2">Camera 1 (Video)</td>
                    <td className="p-2">9 am - 7 pm</td>
                    <td className="p-2">LP default</td>
                    <td className="p-2">20</td>
                    <td className="p-2">
                      <select className="bg-transparent border border-gray-400 p-1 rounded-lg w-full">
                        <option>Select Contractor</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div />
            <div className="flex gap-2">
              <button className="text-lg hover:text-pink-400 transition">←</button>
              <div className="w-3 h-3 bg-pink-500 rounded-full" />
              <button className="text-lg hover:text-pink-400 transition">→</button>
            </div>
          </div>
          <button className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-600 py-2 rounded-xl font-bold text-lg hover:opacity-90 transition">
            Save Edits
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
