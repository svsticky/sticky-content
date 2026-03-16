import { CollectionConfig } from "payload";

export const NewsItem: CollectionConfig = {
    slug: "main-news-item",
    labels: { singular: "News item", plural: "News items" },
    admin: {
        group: "Main website"
    },
    versions: {
        drafts: true
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
            localized: true
        },
        {
            name: "content",
            type: "richText",
            required: true,
            localized: true
        }
    ]
};