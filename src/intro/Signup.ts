import { GlobalConfig } from "payload";

export const Signup: GlobalConfig = {
    slug: "signup",
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
            name: "Button Text",
            type: "text"
        },
        {
            name: "Button Link",
            type: "text"
        }
    ]
};