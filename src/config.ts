import { addFormats, Schema } from 'convict'

export interface ConfigSchema {
  port: number
  environment: 'development' | 'staging' | 'production' | 'test'
  awsRegion: string
  database: {
    host: string
    username: string
    password: string
    port: number
    name: string
    logging: boolean
    minPool: number
    maxPool: number
    ca: string
  }
  session: {
    secret: string
    name: string
    cookie: {
      maxAge: number
    }
  }
  otp: {
    expiry: number
    secret: string
    numValidPastWindows: number
    numValidFutureWindows: number
  }
  mailer: {
    senderName: string
    postmarkApiKey: string
    email: string
  }
}

addFormats({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'required-string': {
    validate: (val?: string): void => {
      if (val == undefined || val === '') {
        throw new Error('Required value cannot be empty')
      }
    },
  },
})

export const schema: Schema<ConfigSchema> = {
  port: {
    doc: 'The port that the service listens on',
    env: 'PORT',
    format: 'int',
    default: 8080,
  },
  environment: {
    doc: 'The environment that Node.js is running in',
    env: 'NODE_ENV',
    format: ['development', 'staging', 'production', 'test'],
    default: 'development',
  },
  awsRegion: {
    doc: 'The AWS region for SES. Optional, logs mail to console if absent',
    env: 'AWS_REGION',
    format: '*',
    default: '',
  },
  database: {
    username: {
      env: 'DB_USERNAME',
      sensitive: true,
      default: '',
      format: 'required-string',
    },
    password: {
      env: 'DB_PASSWORD',
      sensitive: true,
      default: '',
      format: 'required-string',
    },
    host: {
      env: 'DB_HOST',
      default: 'localhost',
      format: 'required-string',
    },
    port: {
      env: 'DB_PORT',
      default: 5432,
      format: Number,
    },
    name: {
      env: 'DB_NAME',
      default: '',
      format: 'required-string',
    },
    logging: {
      env: 'DB_LOGGING',
      default: false,
    },
    minPool: {
      env: 'DB_MIN_POOL_SIZE',
      default: 10,
    },
    maxPool: {
      env: 'DB_MAX_POOL_SIZE',
      default: 100,
    },
    ca: {
      env: 'CA_CERT',
      default: '',
      format: String,
    },
  },
  session: {
    name: {
      doc: 'Name of session ID cookie to set in response',
      env: 'SESSION_NAME',
      default: 'yourservice.sid',
      format: String,
    },
    secret: {
      doc: 'A secret string used to generate sessions for users',
      env: 'SESSION_SECRET',
      default: 'toomanysecrets',
      format: String,
    },
    cookie: {
      maxAge: {
        doc: 'The maximum age for a cookie, expressed in ms',
        env: 'COOKIE_MAX_AGE',
        format: 'int',
        default: 24 * 60 * 60 * 1000, // 24 hours
      },
    },
  },
  otp: {
    expiry: {
      doc: 'The number of seconds that an OTP is valid for a user',
      env: 'OTP_EXPIRY',
      format: 'int',
      default: 300,
    },
    secret: {
      doc: 'A secret string used to generate TOTPs for users',
      env: 'OTP_SECRET',
      format: '*',
      default: 'toomanysecrets',
    },
    numValidPastWindows: {
      doc:
        'The number of past windows for which tokens should be considered valid, where a window is the duration that an OTP is valid for, e.g. OTP expiry time.',
      env: 'OTP_NUM_VALID_PAST_WINDOWS',
      format: 'int',
      default: 1,
    },
    numValidFutureWindows: {
      doc:
        'The number of future windows for which tokens should be considered valid, where a window is the duration that an OTP is valid for, e.g. OTP expiry time.',
      env: 'OTP_NUM_VALID_FUTURE_WINDOWS',
      format: 'int',
      default: 0,
    },
  },
  mailer: {
    email: {
      doc: 'Email to send OTP emails from.',
      env: 'NO_REPLY_EMAIL',
      format: String,
      // TODO: REPLACE WITH YOUR OWN SERVICE EMAIL
      default: 'user@example.com',
    },
    senderName: {
      doc: 'Name of email sender',
      env: 'OTP_SENDER_NAME',
      format: String,
      default: 'Your Service',
    },
    postmarkApiKey: {
      doc: 'The API key used to send emails via Postmark',
      env: 'POSTMARK_API_KEY',
      format: 'required-string',
      default: '',
    },
  },
}
