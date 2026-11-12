import type { Access, CollectionConfig } from 'payload'

export const Quotes: CollectionConfig = {
  slug: 'quotes',
  labels: { singular: 'Quote', plural: 'Quotes' },
  admin: {
    useAsTitle: 'text',
    description: 'Quotes from the members of Sticky',
    group: "Radio"
  },
  fields: [
    { name: 'text', label: 'Text', type: 'text', required: true },
    { name: 'person', label: 'Person', type: 'text', required: true },
  ],
}

export const BoardMessages: CollectionConfig = {
  slug: 'board-message',
  labels: { singular: 'Board Message', plural: 'Board Messages' },
  admin: {
    useAsTitle: 'message',
    description: 'Messages from the board to all members',
    group: "Radio"
  },
  fields: [{ name: 'message', label: 'Message', type: 'text', required: true }],
}

export const Ads: CollectionConfig = {
  slug: 'ads',
  labels: { singular: 'Ad', plural: 'Ads' },
  admin: {
    useAsTitle: 'title',
    description: 'Ads from companies',
    group: "Radio"
  },
  fields: [
    { name: 'poster', label: 'Poster', type: 'upload', relationTo: 'media', required: true },
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    {
      name: 'fullscreen',
      label: 'Fullscreen',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      admin: {
        description:
          'Is this a fullscreen horizontal ad (16:9) or a sidebar standing up (9:16) ad',
      },
    },
    {
      name: 'durationSec',
      label: 'durationSec',
      type: 'number',
      min: 0,
      defaultValue: 8,
    },
  ],
}

const onlyBoard: Access = async ({ req: { user } }) => user?.permissions === "Bestuur";

export const collections: CollectionConfig[] = [
  Quotes,
  BoardMessages,
  Ads,
].map(coll => ({
  ...coll,
  access: {
    read: () => true,  // These collections are public read access, since they need to be accessible in the browser
    create: onlyBoard, // The rest of the operations are reserved for the board account(s).
    delete: onlyBoard,
    update: onlyBoard,
    admin: onlyBoard
  }
}) as CollectionConfig);