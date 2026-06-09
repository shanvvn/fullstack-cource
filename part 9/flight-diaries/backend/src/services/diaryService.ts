import diaries from '../../data/entries.json';
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const entries: DiaryEntry[] = diaries as DiaryEntry[];

const getEntries = (): DiaryEntry[] => {
  return entries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return entries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = entries.find(d => d.id === id);
  return entry;
};

const addDiary = ( entry: NewDiaryEntry ): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...entries.map(d => d.id)) + 1,
    ...entry
  };

  entries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById
};
