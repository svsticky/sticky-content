import { CollectionConfig } from "payload";

export const Study: CollectionConfig = {
    slug: "study",
    admin: {
        useAsTitle: "name",
        group: "Vacancies"
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            localized: true
        },
        {
            name: "abbreviation",
            type: "text",
            required: true
        },
        {
            name: "order",
            type: "number",
            required: true
        }
    ]
};