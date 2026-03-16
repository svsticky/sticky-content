import { GlobalConfig } from "payload";

export const Hero: GlobalConfig = {
    slug: "intro-hero",
    label: "Hero",
    admin: {
        group: "Intro website",
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
            name: "pictures",
            type: "upload",
            relationTo: "media",
            hasMany: true
        }
    ]
};