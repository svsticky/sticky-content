import { GlobalConfig } from "payload";

export const Association: GlobalConfig = {
    slug: "association",
    admin: {
        group: "Intro website"
    },
    versions: {
        drafts: true
    },
    fields: [
        {
            name: "content",
            type: "richText"
        }
    ]
}