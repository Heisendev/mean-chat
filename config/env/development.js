module.exports = {
  sessionSecret: 'develomentSessionSecret',
  db: 'mongodb://localhost/mean-book',
  facebook: {
    clientID: '740912342706347',
    clientSecret: 'c6985a20898af3ca9b456ff6324e279c',
    callbackURL: 'http://localhost:3000/oauth/facebook/callback'
  },
  twitter: {
    clientID: 'AcYdYIyp0zDxT4t2KFceVjMhj',
    clientSecret: '1GZcGjPT7pGSLlTBqWIYzuZIEUeJekjsP3kkOcprwhfrtwPBE4',
    callbackURL: 'http://localhost:3000/oauth/twitter/callback'
  },
  google: {
    clientID: '500944705515-p2t3krf0rbtrus9nr3deu890n3agg7g6.apps.googleusercontent.com',
    clientSecret: 'uOc8Vly3Yws2mPCn5FSHtR8_',
    callbackURL: 'http://localhost:3000/oauth/google/callback'
  }
}
