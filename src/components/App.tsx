import React from 'react';
import './App.css';
import { TagBar } from './TagBar/TagBar';
import { ImageGrid } from './ImageGrid/ImageGrid';

function App() {
	return (
		<div className="app-layout">
			<TagBar />
			<ImageGrid />
		</div>
	);
}

export default App;
