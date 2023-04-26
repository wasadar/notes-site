import { useDispatch } from 'react-redux';
import { deleteNote } from '../store/notes-slice';
import { useNavigate } from 'react-router-dom';
import "./Note.css";

export default function Note(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let shortName = props.name.length > 15 ? props.name.slice(0,15) + "..." : props.name;
    let shortContent = props.content.length > 25 ? props.content.slice(0,25) + "..." : props.content;

    return <div className="note-block" onClick={ () => {navigate("/notes-site/" + props.id)} }>
        <div className="short-content">{shortName}</div>
        <div className="short-content">{shortContent}</div>
        <div className="date">{new Date(props.updated_at).toDateString()}</div>
        <div className="date">{new Date(props.created_at).toDateString()}</div>
        <div className="delete-button" onClick={(e) => {e.stopPropagation(); dispatch(deleteNote({ index:props.id }));}}>X</div>
    </div>
}