import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
import AddSong_Transaction from '../transactions/AddSong_Transaction';
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";

    function handleAddSong() {
        console.log("add song button clicked");
        let index = store.getPlaylistSize();
        store.addSongTransaction(index);
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    let editStatus = false;
    let undoStatus = false;
    let redoStatus = false;
    if (store.editListNameActive || store.modalActive || !store.editPlaylistActive) {
        editStatus = true;
        undoStatus = true;
        redoStatus = true;
    }
    else if (store.editPlaylistActive) {
        editStatus = false;
        undoStatus = !store.tps.hasTransactionToUndo();
        redoStatus = !store.tps.hasTransactionToRedo();
    } 



    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={editStatus}
                value="+"
                className={enabledButtonClass}
                onClick={handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={undoStatus}
                value="⟲"
                className={enabledButtonClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={redoStatus}
                value="⟳"
                className={enabledButtonClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={editStatus}
                value="&#x2715;"
                className={enabledButtonClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;