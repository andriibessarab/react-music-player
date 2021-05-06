import React from 'react';

const Song = ( {
    currentSong,
    settings
} ) => 

    // Return
    <div className={ `song-container ${ settings.isPlaying ? "playing" : "" }` }>

        <img
            src={ currentSong.cover }
            alt={ `${ currentSong.name } Song Cover` }
        />

        <h2> { currentSong.name } </h2>

        <h3> { currentSong.artist } </h3>

    </div>

export default Song;
