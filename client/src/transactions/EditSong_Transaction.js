import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that works with editing songs
 * in a playlist. It will be managed by the transaction stack.
 * 
 * @author Wesley Mui
 * 
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initNewSong, initPrevSong) {
        super();
        this.store = initStore;
        this.songIndex = initIndex;
        this.newSong = initNewSong;
        this.prevSong = initPrevSong;
    }

    doTransaction() {
        this.store.editSong(this.songIndex, this.newSong);
    }
    
    undoTransaction() {
        this.store.editSong(this.songIndex, this.prevSong);
    }

    toString() {
        return "Updated song at index " + this.songIndex;
    }
}