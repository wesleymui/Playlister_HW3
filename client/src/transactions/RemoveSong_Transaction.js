import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * RemoveSong_Transaction
 * 
 * This class represents a transaction that works with editing songs
 * in a playlist. It will be managed by the transaction stack.
 * 
 * @author Wesley Mui
 *
 */
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initSong) {
        super();
        this.store = initStore;
        this.songIndex = initIndex;
        this.removedSong = initSong;
    }

    doTransaction() {
        this.store.removeSong(this.songIndex);
    }
    
    undoTransaction() {
        this.store.addSong(this.songIndex, this.removedSong);
    }

    toString() {
        return "Removed song at index " + this.songIndex;
    }
}