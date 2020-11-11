import * as mongoose from 'mongoose';
import Genre from './genre.interface';

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const genreModel = mongoose.model<Genre & mongoose.Document>('Genre', genreSchema);

export default genreModel;