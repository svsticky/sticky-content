import { TelephoneField } from "@nouance/payload-better-fields-plugin/Telephone";
import { GlobalConfig } from "payload";

export const Contact: GlobalConfig = {
    slug: "main-contact",
    label: "Contact page",
    admin: {
        group: "Main website"
    },
    fields: [
        {
            type: "array",
            name: "people",
            required: true,
            localized: true,
            fields: [
                {
                    type: "text",
                    name: "title"
                },
                {
                    type: "text",
                    name: "name"
                },
                {
                    type: "text",
                    name: "function"
                },
                ...TelephoneField({ name: "phone" }, { defaultCountry: "NL" }),
                {
                    type: "email",
                    name: "email"
                },
                {
                    type: "upload",
                    relationTo: "media",
                    required: true,
                    name: "photo"
                }
            ]
        },
        {
            name: "address",
            type: "richText",
            required: true,
            localized: true
        },
        {
            name: "postal",
            type: "richText",
            required: true,
            localized: true
        },
        {
            name: "data",
            type: "richText",
            required: true,
            localized: true
        }
    ]
}