import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell
} from 'recharts';

const barData = [
  { name: 'JAN', CHN: 40, USA: 24, UK: 24 },
  { name: 'FEB', CHN: 30, USA: 13, UK: 22 },
  { name: 'MAR', CHN: 20, USA: 98, UK: 22 },
  { name: 'APR', CHN: 27, USA: 39, UK: 20 },
  { name: 'MAY', CHN: 18, USA: 48, UK: 21 },
  { name: 'JUN', CHN: 23, USA: 38, UK: 25 },
  { name: 'JUL', CHN: 34, USA: 43, UK: 21 },
  { name: 'AUG', CHN: 44, USA: 28, UK: 24 },
];

const pieData = [
  { name: 'Search Engines', value: 30 },
  { name: 'Direct Click', value: 30 },
  { name: 'Bookmarks Click', value: 40 },
];

const COLORS = ['#0088FE', '#00C49F', '#FF6384'];

const DashboardHome = () => {
  return (
    <div className=" ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-gradient-to-r from-pink-400 to-orange-400 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-sm">Weekly Sales</h3>
          <h2 className="text-2xl font-bold mt-2">$15,000</h2>
          <p className="text-sm mt-1">Increased by 60%</p>
        </div>

        {/* Card 2 */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-sm">Weekly Orders</h3>
          <h2 className="text-2xl font-bold mt-2">45,6334</h2>
          <p className="text-sm mt-1">Decreased by 10%</p>
        </div>

        {/* Card 3 */}
        <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-sm">Visitors Online</h3>
          <h2 className="text-2xl font-bold mt-2">95,5741</h2>
          <p className="text-sm mt-1">Increased by 5%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Visit And Sales Statistics</h3>
          <BarChart width={500} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="CHN" fill="#FF6384" />
            <Bar dataKey="USA" fill="#36A2EB" />
            <Bar dataKey="UK" fill="#9966FF" />
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
