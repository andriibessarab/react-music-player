import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight, faRandom, faRedo } from '@fortawesome/free-solid-svg-icons';

const Player = ( {
        songs,
        currentSong, setCurrentSong,
        settings, setSettings,
        audioRef,
        switchSongHandler,
        randomSongIndex
}) => {

    // Handler
    const playSongHandler = e => {

        setSettings( {
            ...settings,
            isPlaying: !settings.isPlaying
        } );

        settings.isPlaying ? audioRef.current.pause() : audioRef.current.play();

    };
    const dragHandler = async e => {
        audioRef.current.currentTime = e.target.value;
        await setCurrentSong(
            {
                ...currentSong,
                currentTime: e.target.value,
            },
        );
    };
    const skipSongHandler = direction => {

        const currentSongIndex = songs.findIndex( song => song.id === currentSong.id );
        
        if ( settings.shuffleSongs ) {

            const nextSongIndex = randomSongIndex();

            switchSongHandler( songs[ nextSongIndex ] );

        } else {

            let nextSongIndex;

            if ( direction === "forward" ) {

                nextSongIndex = (currentSongIndex + 1 ) % songs.length;

            } else if ( direction === "backward" ) {

                if ( ( currentSongIndex - 1 ) % songs.length === -1 ) {

                    nextSongIndex = songs.length - 1;

                } else {

                    nextSongIndex = (currentSongIndex - 1 ) % songs.length;

                }

            }

            switchSongHandler( songs[ nextSongIndex ] );

        }
        
    };
    
    // Function
    const formatTime = time => Math.floor( time / 60 ) + ":" + ( "0" + Math.floor( time % 60 ) ).slice( -2 );
    
    // Return
    return (

        <div className="player-container">

            <div className="time-control">

                <p>
                    { formatTime( currentSong.currentTime ) }
                </p>

                <div
                    className="track"
                    style={{
                        background: `linear-gradient(to right, ${ currentSong.color[0] }, ${ currentSong.color[1] })`
                    }}
                >

                    <input
                        min={0}
                        max={ currentSong.duration || 0 }
                        value={ currentSong.currentTime }
                        onChange={ dragHandler }
                        type="range"
                    />

                    <div
                        className="animate-track"
                        style={{
                            transform: `translateX(${ currentSong.percentPlayed }%)`
                        }}
                    >
                    </div>

                </div>

                <p> 
                    { formatTime ( currentSong.duration || 0 ) }
                </p>

            </div>

            <div className="play-control">

                <FontAwesomeIcon
                    onClick={ () => setSettings( { ...settings, shuffleSongs: !settings.shuffleSongs } ) }
                    className={ `shuffle-songs ${ settings.shuffleSongs ? "active-button" : "" }` }
                    icon={ faRandom }
                    size="lg"
                />

                <FontAwesomeIcon
                    onClick={ () => skipSongHandler( "backward" ) }
                    className="skip-backward"
                    icon={ faAngleLeft }
                    size="2x"
                />

                <FontAwesomeIcon
                    onClick={ playSongHandler }
                    className="play"
                    icon={ settings.isPlaying ? faPause : faPlay }
                    size="2x"
                />

                <FontAwesomeIcon
                    onClick={ () => skipSongHandler( "forward" ) }
                    className="skip-forward"
                    icon={ faAngleRight }
                    size="2x"
                />

                <FontAwesomeIcon
                    onClick={ () => setSettings( { ...settings, repeatSong: !settings.repeatSong } ) }
                    className={ `repeat-song ${ settings.repeatSong ? "active-button" : "" }` }
                    icon={ faRedo }
                    size="lg"
                />
            
            </div>
        
        </div>

    );
};

export default Player;
