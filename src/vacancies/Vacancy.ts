import { CollectionConfig, Where } from "payload";

export const Vacancy: CollectionConfig = {
    slug: "vacancy",
    labels: { singular: "Vacancy", plural: "Vacancies" },
    admin: {
        group: "Vacancies",
        useAsTitle: "title",
        defaultColumns: ["title", "company"]
    },
    versions: { drafts: true },
    fields: [
        {
            name: "title",
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
            name: "summary",
            type: "text",
            required: true,
            localized: true
        },
        {
            name: "content",
            type: "richText",
            required: true,
            localized: true
        },
        {
            name: "type",
            type: "select",
            hasMany: true,
            enumName: "vacancy_type",
            options: [
                { label: "Graduation assignment", value: "1" },
                { label: "Side job", value: "2" },
                { label: "Full-time job", value: "3" },
                { label: "Part-time job", value: "4" },
                { label: "Internship", value: "5" },
                { label: "Traineeship", value: "6" },
                { label: "PhD", value: "7" },
            ]
        },
        {
            name: "studies",
            type: "relationship",
            relationTo: "study",
            hasMany: true
        },
        {
            name: "company",
            type: "relationship",
            relationTo: "company",
            required: true
        },
        {
            name: "contact",
            type: "relationship",
            relationTo: "company-contact",
            filterOptions: ({ data }) => ({ company: { equals: data.company } })
        }
    ]
};