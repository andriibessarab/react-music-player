import React, { useState, useRef } from 'react';
import './styles/App.scss';
import Nav from './components/Nav';
import Library from './components/Library';
import Song from './components/Song'
import Player from './components/Player';
import chillHop from './ChillHop';


const App = () => {

    // State
    const songs = chillHop;
    const [ currentSong, setCurrentSong ] = useState(
        {
            ...songs[0],
            currentTime: 0,
            duration: 0,
            percentPlayed: 0,
        }
    );
    const [ settings, setSettings ] = useState(
        {
            libraryActive: false,
            isPlaying: false,
            shuffleSongs: false,
            repeatSong: false,
        }
    );

    // Ref
    const audioRef = useRef( null );

    // Handler
    const switchSongHandler = async song => {

        await setCurrentSong(
            {
                ...currentSong,
                ...songs.filter( state => state.id === song.id )[0],
            }
        );

        setSettings( {
            ...settings,
            isPlaying: true,
        } );

        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
            playPromise.catch( () => {} );
        }

    };
    const updateTimeHandler = e => {

        const currentTime = e.target.currentTime;
        const duration = e.target.duration ? e.target.duration : 0;
        const percentPlayed = Math.round( ( currentTime / duration ) * 100 );

        setCurrentSong(
            {
                ...currentSong,
                currentTime: currentTime,
                duration: duration,
                percentPlayed: percentPlayed,
            },
        );

    };
    const songEndedHandler = () => {

        const currentSongIndex = songs.findIndex( song => song.id === currentSong.id );

        if ( settings.repeatSong ) {
            switchSongHandler( songs[ currentSongIndex ] );
        } else if ( settings.shuffleSongs ) {
            const nextSongIndex = randomSongIndex();
            switchSongHandler( songs[ nextSongIndex ] );
        } else {
            const nextSongIndex = ( currentSongIndex + 1 ) % songs.length;
            switchSongHandler( songs[ nextSongIndex ] );
        }

    };

    // Function
    const randomSongIndex = () => Math.floor( Math.random() * ( (songs.length - 1) - 0 + 1 ) + 0 );

    // Return
    return (

        <div className={ `App ${ settings.libraryActive ? "library-active" : "" }` }>

            <Nav 
                settings={ settings }
                setSettings={ setSettings }
            />

            <Library
                songs={ songs }
                currentSong={ currentSong }
                settings={ settings }
                switchSongHandler={ switchSongHandler }
            />

            <Song
                currentSong={ currentSong }
                settings={ settings }
            />

            <Player
                songs={ songs }
                currentSong={ currentSong }
                setCurrentSong={ setCurrentSong }
                settings={ settings }
                setSettings={ setSettings }
                audioRef={ audioRef }
                switchSongHandler={ switchSongHandler }
                randomSongIndex={ randomSongIndex }
            />

            <audio
                onLoadedMetadata={ updateTimeHandler }
                onTimeUpdate={ updateTimeHandler }
                ref={ audioRef }
                src={ currentSong.audio }
                onEnded={ songEndedHandler }
            >
                Audio cannot be played in your browser.
            </audio>

        </div>

    );
};

export default App;
