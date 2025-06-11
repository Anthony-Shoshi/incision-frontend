"use client";
import SelectBox from '@/components/SelectBox';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Procedure, Speciality, Surgeon } from '@/types/models';

const ProcedureResultsPage = () => {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [selectedSpecialityId, setSelectedSpecialityId] = useState<number | null>(null);
  const [selectedProcedureId, setSelectedProcedureId] = useState<number | null>(null);
  const [surgeons, setSurgeons] = useState<Surgeon[]>([]);
  const [selectedSurgeonId, setSelectedSurgeonId] = useState<number | null>(null);

  const [procedureDetail, setProcedureDetail] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
      fetch(`http://127.0.0.1:5050/api/procedures?speciality_id=${selectedSpecialityId}`)
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

      let url = `http://127.0.0.1:5050/api/procedure-detail?procedure_id=${selectedProcedureId}`;
      if (selectedSurgeonId !== null) {
        url += `&surgeon_id=${selectedSurgeonId}`;
      }

      fetch(url)
        .then(res => res.json())
        .then(data => {
          setProcedureDetail(data);
          setLoading(false);
        });
    }
  }, [selectedProcedureId, selectedSurgeonId]);

  useEffect(() => {
    if (selectedProcedureId !== null) {
      setLoading(true);

      fetch(`http://127.0.0.1:5050/api/surgeons?procedure_id=${selectedProcedureId}`)
        .then(res => res.json())
        .then(data => {
          setSurgeons(data);
          setSelectedSurgeonId(null); // Always reset on procedure change

        });
    }
  }, [selectedProcedureId]);

  const handleProcedureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProcedureId(Number(e.target.value));
    setSelectedSurgeonId(null); // Reset surgeon
    setProcedureDetail(null);
  };

  const handleSpecialityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialityId(Number(e.target.value));
    setProcedureDetail(null);
    setSelectedSurgeonId(null);
  };

  const handleSurgeonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSurgeonId(value ? Number(value) : null);
  };


  return (
    <>
      <Head>
        <title>Incision - Cost Analysis Dashboard</title>
      </Head>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 font-poppins">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Incision - Cost Analysis Dashboard</h2>

          <div className="flex gap-4 mb-6">
            <SelectBox
              label="Speciality"
              value={selectedSpecialityId?.toString() || ''}
              onChange={handleSpecialityChange}
              options={specialities.map(s => ({
                label: s.name.replace(/_/g, ' '),
                value: s.id.toString(),
              }))}
            />
            <SelectBox
              label="Procedure"
              value={selectedProcedureId?.toString() || ''}
              onChange={handleProcedureChange}
              options={procedures.map(p => ({
                label: p.procedure_name,
                value: p.id.toString(),
              }))}
            />
            <SelectBox
              label="Surgeon"
              value={selectedSurgeonId?.toString() || ''}
              onChange={handleSurgeonChange}
              options={[
                { label: 'Select Surgeon', value: '' }, // Default empty option
                ...surgeons.map(s => ({
                  label: s.name.charAt(0).toUpperCase() + s.name.slice(1),
                  value: s.id.toString(),
                }))
              ]}
            />

          </div>

          {loading ? (
            <p>Loading data...</p>
          ) : !procedureDetail ? (
            <p className="text-gray-600">Please select a speciality and procedure to view details.</p>
          ) : (
            <>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Procedure Cost</h3>
                <table className="w-full border border-gray-300 text-sm text-center">
                  <thead className="bg-[var(--color-primary)] text-white">
                    <tr>
                      <th className="p-3 border border-gray-300">Name</th>
                      <th className="p-3 border border-gray-300">Original Cost</th>
                      <th className="p-3 border border-gray-300">Optimized Cost</th>
                      <th className="p-3 border border-gray-300">Surgeon</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-100 text-gray-800 font-semibold">
                      <td className="p-3 border border-gray-300">{procedureDetail.procedure.name}</td>
                      <td className="p-3 border border-gray-300">${procedureDetail.procedure.original_cost.toFixed(2)}</td>
                      <td className="p-3 border border-gray-300 text-red-600">${procedureDetail.procedure.optimized_cost.toFixed(2)}</td>
                      <td className="p-3 border border-gray-300">
                        {procedureDetail.surgeons.map((s: any, idx: number) => (
                          <span
                            key={idx}
                            className="inline-block px-2 py-1 border bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] rounded-sm mr-1 mb-1"
                          >
                            {s.name.charAt(0).toUpperCase() + s.name.slice(1)}
                          </span>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Material Details</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-sm text-left">
                    <thead className="bg-[var(--color-primary)] text-white">
                      <tr>
                        <th className="p-3 border border-gray-300">Type</th>
                        <th className="p-3 border border-gray-300">Subtype</th>
                        <th className="p-3 border border-gray-300">Material Name</th>
                        <th className="p-3 border border-gray-300 text-center">Original Price</th>
                        <th className="p-3 border border-gray-300 text-center">Optimized Price</th>
                        <th className="p-3 border border-gray-300 text-center">Surgeon Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(procedureDetail.materials).map(([type, subtypes]: [string, any]) => {
                        const typeRows = Object.values(subtypes).reduce((sum: number, arr: any) => sum + (Array.isArray(arr) ? arr.length : 0), 0);

                        let typeRendered = false;

                        return Object.entries(subtypes).map(([subtype, materials]: [string, any]) => {
                          if (!Array.isArray(materials) || materials.length === 0) return null;

                          let subtypeRendered = false;

                          return materials.map((mat: any, idx: number) => (
                            <tr key={`${type}-${subtype}-${idx}`} className="border-t border-gray-200">
                              {!typeRendered && (
                                <td
                                  className="p-3 border border-gray-300 font-semibold text-gray-900 align-middle"
                                  rowSpan={typeRows}
                                >
                                  {type}
                                </td>
                              )}
                              {!subtypeRendered && (
                                <td
                                  className="p-3 border border-gray-300 text-gray-800 align-middle"
                                  rowSpan={materials.length}
                                >
                                  {subtype.toUpperCase()}
                                </td>
                              )}
                              <td className="p-3 border border-gray-300">{mat.name}</td>
                              <td className="p-3 border border-gray-300 text-center">${mat.original_price.toFixed(2)}</td>
                              <td className="p-3 border border-gray-300 text-center text-red-600">${mat.optimized_price.toFixed(2)}</td>
                              <td className="p-3 border border-gray-300 text-center">
                                {mat.surgeon_specific_action === "ADDED" ? (
                                  <span className="inline-block px-2 py-1 border bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] rounded-sm">
                                    {mat.surgeon_specific_action}
                                  </span>
                                ) : (
                                  mat.surgeon_specific_action
                                )}
                              </td>
                              {(subtypeRendered = true) && null}
                              {(typeRendered = true) && null}
                            </tr>
                          ));
                        });
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcedureResultsPage;
