import { useState, useEffect } from "react";
import axios from "axios";
import { Patient } from "./types";
import patientService from "./services/patients";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get('http://localhost:3001/api/ping');

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <h2>Patientor</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          <tr style={{ borderBottom: '1px solid black' }}>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th style={{ textAlign: 'left' }}>Gender</th>
            <th style={{ textAlign: 'left' }}>Occupation</th>
          </tr>
          {patients.map((patient: Patient) => (
            <tr key={patient.id} style={{ borderBottom: '1px solid lightgray' }}>
              <td>{patient.name}</td>
              <td>{patient.gender}</td>
              <td>{patient.occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
