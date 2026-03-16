import { GlobalConfig } from "payload";

export const Theme: GlobalConfig = {
    slug: "theme",
    admin: {
        group: "Intro website"
    },
    versions: {
        drafts: true
    },
    fields: [
        {
            name: "Content",
            type: "richText"
        },
        {
            name: "Reveal",
            type: "richText"
        },
        {
            name: "Supermentor Text",
            type: "richText"
        },
        {
            name: "Supermentors",
            type: "relationship",
            relationTo: "supermentor",
            hasMany: true
        }
    ]
};