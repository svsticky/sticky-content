import { CollectionConfig } from "payload";

export const Committee: CollectionConfig = {
    slug: "main-committee",
    labels: { singular: "Committee", plural: "Committees" },
    admin: {
        group: "Main website"
    },
    versions: {
        drafts: true
    },
    fields: [
        {
            name: "slug",
            type: "text",
            required: true,
            admin: {
                description: "The part after /commissies/ in the url of the website"
            }
        },
        {
            name: "name",
            type: "text",
            required: true,
            localized: true
        },
        {
            name: "logo",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: "about",
            type: "richText",
            required: true,
            localized: true
        }
    ]
};