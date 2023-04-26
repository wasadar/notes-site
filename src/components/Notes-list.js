import { useSelector } from "react-redux";
import Note from "./Note.js";
import "./Notes-list.css"

export default function NotesList() {
    const notes = useSelector(state => state.notes);
    const page = useSelector(state => state.currentPage);

    let page_notes = notes.slice(page * 10, (page + 1) * 10);

    return <div className="notes-list">
        <div className="notes-list-top-panel">
            <div className="notes-list-top-panel-short-content">
                Name
            </div>
            <div className="notes-list-top-panel-short-content">
                Short content
            </div>
            <div className="notes-list-top-panel-other">
                Updated at
            </div>
            <div className="notes-list-top-panel-other">
                Created at
            </div>
            <div className="notes-list-top-panel-other">
                Delete
            </div>
        </div>
        { page_notes.map((note, index) => {
            return <Note key = {index} id={ page * 10 + index} {...note} />
        })}
    </div>
}