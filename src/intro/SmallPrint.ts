import { GlobalConfig } from "payload";

export const SmallPrint: GlobalConfig = {
    slug: "smallprint",
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
        }
    ]
};