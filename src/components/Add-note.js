import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addNote, changeNote } from '../store/notes-slice';
import "./Add-note.css";

export default function AddNote(props) {
    const dispatch = useDispatch();
    const index = Number(window.location.pathname.slice(12));
    const notes = useSelector(state => state.notes);

    const [name, setName] = useState(!Number.isNaN(index) && (index >= 0) && (index < notes.length) ? notes[index].name : "");
    const [content, setContent] = useState(!Number.isNaN(index) && (index >= 0) && (index < notes.length) ? notes[index].content : "");

    return <div className='add-note'>
        <div className='add-note-top-block'>
            Note name: <input type="text" placeholder="Note name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='add-note-top-block'>
            <textarea placeholder="Note content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div className='add-note-bottom-block'>
            <Link to="/notes-site" className='add-note-button' onClick={!Number.isNaN(index) && (index >= 0) && (index < notes.length) ? () => {dispatch(changeNote({index:index, name: name, content: content}));} : () => {dispatch(addNote({name: name, content: content}));}}>Save</Link>
        </div>
    </div>
}