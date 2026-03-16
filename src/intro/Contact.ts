import { GlobalConfig } from "payload";

export const Contact: GlobalConfig = {
    slug: "contact",
    admin: {
        group: "Intro website"
    },
    versions: {
        drafts: true
    },
    fields: [
        {
            name: "Contact content",
            type: "richText"
        },
        {
            name: "Contact people",
            type: "relationship",
            relationTo: "person",
            hasMany: true
        },
        {
            name: "Confidential contact content",
            type: "richText"
        },
        {
            name: "Confidential contact people",
            type: "relationship",
            relationTo: "person",
            hasMany: true
        },
    ]
}