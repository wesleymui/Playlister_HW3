import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalStoreContext } from "../store";

function DeleteSongModal() {
    const {store} = useContext(GlobalStoreContext);
    store.history = useHistory();

    function handleDeleteSong(event) {
        event.stopPropagation();
        store.removeMarkedSong();
    }

    function closeRemoveSongModal() {
        store.closeDeleteSongModal();
    }

    let title = "";
    let artist = "";
    if(store.currentList) {
        let song = store.currentList[store.songIndexMarked];
        if(song) {
            title = song.title;
            artist = song.artist;
        }
    }
    
    return (
        <div 
            class="modal" 
            id="remove-song-modal" 
            data-animation="slideInOutLeft">
                <div class="modal-root" id='verify-remove-song-root'>
                    <div class="modal-north">
                        Remove song?
                    </div>                
                    <div class="modal-center">
                        <div class="modal-center-content">
                            Are you sure you wish to remove <span id="remove-song-span">{title} by {artist}</span> from the playlist?
                        </div>
                    </div>
                    <div class="modal-south">
                        <input type="button" 
                            id="remove-song-confirm-button" 
                            class="modal-button" 
                            onClick={handleDeleteSong}
                            value='Confirm' />
                        <input type="button" 
                            id="remove-song-cancel-button" 
                            class="modal-button"
                            onClick={closeRemoveSongModal}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}

export default DeleteSongModal;