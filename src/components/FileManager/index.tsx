import FileHandler from './components/FileHandler';
import FileManager from './FileManager';
import ImageHandler, { FileHandlerRes } from './image-compressor/ImageHandler';
import MultiFileImageHandler from './image-compressor/MultiFileImageHandler';

export { FileManager, ImageHandler, MultiFileImageHandler, FileHandler };
export type { FileHandlerRes };
