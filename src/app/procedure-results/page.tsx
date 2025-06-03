"use client";

import SelectBox from '@/components/SelectBox';
import { useState } from 'react';

export default function ProcedureResultsPage() {
  const procedures = [
    { name: "Spinal Injection", specialty: "Ear_Nose_Throat", defaultCost: 150.25, avgSurgeonCost: 0.0, optimizedCost: 145.1 },
    { name: "Turbinoplasty", specialty: "Ear_Nose_Throat", defaultCost: 150.25, avgSurgeonCost: 0.0, optimizedCost: 145.1 },
    { name: "Laryngoscopy - Flexible", specialty: "Ear_Nose_Throat", defaultCost: 150.25, avgSurgeonCost: 0.0, optimizedCost: 145.1 },
    { name: "Baha Pocedure", specialty: "Ear_Nose_Throat", defaultCost: 150.25, avgSurgeonCost: 0.0, optimizedCost: 145.1 },
    { name: "Septorhinoplasty", specialty: "Ear_Nose_Throat", defaultCost: 150.25, avgSurgeonCost: 0.0, optimizedCost: 145.1 },
  ];

  const materials = [
    { name: "Scalpel", category: "A", type: "Standard", defaultCost: 25.5, optimizedCost: 24.8, error: 0.7 },
    { name: "Suture", category: "A", type: "Standard", defaultCost: 17.75, optimizedCost: 15.8, error: 0.45 },
    { name: "Spinal Needle", category: "A", type: "Standard", defaultCost: 25.5, optimizedCost: 24.8, error: 0.7 },
    { name: "green needle", category: "A", type: "Added", defaultCost: 45.5, optimizedCost: 41.8, error: 0.7 },
    { name: "cosmopore", category: "A", type: "Standard", defaultCost: 25.5, optimizedCost: 24.8, error: 0.7 },
    { name: "drape 9029", category: "A", type: "Standard", defaultCost: 25.5, optimizedCost: 24.8, error: 0.7 },
  ];

  const [selectedProcedure, setSelectedProcedure] = useState(procedures[0].name);
  const [selectedSpecialty, setSelectedSpecialty] = useState(procedures[0].specialty);

  const handleProcedureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProcedure(e.target.value);
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialty(e.target.value);
  };


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Procedure Results</h1>

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
          options={procedures.map((p) => ({ label: p.name, value: p.name }))}
        />
      </div>

      <div className="mb-8 overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-[var(--color-primary-light)]">
            <tr>
              <th className="p-2 border">Procedure Name</th>
              <th className="p-2 border">Specialty</th>
              <th className="p-2 border">Default Cost</th>
              <th className="p-2 border">Avg Surgeon Cost</th>
              <th className="p-2 border">Optimized Cost</th>
            </tr>
          </thead>
          <tbody>
            {procedures.map((procedure, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{procedure.name}</td>
                <td className="p-2 border">{procedure.specialty.replace(/_/g, ' ')}</td>
                <td className="p-2 border">{procedure.defaultCost.toFixed(2)}</td>
                <td className="p-2 border">{procedure.avgSurgeonCost.toFixed(2)}</td>
                <td className="p-2 border">{procedure.optimizedCost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mb-6">
        <button className="bg-[var(--color-primary-dark)] text-white py-2 px-6 rounded-md">Previous</button>
        <button className="bg-[var(--color-primary-dark)] text-white py-2 px-6 rounded-md">Next</button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Materials for Turbinoplasty</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-[var(--color-primary-light)]">
            <tr>
              <th className="p-2 border">Material</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Default Cost</th>
              <th className="p-2 border">Optimized Cost</th>
              <th className="p-2 border">Prediction Error</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{material.name}</td>
                <td className="p-2 border">{material.category}</td>
                <td className="p-2 border">{material.type}</td>
                <td className="p-2 border">{material.defaultCost.toFixed(2)}</td>
                <td className="p-2 border">{material.optimizedCost.toFixed(2)}</td>
                <td className="p-2 border">{material.error.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}