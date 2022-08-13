const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const morgan = require('morgan');
const sass = require('node-sass');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const route = require('./routes');
const db = require('./config/db');
const dateFormat = require('moment');
const app = express();
const port = 3000;

// Database connection
db.connect();

// Config express
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Method override
app.use(methodOverride('_method'));

// HTTP logger
app.use(morgan('combined'));

// Middlewares
app.use(SortMiddleware);

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => {
                return a + b;
            },
            dateFormat: (date) => {
                return dateFormat(date).format('DD/MM/YYYY - hh:mm:ss A');
            },
            sortable: (field, sort) => {
                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };
                const sortType = field === sort.column ? sort.type : 'default';
                const icon = icons[sortType];
                const type = types[sortType];

                return `
                    <a class="small ml-1" href="?_sort&column=${field}&type=${type}" title="Sắp xếp">
                        <span class="${icon}"></span>
                    </a>
                `;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes initialize
route(app);

// Listen
app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
