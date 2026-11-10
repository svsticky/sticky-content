import { postgresAdapter } from '@payloadcms/db-postgres'
import { TableFeature, FixedToolbarFeature, lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import * as common from './collections/common';
import * as introWebsite from './collections/intro-website';
import * as mainWebsite from './collections/main-website';
import * as radio from './collections/radio';
import { sharpTransformer } from '@payloadcms/transformer-sharp';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: common.Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    ...common.collections,
    ...introWebsite.collections,
    ...mainWebsite.collections,
    ...radio.collections
  ],
  globals: [
    ...introWebsite.globals,
    ...mainWebsite.globals
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures, rootFeatures, }) =>
      [...defaultFeatures, ...rootFeatures, UploadFeature(), FixedToolbarFeature(), TableFeature()]
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  plugins: [],
  localization: {
    locales: ["nl", "en"],
    defaultLocale: "nl"
  },
  upload: {
    limits: {
      fileSize: 10000000
    },
    transformers: [sharpTransformer({ sharp })],
  },
  serverURL: process.env.SERVER_URL || "http://localhost:3000",
  graphQL: { disable: true }
})
