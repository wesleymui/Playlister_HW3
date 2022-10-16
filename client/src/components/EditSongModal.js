import React, { Component, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalStoreContext } from "../store";

function EditSongModal() {
    const {store} = useContext(GlobalStoreContext);
    store.history = useHistory();

    function handleEditSong() {
        let title = document.getElementById("title");
        let artist = document.getElementById("artist");
        let youtubeid = document.getElementById("youtubeid");
        let newSong = {
            "title": title.value,
            "artist": artist.value,
            "youTubeId": youtubeid.value
        }
        title.value = "";
        artist.value = "";
        youtubeid.value = "";
        store.editMarkedSong(newSong);
    }

    function closeEditSongModal() {
        store.closeEditSongModal();
    }

    return (
        <div
            class="modal"
            id="edit-song-modal"
            data-animation="slideInOutLeft">
                <div class="modal-root" id='verify-edit-list-root'>
                    <div class="modal-north">
                        Edit song
                    </div>                
                    <div class="modal-center">
                            <span class="edit-list-text">Title: </span><input type="text" id="title" name="title"/>
                            <span class="edit-list-text">Artist: </span><input type="text" id="artist" name="artist"/>
                            <span class="edit-list-text">YouTube Id: </span><input type="text" id="youtubeid" name="youtubeid"/>
                    </div>
                    <div class="modal-south">
                        <input type="button" 
                            id="edit-song-confirm-button" 
                            class="modal-button"
                            onClick={handleEditSong}
                            value='Confirm' />
                        <input type="button"
                            id="edit-song-cancel-button" 
                            class="modal-button"
                            onClick={closeEditSongModal}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}

export default EditSongModal;