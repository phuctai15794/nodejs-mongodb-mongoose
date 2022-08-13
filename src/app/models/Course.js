const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, required: true, max: 255 },
        slug: { type: String, slug: 'name', max: 255, unique: true },
        videoID: { type: String, required: true, max: 20 },
        level: { type: String, required: true, max: 255 },
        description: { type: String, required: true, max: 512 },
        image: { type: String, required: true, max: 255 },
        status: { type: [String], default: null },
    },
    {
        timestamps: true,
    },
);

// Plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Course', Course);
