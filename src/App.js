import './App.css';
import BottomPanel from './components/Bottom-panel.js';
import NotesList from './components/Notes-list.js';
import TopPanel from './components/Top-panel.js';
import AddNote from './components/Add-note.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <TopPanel />
      <Routes>
        <Route path="/notes-site" element={
          <>
            <NotesList />
            <BottomPanel />
          </>
        } />
        <Route path="/notes-site/create-note" element={
          <AddNote />
        } />
        <Route path="/notes-site/:noteIndex" element={
          <AddNote />
        } />
      </Routes>
    </div>
  );
}

export default App;
