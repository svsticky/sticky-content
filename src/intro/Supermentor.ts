import { CollectionConfig } from "payload";

export const Supermentor: CollectionConfig = {
    slug: "supermentor",
    admin: {
        useAsTitle: "Name",
        group: "Intro website"
    },
    versions: {
        drafts: true
    },
    fields: [
        {
            name: "Name",
            type: "text"
        },
        {
            name: "Picture",
            type: "upload",
            relationTo: "media"
        },
        {
            name: "Content",
            type: "richText"
        }
    ]
};