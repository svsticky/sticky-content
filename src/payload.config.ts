// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './common/Users'
import { Association } from './intro/Association'
import { Contact } from './intro/Contact'
import { Media } from './common/Media'
import { Person } from './intro/Person'
import { FAQQuestion } from './intro/FAQQuestion'
import { FAQ } from './intro/FAQ'
import { Supermentor } from './intro/Supermentor'
import { Hero as IntroHero } from './intro/Hero'
import { Hero as MainHero } from './main/Hero'
import { Information } from './intro/Information'
import { Signup } from './intro/Signup'
import { SmallPrint } from './intro/SmallPrint'
import { Theme } from './intro/Theme'
import { Ad } from './radio/Ad'
import { BoardMessage } from './radio/BoardMessage'
import { Quote } from './radio/Quote'
import { Stats } from './main/Stats'
import { NewsItem } from './main/NewsItem'
import { Committee } from './main/Committee'
import { Board } from './main/Board'
import { Company } from './vacancies/Company'
import { CompanyContact } from './vacancies/CompanyContact'
import { Vacancy } from './vacancies/Vacancy'
import { Study } from './vacancies/Study'
import { Contact as MainContact } from "./main/Contact"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      actions: ["./app/(components)/Deploy"],
      graphics: {
        Icon: "./app/(components)/Icon",
        Logo: "./app/(components)/Logo"
      }
    }
  },
  collections: [
    Users, Media, Person, FAQQuestion, Supermentor, Ad, BoardMessage,
    Quote, NewsItem, Committee, Board, Company, CompanyContact, Vacancy,
    Study
  ],
  globals: [
    Association, Contact, FAQ, IntroHero, Information, Signup, SmallPrint,
    Theme, MainHero, Stats, MainContact
  ],
  localization: {
    locales: ["nl", "en"],
    defaultLocale: "nl"
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
  cors: ["http://localhost:5173"],
  bin: [{
    scriptPath: path.resolve(dirname, "seeds", "index.ts"),
    key: "seed"
  }]
})
