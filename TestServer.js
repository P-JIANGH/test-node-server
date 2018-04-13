'use strict'

const Koa = require('koa');
const cors = require('@koa/cors');
const parser = require('koa-bodyparser');
const logger = require('koa-logger');
const _ = require('koa-route');
const app = new Koa();

app.use(cors());
app.use(parser());
app.use(logger());

const db_states = ['CA', 'MD', 'OH', 'VA'];
const db_heroes = [
    {
        id: 1,
        name: 'Whirlwind',
        addresses: [
            {street: '123 Main',  city: 'Anywhere', state: 'CA',  zip: '94801'},
            {street: '456 Maple', city: 'Somewhere', state: 'VA', zip: '23226'},
        ]
    },
    {
        id: 2,
        name: 'Bombastic',
        addresses: [
            {street: '789 Elm',  city: 'Smallville', state: 'OH',  zip: '04501'},
        ]
    },
    {
        id: 3,
        name: 'Magneta',
        addresses: [ ]
    },
];

const main = ctx => {
    ctx.response.type = "json"
    ctx.response.body = { text: "Hello World!!"};
}

app.use(_.get('/', main));
app.use(_.get('/hero/:id', (ctx, id) => ctx.response.body = db_heroes.find(h => h.id === id)));
app.use(_.get('/states', ctx => ctx.response.body = db_states));
app.use(_.get('/heroes', ctx => ctx.response.body = db_heroes));
app.use(_.post('/savehero', ctx => {
    let hero = ctx.request.body;
    const oldHero = db_heroes.find(h => h.id === hero.id);
    const newHero = Object.assign(oldHero, hero);
    ctx.response.body = newHero;
}));

console.log('Listening on port 3000!');
app.listen(3000);
