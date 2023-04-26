import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import { changeSortDirection, changeSortOption} from '../store/notes-slice';
import './Top-panel.css';

const OPTIONS = {
    name: "name",
    content: "content",
    created_at: "creation date",
    updated_at: "update date"
}

export default function TopPanel() {
    const dispatch = useDispatch();

    const direction = useSelector(state => state.sortDirection);
    const option = useSelector(state => state.sortOption);

    return <div className="top-panel">
        <Routes>
            <Route path="/notes-site" element={
                <>
                    <Link to="/notes-site/create-note" className='top-panel-button' >+</Link>
                    <div className='top-panel-button' onClick={() => dispatch(changeSortDirection({}))}>Sorted {direction ? "ascending" : "descending"}</div>
                    <div className='dropdown-container'>
                        <div className='top-panel-button-dropdown'>Sorted by {OPTIONS[option]}</div>
                        <div className='dropdown-menu'>
                            <div className='dropdown-menu-item' onClick={() => dispatch(changeSortOption({ field: "name"}))}>Sort by name</div>
                            <div className='dropdown-menu-item' onClick={() => dispatch(changeSortOption({ field: "content"}))}>Sort by content</div>
                            <div className='dropdown-menu-item' onClick={() => dispatch(changeSortOption({ field: "created_at"}))}>Sort by creation date</div>
                            <div className='dropdown-menu-item' onClick={() => dispatch(changeSortOption({ field: "updated_at"}))}>Sort by update date</div>
                        </div>
                    </div>
                </>
            } />
            <Route path="/notes-site/create-note" element={
                <Link to="/notes-site" className='top-panel-button' >Notes list</Link>
            } />
            <Route path="/notes-site/:noteIndex" element={
                <>
                    <Link to="/notes-site" className='top-panel-button' >Notes list</Link>
                    <Link to="/notes-site/create-note" className='top-panel-button' >+</Link>
                </>
            } />
        </Routes>
    </div>
}