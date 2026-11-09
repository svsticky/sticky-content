import { Field, CollectionConfig, Block, GlobalConfig, Access } from "payload"

export const linkField = (name = 'link', overrides: Partial<Field> = {}): Field =>
  ({
    name,
    type: 'group',
    fields: [
      {
        name: 'type',
        type: 'radio',
        defaultValue: 'external',
        options: [
          { label: 'Internal page', value: 'internal' },
          { label: 'External URL', value: 'external' },
        ],
      },
      {
        name: 'page',
        type: 'relationship',
        relationTo: 'pages',
        admin: { condition: (_, s) => s?.type === 'internal' },
      },
      {
        name: 'url',
        type: 'text',
        admin: { condition: (_, s) => s?.type !== 'internal' },
      }
    ],
    ...overrides,
  }) as Field

const media = (name: string, required = false): Field => ({
  name,
  type: 'upload',
  relationTo: 'media',
  required,
})

export const TitleBlock: Block = {
  slug: 'title',
  admin: {
    disableBlockName: true
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'level',
      type: 'select',
      defaultValue: '1',
      options: [
        { label: 'H1', value: '1' },
        { label: 'H2', value: '2' },
        { label: 'H3', value: '3' },
        { label: 'H4', value: '4' },
        { label: 'H5', value: '5' },
        { label: 'H6', value: '6' },
      ],
    },
  ],
}

export const RichTextBlock: Block = {
  slug: 'rich-text',
  fields: [
    { name: 'body', type: 'richText', localized: true },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Subtitle', value: 'subtitle' },
      ],
    },
  ],
}

export const SeparatorBlock: Block = { slug: 'separator', fields: [] }

export const ButtonBlock: Block = {
  slug: 'button',
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    linkField('link'),
    { name: 'icon', type: 'text', admin: { description: 'Icon name, e.g. "globe"' } },
    {
      name: 'iconLocation',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
}

/** Used for hero buttons, partner buttons etc. */
export const buttonsField: Field = {
  name: 'buttons',
  type: 'blocks',
  blocks: [ButtonBlock],
}

export const StatItemBlock: Block = {
  slug: 'stat-item',
  fields: [
    { name: 'target', type: 'number', required: true },
    { name: 'unit', type: 'text', required: true, localized: true },
  ],
}

/** "reason" is reused by partnering-reasons and promotion.possibilities */
export const reasonFields: Field[] = [
  { name: 'icon', type: 'text' },
  { name: 'title', type: 'text', required: true, localized: true },
  { name: 'description', type: 'textarea', localized: true },
]

export const CommitteeOverviewBlock: Block = {
  slug: 'committee-overview',
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Committees', value: 'com' },
        { label: 'Working groups', value: 'wer' },
      ],
    },
  ],
}
export const PartnerOverviewBlock: Block = { slug: 'partner-overview', fields: [] }
export const VacancyOverviewBlock: Block = { slug: 'vacancy-overview', fields: [] }
export const NewsOverviewBlock: Block = { slug: 'news-overview', fields: [] }
export const SocietyOverviewBlock: Block = { slug: 'society-overview', fields: [] }
export const CurrentBoardBlock: Block = { slug: 'current-board', fields: [] }
export const OldBoardsBlock: Block = { slug: 'old-boards', fields: [] }
export const ActivitiesBlock: Block = { slug: 'activities', fields: [] }
export const PartnerCarouselBlock: Block = { slug: 'partner-carousel', fields: [] }
export const NewsCarouselBlock: Block = { slug: 'news-carousel', fields: [] }
export const ActivitiesCarouselBlock: Block = { slug: 'activities-carousel', fields: [] }

export const LinksPageBlock: Block = {
  slug: 'links-page',
  fields: [
    {
      name: 'links',
      type: 'array', // was blok: link-item
      fields: [
        { name: 'name', type: 'text', required: true, localized: true },
        linkField('url'),
        { name: 'description', type: 'text', localized: true },
        { name: 'category', type: 'text' },
        { name: 'icon', type: 'text', admin: { description: 'FontAwesome class, e.g. "fas fa-globe"' } },
        { name: 'iconColour', type: 'text', admin: { description: 'Hex colour' } },
      ],
    },
  ],
}

export const TimelineBlock: Block = {
  slug: 'timeline',
  fields: [
    {
      name: 'items',
      type: 'array', // was blok: timeline-item
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'date', type: 'date', required: true },
        media('photo'),
        { name: 'description', type: 'richText', localized: true },
        { name: 'isLustrum', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}

export const LvvPageBlock: Block = {
  slug: 'lvv-page',
  fields: [
    {
      name: 'people',
      type: 'array', // was blok: lvv
      fields: [
        { name: 'name', type: 'text', required: true },
        media('photo'),
        { name: 'since', type: 'number', admin: { description: 'Year' } },
        { name: 'body', type: 'richText', localized: true },
      ],
    },
  ],
}

export const ContactGridBlock: Block = {
  slug: 'contact-grid',
  fields: [
    { name: 'data', type: 'richText', localized: true },
    { name: 'visitAddress', type: 'richText', localized: true },
    { name: 'postalAddress', type: 'richText', localized: true },
    {
      name: 'people',
      type: 'array', // was blok: contact-card
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'title', type: 'text', localized: true },
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        media('photo'),
      ],
    },
  ],
}

export const BrandingColourBlock: Block = {
  slug: 'branding-colour',
  fields: [{ name: 'colour', type: 'text', admin: { description: 'Hex colour' } }],
}

export const BrandingLogosBlock: Block = {
  slug: 'branding-logos',
  fields: [
    {
      name: 'logoTypes',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true, localized: true },
        { name: 'description', type: 'richText', localized: true },
        { name: 'blackLink', type: 'text' },
        { name: 'whiteLink', type: 'text' },
        { name: 'colourLink', type: 'text' },
      ],
    },
  ],
}

export const BrandingPosterBlock: Block = {
  slug: 'branding-poster',
  fields: [
    {
      name: 'specs',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'value', type: 'text', required: true, localized: true },
      ],
    },
  ],
}

export const PartneringReasonsBlock: Block = {
  slug: 'partnering-reasons',
  fields: [{ name: 'reasons', type: 'array', fields: reasonFields }],
}

export const CollaborationFormBlock: Block = {
  slug: 'collaboration-form',
  fields: [{ name: 'header', type: 'richText', localized: true }],
}

export const BrandingTwoColBlock: Block = {
  slug: 'branding-twocol',
  fields: [
    {
      name: 'column1',
      type: 'blocks',
      blocks: [TitleBlock, RichTextBlock, PartneringReasonsBlock],
    },
    {
      name: 'column2',
      type: 'blocks',
      blocks: [TitleBlock, RichTextBlock, CollaborationFormBlock],
    },
  ],
}

export const PromotionBlock: Block = {
  slug: 'promotion',
  fields: [
    { name: 'possibilities', type: 'array', fields: reasonFields }, // was blok: reason
    { name: 'sponsorDescription', type: 'richText', localized: true },
    {
      name: 'sponsoredActivities',
      type: 'array', // was blok: sponsored_activity
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', localized: true },
        media('photo'),
      ],
    },
  ],
}

export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    { name: 'body', type: 'richText', localized: true },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
    buttonsField,
  ],
}

export const FeaturedPartnerBannerBlock: Block = {
  slug: 'featured-partner-banner',
  fields: [
    { name: 'partnerName', type: 'text' },
    linkField('link'),
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
  ],
}

export const StatsSectionBlock: Block = {
  slug: 'stats-section',
  fields: [
    { name: 'duration', type: 'number', admin: { description: 'Animation duration (ms)' } },
    { name: 'stats', type: 'blocks', blocks: [StatItemBlock] },
  ],
}

export const InfoColumnsBlock: Block = {
  slug: 'info-columns',
  fields: [
    { name: 'drinksDay', type: 'text', localized: true },
    { name: 'drinksTime', type: 'text', localized: true },
    { name: 'drinksLocation', type: 'text', localized: true }
  ],
}

export const VcpPages: Block = {
  slug: 'vcp-page',
  fields: [
    { name: 'body', type: 'richText', localized: true },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      required: true,
      localized: true
    },
    {
      name: 'people',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        media('photo'),
      ],
    },
  ],
}

export const pageBlocks: Block[] = [
  TitleBlock,
  RichTextBlock,
  SeparatorBlock,
  CommitteeOverviewBlock,
  PartnerOverviewBlock,
  VacancyOverviewBlock,
  NewsOverviewBlock,
  SocietyOverviewBlock,
  CurrentBoardBlock,
  OldBoardsBlock,
  ActivitiesBlock,
  LinksPageBlock,
  TimelineBlock,
  LvvPageBlock,
  ContactGridBlock,
  BrandingColourBlock,
  BrandingLogosBlock,
  BrandingPosterBlock,
  BrandingTwoColBlock,
  PromotionBlock,
  HeroBlock,
  FeaturedPartnerBannerBlock,
  StatsSectionBlock,
  InfoColumnsBlock,
  PartnerCarouselBlock,
  NewsCarouselBlock,
  ActivitiesCarouselBlock,
  VcpPages
]

const group = "Main website";

// Collections

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title', group },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'body', type: 'blocks', blocks: pageBlocks },
  ],
}

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: { useAsTitle: 'name', group },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    media('logo'),
    { name: 'isMain', type: 'checkbox', defaultValue: false },
    { name: 'mainText', type: 'richText', localized: true },
    { name: 'body', type: 'richText', localized: true },
    buttonsField,
  ],
}

export const Committees: CollectionConfig = {
  slug: 'committees',
  admin: { useAsTitle: 'name', group },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Committee', value: 'com' },
        { label: 'Working group', value: 'wer' },
      ],
    },
    media('logo'),
    { name: 'description', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', localized: true },
  ],
}

export const Boards: CollectionConfig = {
  slug: 'boards',
  admin: { useAsTitle: 'year', group },
  fields: [
    { name: 'boardNumber', type: 'number', required: true },
    { name: 'year', type: 'text', required: true, admin: { description: 'e.g. 2024-2025' } },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'isCurrent', type: 'checkbox', defaultValue: false },
    { name: 'zinspreuk', type: 'text' },
    { name: 'colour', type: 'text', admin: { description: 'Hex colour' } },
    media('photo'),
    { name: 'boardMembers', type: 'richText', localized: true },
    {
      name: 'members',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'function', type: 'text', localized: true },
        media('photo'),
        { name: 'bio', type: 'richText', localized: true },
        linkField('linkedinUrl'),
      ],
    },
  ],
}

export const Vacancies: CollectionConfig = {
  slug: 'vacancies',
  admin: { useAsTitle: 'name', group },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'partner', type: 'relationship', relationTo: 'partners', hasMany: true },
    {
      name: 'types',
      type: 'relationship',
      hasMany: true,
      relationTo: 'job-types'
    },
    {
      name: 'studies',
      type: 'relationship',
      hasMany: true,
      relationTo: 'programmes'
    },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false },
    { name: 'shortText', type: 'textarea', localized: true },
    { name: 'longText', type: 'richText', localized: true },
    buttonsField,
  ],
}

export const NewsItems: CollectionConfig = {
  slug: 'news-items',
  admin: { useAsTitle: 'title', group },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    media('image'),
    { name: 'description', type: 'textarea', localized: true },
    { name: 'keywords', type: 'text', localized: true },
    { name: 'content', type: 'richText', localized: true },
  ],
}

export const Societies: CollectionConfig = {
  slug: 'societies',
  admin: { useAsTitle: 'name', group },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'colour', type: 'text', admin: { description: 'Hex colour' } },
    media('logo'),
    { name: 'photos', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'shortText', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', localized: true },
  ],
}

const Programmes: CollectionConfig = {
  slug: "programmes",
  admin: { useAsTitle: 'name', group },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'type', type: 'select', options: ['Bachelor', 'Master'], required: true }
  ]
}

const JobTypes: CollectionConfig = {
  slug: "job-types",
  admin: { useAsTitle: "name", group },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true }
  ]
}

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: { group },
  fields: [
    {
      name: 'items',
      type: 'blocks',
      blocks: [
        {
          slug: 'nav-menu',
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            {
              name: 'links',
              type: 'array',
              fields: [{ name: 'title', type: 'text', required: true, localized: true }, linkField('link')],
            },
          ],
        },
        {
          slug: 'nav-button',
          fields: [{ name: 'title', type: 'text', required: true, localized: true }, linkField('link')],
        },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true
        },
        linkField('link')
      ]
    }
  ],
}

const onlyXCom: Access = async ({ req: { user } }) => ["Bestuur", "XCom"].includes(user?.permissions ?? "");
const onlyBoard: Access = async ({ req: { user } }) => user?.permissions === "Bestuur"
const setReadAccess = <T extends CollectionConfig | GlobalConfig>(access: Access, conf: T): T => ({
  ...conf,
  access: { ...conf.access ?? {}, read: access }
});
const setAllAccess = <T extends CollectionConfig | GlobalConfig>(access: Access, conf: T): T => ({
  ...conf,
  access: { create: access, delete: access, update: access, read: access, admin: access }
});

export const collections: CollectionConfig[] = [
  setAllAccess(onlyBoard, Pages),
  setAllAccess(onlyXCom, Partners),
  setAllAccess(onlyBoard, Committees),
  setAllAccess(onlyBoard, Boards),
  setAllAccess(onlyXCom, Vacancies),
  setAllAccess(onlyBoard, NewsItems),
  setAllAccess(onlyBoard, Societies),
  setReadAccess(onlyXCom, setAllAccess(onlyBoard, Programmes)),
  setReadAccess(onlyXCom, setAllAccess(onlyBoard, JobTypes))
];

export const globals: GlobalConfig[] = [
  setAllAccess(onlyBoard, Navigation)
];
