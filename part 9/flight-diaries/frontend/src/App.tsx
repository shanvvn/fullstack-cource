import { useState, useEffect } from 'react';
import axios from 'axios';
import { DiaryEntry } from './types';
import { getAllDiaries, createDiary } from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('great');
  const [weather, setWeather] = useState('sunny');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newDiary = await createDiary({
        date,
        visibility,
        weather,
        comment,
      });
      setDiaries(diaries.concat(newDiary));
      setDate('');
      setComment('');
      setError('');
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response && typeof e.response.data === 'string') {
          setError(e.response.data);
        } else {
          setError('An unknown Axios error occurred');
        }
      } else {
        setError('Unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={submit}>
        <div>
          date <input type="date" value={date} onChange={({ target }) => setDate(target.value)} />
        </div>
        <div>
          visibility
          <label> great <input type="radio" name="visibility" checked={visibility === 'great'} onChange={() => setVisibility('great')} /> </label>
          <label> good <input type="radio" name="visibility" checked={visibility === 'good'} onChange={() => setVisibility('good')} /> </label>
          <label> ok <input type="radio" name="visibility" checked={visibility === 'ok'} onChange={() => setVisibility('ok')} /> </label>
          <label> poor <input type="radio" name="visibility" checked={visibility === 'poor'} onChange={() => setVisibility('poor')} /> </label>
        </div>
        <div>
          weather
          <label> sunny <input type="radio" name="weather" checked={weather === 'sunny'} onChange={() => setWeather('sunny')} /> </label>
          <label> rainy <input type="radio" name="weather" checked={weather === 'rainy'} onChange={() => setWeather('rainy')} /> </label>
          <label> cloudy <input type="radio" name="weather" checked={weather === 'cloudy'} onChange={() => setWeather('cloudy')} /> </label>
          <label> stormy <input type="radio" name="weather" checked={weather === 'stormy'} onChange={() => setWeather('stormy')} /> </label>
          <label> windy <input type="radio" name="weather" checked={weather === 'windy'} onChange={() => setWeather('windy')} /> </label>
        </div>
        <div>
          comment <input value={comment} onChange={({ target }) => setComment(target.value)} />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
