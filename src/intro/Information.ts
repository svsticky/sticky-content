import { GlobalConfig } from "payload";

export const Information: GlobalConfig = {
    slug: "information",
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
            name: "Pictures",
            type: "upload",
            relationTo: "media",
            hasMany: true
        }
    ]
};