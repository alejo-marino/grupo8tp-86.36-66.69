import cors from 'cors'
import express, { Request, Response } from 'express'
import { sequelize } from '../database/sequelize'
import { serverRoutes } from '../routes/serverRoutes'
import { Route } from '../interfaces/server'
const xFrameOptions = require('x-frame-options')

export default class Server {
  public app: express.Application
  public port: number = Number(process.env.PORT) || 3000

  constructor() {
    this.app = express()
  }

  start() {
    sequelize
      .authenticate()
      .then(() => {
        this.app.listen(this.port)
        this.setUpServerConfig(this.app)
      })
      .catch((err) => {
        console.error('Unable to connect to the database: ', err)
      })
  }

  setUpServerConfig = (app: any) => {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json()) // To parse the incoming requests with JSON payloads

    // Set up Cors
    const allowedOrigins = ['http://localhost:3001']

    app.use(
      cors({
        origin: function (origin: any, callback: Function) {
          if (!origin) return callback(null, true)

          if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'Access to origin is not allowed.'
            return callback(new Error(msg), false)
          }

          return callback(null, true)
        },
      }),
    )

    app.use(cors({ origin: true, credentials: true }))

    app.use((_: any, res: any, next: any) => {
      res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, app-origin',
      )
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      res.header('Allow', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      res.header('X-DNS-Prefetch-Control', 'off')
      // No longer supported, only for old browsers that do not support CSP.
      res.header('X-XSS-Protection', '1') // ; mode=block OR ; report=<report-uri>

      // Enable HSTS with a max-age of 1 year (in seconds), include subdomains, and preload
      res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      res.setHeader('Permission-Policy', 'microphone=(), camera=()');

      next()
    })

    this.app.disable('x-powered-by') // Disable x-powered-by header for security reasons

    app.use(xFrameOptions())

    app.get('/', function (_: Request, res: Response) {
      // Should be set up in Apache or Nginx
      res.get('X-Frame-Options') // === 'Deny'
    })


    // Set up routes
    serverRoutes.forEach((route: Route) => {
      app.use(route.path, route.router)
    })

    this.app.use((_: Request, res: Response) => {
      res.status(404).send({ ok: false, msg: 'WebService not found.' })
    })
  }
}
