import React from 'react';

const LibrarySong = ( {
    song,
    currentSong,
    switchSongHandler,
} ) => {

    // Return
    return (

        <div
            onClick={ () => switchSongHandler( song ) }
            className={`library-song ${ song.id === currentSong.id ? "selected": "" }`}
        >

            <img
                src={ song.cover }
                alt={ `${song.name} Song Cover` }
            />

            <div className="song-description">

                <h3> 
                    { song.name }
                </h3>

                <h4>
                    { song.artist }
                </h4>

            </div>

        </div>

    );
};

export default LibrarySong;
