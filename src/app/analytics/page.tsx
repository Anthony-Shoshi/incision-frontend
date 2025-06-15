"use client";

import React, { useEffect, useState } from "react";
import SelectBox from "@/components/SelectBox";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Procedure, Speciality, Surgeon } from "@/types/models";

const AnalyticsPage = () => {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [selectedSpecialityId, setSelectedSpecialityId] = useState<number | null>(null);
  const [selectedProcedureId, setSelectedProcedureId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [procedureDetail, setProcedureDetail] = useState<any | null>(null);
  const [surgeons, setSurgeons] = useState<Surgeon[]>([]);
  const [selectedSurgeonId, setSelectedSurgeonId] = useState<number | null>(null);
  const [surgeonProcedures, setSurgeonProcedures] = useState<any[]>([]);


  useEffect(() => {
    fetch("http://incision-price-predictor-container-dns.westeurope.azurecontainer.io:5000//api/specialities")
      .then(res => res.json())
      .then(data => {
        setSpecialities(data);
        if (data.length > 0) setSelectedSpecialityId(data[0].id);
      });
  }, []);

  useEffect(() => {
    if (selectedSpecialityId !== null) {
      fetch(`http://incision-price-predictor-container-dns.westeurope.azurecontainer.io:5000//api/procedure-costs-summary?speciality_id=${selectedSpecialityId}`)
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
      fetch(`http://incision-price-predictor-container-dns.westeurope.azurecontainer.io:5000//api/material-costs-breakdown?procedure_id=${selectedProcedureId}`)
        .then(res => res.json())
        .then(data => {
          setProcedureDetail(data);
          setLoading(false);
        });
    }
  }, [selectedProcedureId]);

  useEffect(() => {
    if (selectedProcedureId !== null) {
      setLoading(true);

      // Fetch surgeons
      fetch(`http://incision-price-predictor-container-dns.westeurope.azurecontainer.io:5000//api/surgeons?procedure_id=${selectedProcedureId}`)
        .then(res => res.json())
        .then(data => {
          setSurgeons(data);
          if (data.length > 0) setSelectedSurgeonId(data[0].id);
        });
    }
  }, [selectedProcedureId]);

  useEffect(() => {
    if (selectedSurgeonId !== null) {
      setLoading(true);
      fetch(`http://incision-price-predictor-container-dns.westeurope.azurecontainer.io:5000//api/procedures-by-surgeon?surgeon_id=${selectedSurgeonId}`)
        .then(res => res.json())
        .then(data => {
          setSurgeonProcedures(data);
          setLoading(false);
        });
    }
  }, [selectedSurgeonId]);

  const handleSpecialityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialityId(Number(e.target.value));
    setProcedureDetail(null);
  };

  const handleProcedureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProcedureId(Number(e.target.value));
  };

  const handleSurgeonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSurgeonId(Number(e.target.value));
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

  // Chart for Surgeon Cost Breakdown
  const surgeonChartData = surgeonProcedures.map(proc => ({
    name: proc.procedure_name,
    original: proc.original_cost,
    optimized: proc.optimized_cost,
  }));

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

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Surgeon Cost Breakdown</h1>

        <div className="mb-6">
          <SelectBox
            label="Surgeon"
            value={selectedSurgeonId?.toString() || ''}
            onChange={handleSurgeonChange}
            options={surgeons.map(s => ({
              label: s.name.charAt(0).toUpperCase() + s.name.slice(1),
              value: s.id.toString(),
            }))}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          {loading ? (
            <p>Loading...</p>
          ) : surgeonChartData.length === 0 ? (
            <p>No data available for this surgeon.</p>
          ) : (
            <BarChart
              width={1200}
              height={200}
              data={surgeonChartData}
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
