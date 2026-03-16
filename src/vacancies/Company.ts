import { url_field } from "@/fields/url";
import { CollectionConfig } from "payload";

export const Company: CollectionConfig = {
    slug: "company",
    labels: { singular: "Company", plural: "Companies" },
    admin: {
        useAsTitle: "name",
        group: "Vacancies"
    },
    versions: { drafts: true },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            localized: true
        },
        {
            name: "slug",
            type: "text",
            required: true
        },
        {
            name: "logo",
            type: "upload",
            relationTo: "media",
            required: true
        },
        {
            name: "description",
            type: "richText",
            localized: true
        },
        url_field({
            name: "website",
        }),
        {
            name: "contacts",
            type: "join",
            collection: "company-contact",
            on: "company"
        },
        {
            name: "vacancies",
            type: "join",
            collection: "vacancy",
            on: "company"
        }
    ]
};