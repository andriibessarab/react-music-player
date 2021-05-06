import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const Nav = ( { settings, setSettings } ) =>
    <nav>
        <h1>aWaves</h1>
        <button
            onClick={ () => setSettings( {
                ...settings,
                libraryActive: !settings.libraryActive 
            } ) }
        >
            Library
            <FontAwesomeIcon
                icon={ faMusic }
                size="2x"
            />
        </button>
    </nav>

export default Nav;
