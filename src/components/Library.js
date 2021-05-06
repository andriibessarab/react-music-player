import React from 'react';
import LibrarySong from './LibrarySong'

const Library = ( {
    songs,
    currentSong,
    settings,
    switchSongHandler,
} ) => {
    
    // Return
    return (

        <div className={`library ${ settings.libraryActive ? "library-active" : "" }`}>

            <h2>Library</h2>

            <div>
                {
                    songs.map( song => 

                        <LibrarySong 
                            song={ song }
                            key={ song.id }
                            currentSong={ currentSong }
                            switchSongHandler={ switchSongHandler }
                        />

                    )
                }
                
            </div>

        </div>

    );
};

export default Library;
