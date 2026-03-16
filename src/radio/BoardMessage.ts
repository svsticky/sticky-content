import { CollectionConfig } from "payload";

export const BoardMessage: CollectionConfig = {
    slug: "board-message",
    admin: {
        useAsTitle: "message",
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
            name: "message",
            type: "text",
            required: true,
        }
    ]
};