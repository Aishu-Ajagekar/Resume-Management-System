import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#198754", "#0d6efd", "#dc3545", "#ffc107", "#6610f2", "#20c997"];

const JobApplicationsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/jobapplication/admin/job-applications-count`);
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch job application data", err);
      }
    };

    fetchJobData();
  }, []);

  return (
    <div className="container mt-5">
      <h4 className="text-center mb-4">Candidates per Job Role</h4>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="candidates"
            nameKey="job"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default JobApplicationsChart;
