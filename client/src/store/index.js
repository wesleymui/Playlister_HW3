import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import AddSong_Transaction from '../transactions/AddSong_Transaction';
import EditSong_Transaction from '../transactions/EditSong_Transaction';
import MoveSong_Transaction from '../transactions/MoveSong_Transaction';
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction';
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    MARK_SONG_INDEX: "MARK_SONG_INDEX",
    DELETE_MARKED_LIST: "DELETE_MARKED_LIST",
    UPDATE_MARKED_LIST: "UPDATE_MARKED_LIST"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        songIndexMarked: null,
        editListNameActive: false,
        editPlaylistActive: false,
        modalActive: false,
        listMarkedForDeletion: null,
        tps: null
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    songIndexMarked: null,
                    editListNameActive: false,
                    editPlaylistActive: false,
                    modalActive: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    tps: tps
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    songIndexMarked: null,
                    editListNameActive: false,
                    editPlaylistActive: false,
                    modalActive: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    tps: tps
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    songIndexMarked: null,
                    editListNameActive: false,
                    editPlaylistActive: true,
                    modalActive: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    tps: tps
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    songIndexMarked: null,
                    editListNameActive: false,
                    editPlaylistActive: false,
                    modalActive: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    tps: tps
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    songIndexMarked: null,
                    editListNameActive: false,
                    editPlaylistActive: true,
                    modalActive: true,
                    listMarkedForDeletion: payload,
                    tps: tps
                });
            }
            case GlobalStoreActionType.MARK_SONG_INDEX: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    songIndexMarked: payload,
                    editListNameActive: false,
                    editPlaylistActive: true,
                    modalActive: true,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    tps: tps
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    songIndexMarked: null,
                    editListNameActive: false,
                    editPlaylistActive: true,
                    modalActive: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    tps: tps
                });
            }

            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    songIndexMarked: null,
                    editListNameActive: true,
                    editPlaylistActive: true,
                    modalActive: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    tps: tps
                });
            }
            case GlobalStoreActionType.DELETE_MARKED_LIST: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    songIndexMarked: null,
                    editListNameActive: false,
                    editPlaylistActive: false,
                    modalActive: false,
                    listMarkedForDeletion: null,
                    tps: tps
                });
            }
            case GlobalStoreActionType.UPDATE_MARKED_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    songIndexMarked: null,
                    editListNameActive: false,
                    editPlaylistActive: store.editPlaylistActive,
                    modalActive: store.modalActive,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    tps: tps
                });
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CREATING A NEW LIST
    store.createNewList = function () {
        async function asyncCreateNewList() {
            let newList = { 
                "name": "Untitled",
                "songs": []
            };
            const response = await api.createPlaylist(newList);
            if (response.data.success) {
                let newPlaylist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: newPlaylist
                });
                store.history.push("/playlist/" + newPlaylist._id);
            }
        }
        asyncCreateNewList();
    }


    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            console.log('id:' + id);
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.seteditListNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.updateList = function() {
        async function updateList() {
            let response = await api.updatePlaylistById(store.currentList._id, store.currentList)
            if(response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.UPDATE_MARKED_LIST,
                    payload: response.data.playlist
                })
            }
        }
        updateList();
    }

    store.addSong = function(index, song) {
        store.currentList.songs.splice(index, 0, song);
        store.updateList();
    }

    store.addSongTransaction = function(index) {
        let transaction = new AddSong_Transaction(store, index);
        tps.addTransaction(transaction);
    }

    store.editSong = function(index, song) {
        store.currentList.songs[index] = song;
        store.updateList();
    }

    store.addEditSongTransaction = function(index, song) {
        let transaction = new EditSong_Transaction(store, index, song, store.currentList.songs[index]);
        tps.addTransaction(transaction);
    }

    store.removeSong = function(index) {
        store.currentList.songs.splice(index, 1);
        store.updateList();
    }

    store.addRemoveSongTransaction = function(index) {
        let transaction = new RemoveSong_Transaction(store, index, store.currentList.songs[index]);
        tps.addTransaction(transaction);
    }

    store.moveSong = function(start, end) {
        if (start < end) {
            let temp = store.currentList.songs[start];
            console.log(temp);
            for (let i = start; i < end; i++) {
                store.currentList.songs[i] = store.currentList.songs[i + 1];
            }
            store.currentList.songs[end] = temp;
        }
        else if (start > end) {
            let temp = store.currentList.songs[start];
            for (let i = start; i > end; i--) {
                store.currentList.songs[i] = store.currentList.songs[i - 1];
            }
            store.currentList.songs[end] = temp;
        }
        store.updateList();
    }

    store.addMoveSongTransaction = function(start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF DELETING A LIST
    store.markListForDeletion = function (id) {
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: id
        });
        console.log("list marked for deletion" + id);
        store.openDeleteListModal();
    }

    store.markSongForEdit = function (id) {
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_INDEX,
            payload: id
        });
        store.openEditSongModal();
    }

    store.markSongForDeletion = function (id) {
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_INDEX,
            payload: id
        });
        store.openDeleteSongModal();
    }

    store.deleteList = function(id) {
        async function deleteList(id) {
            let response = await api.deletePlaylistById(id);
            if(response.data.success) {
                store.loadIdNamePairs();
                const newIdNamePairs = store.idNamePairs.filter(idNamePair => idNamePair !== id);
                storeReducer({
                    type: GlobalStoreActionType.DELETE_MARKED_LIST,
                    payload: newIdNamePairs
                });
            }
        }
        deleteList(id);
    }

    store.deleteMarkedList = function() {
        store.deleteList(store.listMarkedForDeletion);
        store.closeDeleteListModal();
    }

    store.editMarkedSong = function (song) {
        store.addEditSongTransaction(store.songIndexMarked, song);
        store.closeEditSongModal();
    }

    store.removeMarkedSong = function () {
        store.addRemoveSongTransaction(store.songIndexMarked);
        store.closeDeleteSongModal();
    }

    store.openDeleteListModal = function () {
        let modal = document.getElementById("delete-list-modal");
        modal.classList.add("is-visible");
    }

    store.closeDeleteListModal = function () {
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
        setStore({
            idNamePairs: store.idNamePairs,
            currentList: store.currentList,
            newListCounter: store.newListCounter,
            songIndexMarked: store.songIndexMarked,
            editListNameActive: store.editListNameActive,
            editPlaylistActive: true,
            modalActive: false,
            listMarkedForDeletion: store.listMarkedForDeletion,
            tps: tps
        });
    }

    store.openEditSongModal = function () {
        let modal = document.getElementById("edit-song-modal");
        modal.classList.add("is-visible");
    }

    store.closeEditSongModal = function () {
        let modal = document.getElementById("edit-song-modal");
        modal.classList.remove("is-visible");
        setStore({
            idNamePairs: store.idNamePairs,
            currentList: store.currentList,
            newListCounter: store.newListCounter,
            songIndexMarked: store.songIndexMarked,
            editListNameActive: store.editListNameActive,
            editPlaylistActive: true,
            modalActive: false,
            listMarkedForDeletion: store.listMarkedForDeletion,
            tps: tps
        });
    }

    store.openDeleteSongModal = function () {
        let modal = document.getElementById("remove-song-modal");
        modal.classList.add("is-visible");
    }

    store.closeDeleteSongModal = function () {
        let modal = document.getElementById("remove-song-modal");
        modal.classList.remove("is-visible");
        setStore({
            idNamePairs: store.idNamePairs,
            currentList: store.currentList,
            newListCounter: store.newListCounter,
            songIndexMarked: store.songIndexMarked,
            editListNameActive: store.editListNameActive,
            editPlaylistActive: true,
            modalActive: false,
            listMarkedForDeletion: store.listMarkedForDeletion,
            tps: tps
        });
    }


    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}