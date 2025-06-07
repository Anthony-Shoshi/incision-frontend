"use client";
import SelectBox from '@/components/SelectBox';
import { useState } from 'react';
import Head from 'next/head';

const ProcedureResultsPage = () => {
  const procedures = [
    { name: "Spinal Injection", specialty: "Ear_Nose", defaultCost: 150.25, avgSurgeonCost: 0.0, optimizedCost: 145.1 },
    { name: "Turbinoplasty", specialty: "Ear_Throat", defaultCost: 150.25, avgSurgeonCost: 0.0, optimizedCost: 145.1 },
    { name: "Laryngoscopy - Flexible", specialty: "Nose_Throat", defaultCost: 150.25, avgSurgeonCost: 0.0, optimizedCost: 145.1 },
    { name: "Baha Procedure", specialty: "Throat", defaultCost: 150.25, avgSurgeonCost: 0.0, optimizedCost: 145.1 },
    { name: "Septorhinoplasty", specialty: "Ear", defaultCost: 150.25, avgSurgeonCost: 0.0, optimizedCost: 145.1 },
  ];

  const doctors = [
    { name: 'Dr. Johnson' },
    { name: 'Dr. Patel' },
    { name: 'Dr. Brown' },
    { name: 'Dr. Garcia' },
    { name: 'Dr. Lee' },
    { name: 'Dr. Davis' },
    { name: 'Dr. Clark' },
    { name: 'Dr. Harris' },
  ];

  const materials = [
    { name: "Scalpel", category: "A", type: "Standard", defaultCost: 25.5, optimizedCost: 24.8, error: 0.7 },
    { name: "Suture", category: "A", type: "Standard", defaultCost: 17.75, optimizedCost: 15.8, error: 0.45 },
    { name: "Spinal Needle", category: "A", type: "Standard", defaultCost: 25.5, optimizedCost: 24.8, error: 0.7 },
    { name: "green needle", category: "A", type: "Added", defaultCost: 45.5, optimizedCost: 41.8, error: 0.7 },
    { name: "cosmopore", category: "B", type: "Standard", defaultCost: 25.5, optimizedCost: 24.8, error: 0.7 },
    { name: "drape 9029", category: "A", type: "Standard", defaultCost: 25.5, optimizedCost: 24.8, error: 0.7 },
    { name: "Bandage", category: "B", type: "Standard", defaultCost: 10.0, optimizedCost: 9.5, error: 0.5 }, 
  ];

  const [selectedProcedure, setSelectedProcedure] = useState(procedures[0].name);
  const [selectedSpecialty, setSelectedSpecialty] = useState(procedures[0].specialty);

  // Initialize costs object
  const costs = {
    total: doctors.map(() => ''),
    categoryA: {},
    categoryB: {},
  };

  // Populate categoryA and categoryB based on materials
  materials.forEach((mat) => {
    const label = `${mat.name} (${mat.type})`;
    const costRow = doctors.map(() => ''); // Placeholder for dynamic costs
    if (mat.category === 'A') {
      costs.categoryA[label] = costRow;
    } else if (mat.category === 'B') {
      costs.categoryB[label] = costRow;
    }
  });

  // Handle procedure change
  const handleProcedureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProcedure(e.target.value);
  };

  // Handle specialty change (updated to reflect specialty from procedures)
  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProc = procedures.find(p => p.name === selectedProcedure);
    if (selectedProc) {
      setSelectedSpecialty(selectedProc.specialty); // Sync specialty with selected procedure
    }
  };

  return (
    <>
      <Head>
        <title>Incision - Cost Analysis Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 font-poppins">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Incision - Cost Analysis Dashboard</h2>

          {/* Dropdowns */}
          <div className="flex gap-4 mb-6">
            <SelectBox
              label="Procedure Name"
              value={selectedProcedure}
              onChange={handleProcedureChange}
              options={procedures.map((p) => ({ label: p.name, value: p.name }))}
            />
            <SelectBox
              label="Specialty"
              value={selectedSpecialty}
              onChange={handleSpecialtyChange}
              options={procedures.map((p) => ({ label: p.specialty.replace(/_/g, ' '), value: p.specialty }))}
            />
          </div>

          {/* Total Cost Table */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Procedure Cost per Surgeon</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm text-center">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="p-3 border border-gray-300"></th>
                    {doctors.map((doctor, index) => (
                      <th key={index} className="p-3 border border-gray-300 font-bold text-white">{doctor.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-100 font-semibold text-gray-800">
                    <td className="p-3 border border-gray-300">Total Cost</td>
                    {costs.total.map((cost, index) => (
                      <td key={index} className="p-3 border border-gray-300 text-red-600 font-bold">{cost || '$0.00'}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Materials Cost Table */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Material Cost per Surgeon</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm text-center">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="p-3 border border-gray-300">Category</th>
                    <th className="p-3 border border-gray-300">Material Names</th>
                    {doctors.map((doctor, index) => (
                      <th key={index} className="p-3 border border-gray-300 font-bold text-white">{doctor.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Category A */}
                  {Object.keys(costs.categoryA).length > 0 && (
                    <>
                      <tr>
                        <td rowSpan={Object.keys(costs.categoryA).length} className="p-3 border border-gray-300 bg-gray-50 font-semibold text-gray-700 align-top">
                          Category A (product_type)
                        </td>
                        <td className="p-3 border border-gray-300">{Object.keys(costs.categoryA)[0]}</td>
                        {costs.categoryA[Object.keys(costs.categoryA)[0]].map((cost, index) => (
                          <td key={index} className={`p-3 border border-gray-300 ${cost ? 'text-red-600 font-medium' : ''}`}>{cost || '$0.00'}</td>
                        ))}
                      </tr>
                      {Object.entries(costs.categoryA).slice(1).map(([material, values]) => (
                        <tr key={material}>
                          <td className="p-3 border border-gray-300">{material}</td>
                          {values.map((cost, idx) => (
                            <td key={idx} className={`p-3 border border-gray-300 ${cost ? 'text-red-600 font-medium' : ''}`}>{cost || '$0.00'}</td>
                          ))}
                        </tr>
                      ))}
                    </>
                  )}

                  {/* Category B */}
                  {Object.keys(costs.categoryB).length > 0 && (
                    <>
                      <tr>
                        <td rowSpan={Object.keys(costs.categoryB).length} className="p-3 border border-gray-300 bg-gray-50 font-semibold text-gray-700 align-top">
                          Category B
                        </td>
                        <td className="p-3 border border-gray-300">{Object.keys(costs.categoryB)[0]}</td>
                        {costs.categoryB[Object.keys(costs.categoryB)[0]].map((cost, index) => (
                          <td key={index} className={`p-3 border border-gray-300 ${cost ? 'text-red-600 font-medium' : ''}`}>{cost || '$0.00'}</td>
                        ))}
                      </tr>
                      {Object.entries(costs.categoryB).slice(1).map(([material, values]) => (
                        <tr key={material}>
                          <td className="p-3 border border-gray-300">{material}</td>
                          {values.map((cost, idx) => (
                            <td key={idx} className={`p-3 border border-gray-300 ${cost ? 'text-red-600 font-medium' : ''}`}>{cost || '$0.00'}</td>
                          ))}
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcedureResultsPage;