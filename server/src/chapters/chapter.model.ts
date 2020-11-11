import * as mongoose from 'mongoose';
import Chapter from './chapter.interface';

const chapterSchema = new mongoose.Schema({

    number: {
        type: Number,
        required: true,
    },
    bookId: {
        ref: 'Book',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
    price: {
        type: Number,
        default: 0,
    },

});

const chapterModel = mongoose.model<Chapter & mongoose.Document>('Chapter', chapterSchema);

export default chapterModel;