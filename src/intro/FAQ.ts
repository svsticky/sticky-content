import { GlobalConfig } from "payload";

export const FAQ: GlobalConfig = {
    slug: "faq",
    admin: {
        group: "Intro website"
    },
    versions: {
        drafts: true
    },
    fields: [
        {
            name: "Questions",
            type: "relationship",
            relationTo: "faq-question",
            hasMany: true
        }
    ]
}