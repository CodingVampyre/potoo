import React from 'react';
import './App.css';
import { TagBar } from './TagBar/TagBar';
import { ImageGrid } from './ImageGrid/ImageGrid';

function App() {
	return (
		<div className="app-layout">
			<div className={"app-header-bar"}/>
			<div className={"app-content"}>
				<TagBar />
				<ImageGrid />
			</div>
		</div>
	);
}

export default App;
