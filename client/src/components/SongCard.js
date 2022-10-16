import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    //const [isDragging, setIsDragging] = useState(false);
    const [draggedTo, setDraggedTo] = useState(0);

    function handleDragStart(event) {
        console.log('starting drag');
        event.dataTransfer.setData("song", event.target.id);
        //setIsDragging(true);
        //setDraggedTo(draggedTo);
    }

    function handleDragOver(event) {
        event.preventDefault();
        //setDraggedTo(true);
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        //setIsDragging(isDragging);
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        console.log('dragging drop');
        let target = event.target;
        let targetId = target.id;
        console.log(targetId);
        targetId = Number(targetId.charAt(target.id.indexOf("-") + 1));
        let sourceId = event.dataTransfer.getData("song");
        console.log(sourceId);
        sourceId = Number(sourceId.charAt(sourceId.indexOf("-") + 1));

        //setIsDragging(false);
        setDraggedTo(false);
        console.log("targetid: " + targetId);
        console.log("sourceId" + sourceId);

        store.moveSong(sourceId, targetId);
    }

    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;