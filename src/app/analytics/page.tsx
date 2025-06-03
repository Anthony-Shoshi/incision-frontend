"use client";

import React, { useState } from "react";
import SelectBox from "../../components/SelectBox";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const AnalyticsPage = () => {
  // Sample procedures with costs
  const procedures = [
    {
      name: "Spinal Injection",
      defaultCost: 150.25,
      optimizedCost: 140.10,
    },
    {
      name: "Turbinoplasty",
      defaultCost: 250.0,
      optimizedCost: 230.0,
    },
    {
      name: "Laryngoscopy",
      defaultCost: 180.75,
      optimizedCost: 175.5,
    },
  ];

  // State: selected procedure name
  const [selectedProcedure, setSelectedProcedure] = useState(procedures[0].name);

  // Get the selected procedure object
  const selectedData = procedures.find((p) => p.name === selectedProcedure);

  // Prepare data for bar chart
  const chartData = selectedData
    ? [
      { name: "Default Cost", value: selectedData.defaultCost, fill: "#3170c1" },
      { name: "Optimized Cost", value: selectedData.optimizedCost, fill: "#5eb0ac" },
    ]
    : [];

  // Handler for SelectBox change (you need to update SelectBox to accept onChange)
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProcedure(e.target.value);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Procedure Cost Breakdown</h1>

      {/* Simple select dropdown for procedures */}
      <div className="mb-6">
        <SelectBox
          label="Procedure Name"
          value={selectedProcedure}
          onChange={handleSelectChange}
          options={procedures.map((p) => ({ label: p.name, value: p.name }))}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow max-w-xl mx-auto">
        <BarChart
          width={600}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default AnalyticsPage;
