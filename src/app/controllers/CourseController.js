const Course = require('../models/Course');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../utils/mongoose');

class CourseController {
    // [GET] /course
    index(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('courses/index', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [GET] /course/:slug
    detail(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render('courses/show', {
                    courseDetail: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [POST] /course/action
    action(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch(next);
                break;

            default:
                res.json({
                    message: 'Action is invalid',
                });
        }
    }

    // [GET] /course/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /course/store
    store(req, res, next) {
        const formData = { ...req.body };
        formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/maxresdefault.jpg`;
        const course = new Course(formData);

        course
            .save()
            .then(() => res.redirect('/courses'))
            .catch((err) => {
                console.log(err);
            });
    }

    // [GET] /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    courseDetail: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /course/:id/update
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [PATCH] /course/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then((course) => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /course/:id/delete
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /course/:id/force-delete
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CourseController();
