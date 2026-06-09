import patientsData from '../../data/patients-full.json';
import { Patient, NonSensitivePatient, NewPatient, NewEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientsData as Patient[];

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = ( entry: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (patientId: string, entry: NewEntry): Entry | undefined => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) return undefined;

  const newEntry = {
    id: uuid(),
    ...entry
  };
  patient.entries.push(newEntry as Entry);
  return newEntry as Entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatient,
  addEntryToPatient
};
