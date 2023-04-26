import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../store/notes-slice';
import "./Bottom-panel.css"

export default function BottomPanel() {
    const dispatch = useDispatch();
    const page = useSelector(state => state.currentPage);
    const pages_count = useSelector(state => state.lastPage);

    return <div className="bottom-panel">
        <div className="bottom-panel-button" onClick={() => {
            if (!(page - 1 < 0)){
                dispatch(changePage({ page:(page - 1)}))
            }
        }}>{"<"}</div>
        <div className="bottom-panel-page"> {page + 1} / {pages_count + 1}</div>
        <div className="bottom-panel-button" onClick={() => {
            if (!(page + 1 > pages_count)){
                dispatch(changePage({ page:(page + 1)}))
            }
        }}>{">"}</div>
    </div>
}