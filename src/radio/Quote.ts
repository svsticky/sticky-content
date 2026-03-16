import { CollectionConfig } from "payload";

export const Quote: CollectionConfig = {
    slug: "quote",
    admin: {
        useAsTitle: "text",
        group: "Radio"
    },
    versions: {
        drafts: true
    },
    access: {
        read: ({ req }) => {
            return (req.user?.apiKey) ? { _status: { equals: "published" } } : true;
        }
    },
    fields: [
        {
            name: "text",
            type: "text",
            required: true
        },
        {
            name: "person",
            type: "text",
            required: true
        }
    ]
};