const server = require('./server')

const { header, validationResult } = require('express-validator')

const POSTS_COUNT = 100
const DEFAULT_PER_PAGE = 30

const generatePost = (id) => ({
    id: id,
    title: "タイトル" + id,
    text: "本文" + id,
    date: "2019/01/01"
})

const generatePosts = (page, perPage) => {
    const start = perPage * (page - 1) + 1
    const end = (start + perPage) <= POSTS_COUNT ? start + perPage : POSTS_COUNT
    const count = end > start ? end - start : 0
    return [...Array(count).keys()]
        .map(i => i + start)
        .map(generatePost)
}

// GET /posts
// with pagination
server.get(
    '/posts',
    (req, res, next) => {
        const page = req.query.page !== void 0 ? Number(req.query.page) : 1
        const perPage = req.query.per_page !== void 0 ? Number(req.query.per_page) : DEFAULT_PER_PAGE
        const posts = generatePosts(page, perPage)
        res.status(200).jsonp({
            posts: posts,
            totalCount: POSTS_COUNT
        })
        next()
    })

// GET /posts/:id
server.get(
    '/posts/:id',
    (req, res, next) => {
        const post = generatePost(req.params.id)
        res.status(200).jsonp(post)
        next()
    })

// POST /posts/store
// with a sample validation
server.post('/posts/store',
    [
        header('Authorization').exists({ checkNull: true }),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            switch (errors.errors[0].param) {
            case 'authorization':
                res.status(401).send('Unauthorized')
                break
            default:
                res.status(400).jsonp(errors.errors)
            }
            next()
            return
        }
        res.status(200).jsonp({ id: POSTS_COUNT + 1 })
        next()
    })
