import { Access, CollectionConfig } from "payload";

const onlyBoard: Access = async ({ req: { user } }) => user?.permissions === "Bestuur";

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: onlyBoard,
    update: onlyBoard,
    create: onlyBoard,
    delete: onlyBoard
  },
  auth: {
    useAPIKey: true,
  },
  fields: [
    {
      name: 'permissions',
      type: 'select',
      options: ["Introcommissie", "Bestuur", "XCom"],
      required: true,
    }
  ],
};

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: { read: () => true },
  fields: [{ name: 'alt', type: 'text', localized: true }],
};

export const collections: CollectionConfig[] = [
  Users,
  Media,
];