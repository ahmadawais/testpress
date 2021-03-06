/**
 * External dependencies
 */
import React, { Component } from 'react';

/**
 * WordPress dependencies
 */
import { IconButton } from '@wordpress/components';

const { ipcRenderer, remote } = window.require( 'electron' );
const { Menu, MenuItem, process } = remote;

class PreferencesButton extends Component {
	constructor( props ) {
		super( props );

		this.handleClick = this.handleClick.bind( this );

		this.menu = new Menu();

		const preferencesShortcut = process.platform === 'darwin' ? 'CmdOrCtrl+,' : 'CmdOrCtrl+P';
		const quitShortcut = process.platform === 'darwin' ? 'CmdOrCtrl+Q' : 'Alt+F4';

		this.menu.append( new MenuItem( {
			label: 'About TestPress',
			click: () => {
				this.props.setActivePage( 2 );
			},
		} ) );

		this.menu.append( new MenuItem( { type: 'separator' } ) );

		this.menu.append( new MenuItem( {
			label: 'Preferences...',
			accelerator: preferencesShortcut,
			click: () => {
				this.props.setActivePage( 1 );
			},
		} ) );

		this.menu.append( new MenuItem( { type: 'separator' } ) );

		this.menu.append( new MenuItem( {
			label: 'Quit',
			accelerator: quitShortcut,
			click: this.quit,
		} ) );

		this.buttonStyles = {
			close: {
				icon: 'no-alt',
				text: 'Close Preferences',
			},
			preferences: {
				icon: 'admin-generic',
				text: 'Settings',
			},
		};
	}

	handleClick() {
		const { activePage, setActivePage } = this.props;

		if ( activePage ) {
			setActivePage( 0 );
			return;
		}

		this.menu.popup( { window: remote.getCurrentWindow() } );
	}

	quit() {
		ipcRenderer.send( 'quit' );
	}

	render() {
		const { activePage } = this.props;
		const { icon, text } = this.buttonStyles[ activePage ? 'close' : 'preferences' ];

		return (
			<IconButton
				className="preferences-button"
				onClick={ this.handleClick }
				title={ text }
				icon={ icon }
				label={ text }
			/>
		);
	}
}

export default PreferencesButton;
