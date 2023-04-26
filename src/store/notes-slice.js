import {createSlice} from "@reduxjs/toolkit";

const OPTIONS = {
    name: "string",
    content: "string",
    created_at: "date",
    updated_at: "date"
}

function createSortFunction(fieldName, fieldType, order) {
    if (fieldType === "string"){
        return (a, b) => {
            if (((a[fieldName] < b[fieldName]) && (order)) || 
            ((a[fieldName] > b[fieldName]) && (!order))){
                return -1;
            } else if (((a[fieldName] > b[fieldName]) && (order)) || 
            ((a[fieldName] < b[fieldName]) && (!order))){
                return 1;
            }
            else {
                return 0;
            }
        };
    } else if (fieldType === "date"){
        return (a, b) => {
            if (((new Date(a[fieldName]) < new Date(b[fieldName])) && (order)) || 
            ((new Date(a[fieldName]) > new Date(b[fieldName])) && (!order))){
                return -1;
            } else if (((new Date(a[fieldName]) > new Date(b[fieldName])) && (order)) || 
            ((new Date(a[fieldName]) < new Date(b[fieldName])) && (!order))){
                return 1;
            }
            else {
                return 0;
            }
        };
    } else {
        return null;
    }
}

const notesSlice = createSlice({
    name: 'notes',
    initialState:{
        notes: [],
        sortDirection: true,
        sortOption: "name",
        currentPage: 0,
        lastPage: 0,
    },
    reducers:{
        addNote(state, action) {
            state.notes.push({
                name: action.payload.name,
                content: action.payload.content,
                created_at: new Date().toString(),
                updated_at: new Date().toString()
            });
            if (state.notes.length > (state.lastPage + 1) * 10){
                state.lastPage += 1;
                if (state.currentPage == -1) {
                    state.currentPage += 1;
                }
            }
        },
        changeNote(state, action) {
            state.notes[action.payload.index].name = action.payload.name;
            state.notes[action.payload.index].content = action.payload.content;
            state.notes[action.payload.index].updated_at = new Date().toString();
        },
        deleteNote(state, action) {
            state.notes.splice(action.payload.index,1);
            if (state.notes.length <= (state.lastPage) * 10){
                state.lastPage -= 1;
                if (state.currentPage > state.lastPage){
                    state.currentPage-= 1;
                }
            }
        },
        changePage(state, action) {
            if (action.payload.page <= state.lastPage && action.payload.page >= 0){
                state.currentPage = action.payload.page;
            }
        },
        changeSortDirection(state, action) {
            state.sortDirection = !state.sortDirection;
            state.notes.sort(createSortFunction(state.sortOption, OPTIONS[state.sortOption],state.sortDirection));
        },
        changeSortOption(state, action) {
            if (action.payload.field in OPTIONS) {
                state.sortOption = action.payload.field;
                state.notes.sort(createSortFunction(state.sortOption, OPTIONS[state.sortOption],state.sortDirection));
            }
        }
    }
});

export const {addNote, changeNote, deleteNote, changePage, changeSortDirection, changeSortOption} = notesSlice.actions;
export default notesSlice.reducer;