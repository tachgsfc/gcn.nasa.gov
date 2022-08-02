const { generate } = require('generate-password')
const { Provider } = require('oidc-provider')

const LOCAL_OIDC_CLIENT_PORT = 3000
const LOCAL_OIDC_PROVIDER = `http://localhost:${LOCAL_OIDC_CLIENT_PORT}`
const LOCAL_OIDC_CLIENT_ID = generate({ length: 26 })
const LOCAL_OIDC_CLIENT_SECRET = generate({ length: 51 })

const configuration = {
  // ... see /docs for available configuration
  clients: [
    {
      client_id: LOCAL_OIDC_CLIENT_ID,
      client_secret: LOCAL_OIDC_CLIENT_SECRET,
      redirect_uris: ['http://localhost:3333/login'],
      post_logout_redirect_uris: ['http://localhost:3333'],
      // + other client properties
    },
  ],
  claims: {
    openid: ['email', 'email_verified'],
  },
  features: {
    devInteractions: { enabled: true }, // defaults to true

    deviceFlow: { enabled: true }, // defaults to false
    revocation: { enabled: true }, // defaults to false
  },
  scopes: ['openid', 'email', 'phone', 'profile'],
  responseTypes: ['code', 'id_token'],
  routes: {
    end_session: '/logout',
  },
  async findAccount(ctx, id) {
    return {
      accountId: id,
      async claims(use, scope) {
        return {
          sub: id,
          email: 'user@example.com',
          email_verified: false,
        }
      },
    }
  },
}

module.exports = {
  sandbox: {
    start: async ({ arc, inventory, invoke }) => {
      const oidc = new Provider(LOCAL_OIDC_PROVIDER, configuration)

      oidc.listen(LOCAL_OIDC_CLIENT_PORT, () => {
        console.log(
          'oidc-provider listening on port ' +
            LOCAL_OIDC_CLIENT_PORT +
            ', check ' +
            LOCAL_OIDC_PROVIDER +
            '/.well-known/openid-configuration'
        )
      })
    },
  },
  set: {
    env: ({ arc, inventory }) => {
      if (process.env.NODE_ENV === 'production') {
        return {
          OIDC_PROVIDER: `https://cognito-idp.${
            process.env.COGNITO_USER_POOL_ID.split('_')[0]
          }.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/`,
          OIDC_CLIENT_ID: process.env.COGNITO_OIDC_CLIENT_ID,
          OIDC_CLIENT_SECRET: process.env.COGNITO_OIDC_CLIENT_SECRET,
        }
      } else {
        return {
          OIDC_PROVIDER: LOCAL_OIDC_PROVIDER,
          OIDC_CLIENT_ID: LOCAL_OIDC_CLIENT_ID,
          OIDC_CLIENT_SECRET: LOCAL_OIDC_CLIENT_SECRET,
        }
      }
    },
  },
}
