"use client";

import React, { useEffect, useState } from "react";
import SelectBox from "../../components/SelectBox";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Procedure, Speciality } from "@/types/models";

const AnalyticsPage = () => {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [selectedSpecialityId, setSelectedSpecialityId] = useState<number | null>(null);
  const [selectedProcedureId, setSelectedProcedureId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [procedureDetail, setProcedureDetail] = useState<any | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5050/api/specialities")
      .then(res => res.json())
      .then(data => {
        setSpecialities(data);
        if (data.length > 0) setSelectedSpecialityId(data[0].id);
      });
  }, []);

  useEffect(() => {
    if (selectedSpecialityId !== null) {
      fetch(`http://127.0.0.1:5050/api/procedure-costs-summary?speciality_id=${selectedSpecialityId}`)
        .then(res => res.json())
        .then(data => {
          setProcedures(data);
          if (data.length > 0) setSelectedProcedureId(data[0].id);
        });
    }
  }, [selectedSpecialityId]);

  useEffect(() => {
    if (selectedProcedureId !== null) {
      setLoading(true);
      fetch(`http://127.0.0.1:5050/api/material-costs-breakdown?procedure_id=${selectedProcedureId}`)
        .then(res => res.json())
        .then(data => {
          setProcedureDetail(data);
          setLoading(false);
        });
    }
  }, [selectedProcedureId]);

  const handleSpecialityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialityId(Number(e.target.value));
    setProcedureDetail(null);
  };

  const handleProcedureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProcedureId(Number(e.target.value));
  };

  // Chart for Procedure Cost Summary (original vs optimized for each procedure)
  const procedureChartData =
    procedures?.map(p => ({
      name: p.procedure_name,
      original: p.original_cost,
      optimized: p.optimized_cost,
    })) || [];

  // Chart for Material Cost Breakdown
  const materialChartData =
    procedureDetail?.map((material: any) => ({
      name: material.material_name,
      original: material.original_cost,
      optimized: material.optimized_cost,
    })) || [];


  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Procedure Cost Breakdown</h1>

        <div className="mb-6">
          <SelectBox
            label="Speciality"
            value={selectedSpecialityId?.toString() || ''}
            onChange={handleSpecialityChange}
            options={specialities.map(s => ({
              label: s.name.replace(/_/g, ' '),
              value: s.id.toString(),
            }))}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <BarChart
            width={1200}
            height={200}
            data={procedureChartData}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Bar dataKey="original" fill="#FF7F50" name="Original Cost" />
            <Bar dataKey="optimized" fill="#5eb0ac" name="Optimized Cost" />
          </BarChart>
        </div>
      </div>

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Material Cost Breakdown</h1>

        <div className="mb-6">
          <SelectBox
            label="Procedure"
            value={selectedProcedureId?.toString() || ''}
            onChange={handleProcedureChange}
            options={procedures.map(p => ({
              label: p.procedure_name,
              value: p.id.toString(),
            }))}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <BarChart
              width={1200}
              height={200}
              data={materialChartData}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Bar dataKey="original" fill="#FF7F50" name="Original Cost" />
              <Bar dataKey="optimized" fill="#5eb0ac" name="Optimized Cost" />
            </BarChart>
          )}
        </div>

      </div>
    </>
  );
};

export default AnalyticsPage;
