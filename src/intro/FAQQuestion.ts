import { CollectionConfig } from "payload";

export const FAQQuestion: CollectionConfig = {
    slug: "faq-question",
    admin: {
        useAsTitle: "Question",
        group: "Intro website"
    },
    versions: {
        drafts: true
    },
    fields: [
        {
            name: "Question",
            type: "text"
        },
        {
            name: "Answer",
            type: "richText"
        }
    ]
}