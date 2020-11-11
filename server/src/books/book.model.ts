import * as mongoose from 'mongoose';
import Book from './book.interface';

const bookSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
   },
    alternativeNames: {
       type: [String],
    },
    tags: {
        ref: 'Tag',
        type: [mongoose.Schema.Types.ObjectId],
    },
    genres: {
        ref: 'Genre',
        type: [mongoose.Schema.Types.ObjectId],
    },
    description: {
       type: String,
        required: true,
    },
    parsingLink: {
       type: String,
    },
    creatorId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    },
    editors: {
       ref: "User",
        type: [mongoose.Schema.Types.ObjectId]
    },
    titleImage: {
       type: String,
    },
    images: {
       type: [String],
    }
});

const bookModel = mongoose.model<Book & mongoose.Document>('Book', bookSchema);

export default bookModel;