import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Access, CollectionConfig, GlobalConfig, PayloadRequest } from 'payload'

export const Person: CollectionConfig = {
  slug: 'person',
  labels: { singular: 'Person', plural: 'People' },
  admin: { useAsTitle: 'name', group: "Intro website" },
  fields: [
    {
      name: 'name',
      label: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Name of the person' },
    },
    {
      name: 'email',
      label: 'email',
      type: 'text',
      admin: { description: 'Email for the person' },
    },
    {
      name: 'phone',
      label: 'phone',
      type: 'text',
      required: true,
      admin: { description: 'Telephone number for a person' },
    },
    {
      name: 'role',
      label: 'role',
      type: 'select',
      hasMany: true,
      required: true,
      options: ['Secretaris', 'Voorzitter', 'Vertrouwenscontactpersoon'],
    },
    {
      name: 'photo',
      label: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

export const Supermentor: CollectionConfig = {
  slug: 'supermentor',
  labels: { singular: 'Supermentor', plural: 'Supermentors' },
  admin: { useAsTitle: 'name', group: "Intro website" },
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    {
      name: 'picture',
      label: 'Picture',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true
    }
  ],
}

export const Hero: GlobalConfig = {
  slug: 'hero',
  admin: {
    description: 'Top-most section on the page, just under the navigation.',
    group: "Intro website"
  },
  fields: [
    {
      name: "content",
      type: "richText",
      required: true
    },
    {
      name: 'pictures',
      label: 'pictures',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
  ],
}

export const Association: GlobalConfig = {
  slug: 'association',
  admin: { description: 'Association section on the page', group: "Intro website" },
  fields: [
    {
      name: "content",
      type: "richText",
      required: true
    },
  ],
}

export const Contact: GlobalConfig = {
  slug: 'contact',
  admin: { description: 'Contact section on the page', group: "Intro website" },
  fields: [
    {
      name: "contactContent",
      type: "richText",
      required: true
    },
    {
      // Contentful had no linkContentType restriction here; assumed to be `person`
      name: 'contactPersons',
      label: 'Contact persons',
      type: 'relationship',
      relationTo: 'person',
      hasMany: true,
      required: true,
    },
    {
      name: "confidentialContent",
      type: "richText",
      required: true
    },
    {
      // Contentful had no linkContentType restriction here; assumed to be `person`
      name: 'confidentialContactPersons',
      label: 'Confidential contact persons',
      type: 'relationship',
      relationTo: 'person',
      hasMany: true,
      required: true,
    },
  ],
}

export const Signup: GlobalConfig = {
  slug: 'signup',
  admin: { group: "Intro website" },
  fields: [
    {
      name: "content",
      type: "richText",
      required: true
    },
    { name: 'buttonContent', label: 'Button Content', type: 'text', required: true },
    { name: 'buttonLink', label: 'Button Link', type: 'text' },
  ],
}

export const Theme: GlobalConfig = {
  slug: 'theme',
  admin: { group: "Intro website" },
  fields: [
    {
      name: "content",
      type: "richText",
      required: true
    },
    {
      name: "reveal",
      type: "richText",
      required: true
    },
    {
      name: "supermentorText",
      type: "richText",
      required: true
    },
    {
      name: 'supermentors',
      label: 'Supermentors',
      type: 'relationship',
      relationTo: 'supermentor',
      hasMany: true,
    },
  ],
}

export const FAQ: GlobalConfig = {
  slug: 'faq',
  admin: { group: "Intro website" },
  fields: [
    {
      name: 'questions',
      label: 'Questions',
      type: 'relationship',
      relationTo: 'faq-question',
      hasMany: true,
      required: true,
    },
  ],
}

export const SmallPrint: GlobalConfig = {
  slug: 'small-print',
  admin: { group: "Intro website" },
  fields: [
    {
      name: "content",
      type: "richText",
      required: true
    },
  ],
}

export const Information: GlobalConfig = {
  slug: 'information',
  admin: { group: "Intro website" },
  fields: [
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: 'images',
      label: 'Images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
  ],
}

export const FAQQuestion: CollectionConfig = {
  slug: 'faq-question',
  labels: { singular: 'FAQ Question', plural: 'FAQ Questions' },
  admin: { useAsTitle: 'question', group: "Intro website" },
  fields: [
    { name: 'question', label: 'Question', type: 'textarea', required: true },
    {
      name: "answer",
      type: "richText",
      required: true
    },
  ],
}

const onlyIntro: Access = async ({ req: { user } }) => ["Bestuur", "Introcommissie"].includes(user?.permissions ?? "");
const setAccess = <T extends CollectionConfig | GlobalConfig>(confs: T[]): T[] => confs.map(conf => ({
  ...conf,
  access: { create: onlyIntro, delete: onlyIntro, update: onlyIntro, read: onlyIntro, admin: onlyIntro }
}));

export const collections: CollectionConfig[] = setAccess([
  Person,
  Supermentor,
  FAQQuestion,
]);

export const globals: GlobalConfig[] = setAccess([
  Hero,
  Association,
  Contact,
  Signup,
  Theme,
  FAQ,
  SmallPrint,
  Information,
]);