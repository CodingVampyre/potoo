import React from 'react';
import './App.css';
import { TagBar } from './TagBar/TagBar';
import { ImageGrid } from './ImageGrid/ImageGrid';
import { useImageList } from '../hooks/UseImageList';

function App() {

	const { images, openImageFileDialog, deleteImage, updateTags, searchImagesByTags } = useImageList();

	return (
		<div className="app-layout">
			<div className={"app-header-bar"}/>
			<div className={"app-content"}>
				<TagBar />
				<ImageGrid 
					images={ images }
					onClickAddImageButton={ () => openImageFileDialog() }
					onDeleteImage={ (id: string) => deleteImage(id) }
					onUpdateTags={ (id: string, tags: string[]) => updateTags(id, tags) }
				/>
			</div>
		</div>
	);
}

export default App;
