import * as mongoose from 'mongoose';
import Tag from './tag.interface';

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const tagModel = mongoose.model<Tag & mongoose.Document>('Tag', tagSchema);

export default tagModel;