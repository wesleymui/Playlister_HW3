import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalStoreContext } from "../store";

function DeleteSongModal() {
    const {store} = useContext(GlobalStoreContext);
    const [song, setSong] = useState({});

    useEffect(() => {
        if(store.currentList != null && store.songIndexMarked >= 0) {
            let song = store.currentList.songs[store.songIndexMarked];
            console.log("current list: " + store.currentList);
            console.log("song index: " + store.songIndexMarked);
            if(song) { setSong(song); }
        }
    });
    store.history = useHistory();

    function handleDeleteSong(event) {
        event.stopPropagation();
        store.removeMarkedSong();
    }

    function closeRemoveSongModal() {
        store.closeDeleteSongModal();
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
                            Are you sure you wish to remove <span id="remove-song-span">{song.title} by {song.artist}</span> from the playlist?
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