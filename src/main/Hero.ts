import { url_field } from "@/fields/url";
import { GlobalConfig } from "payload";

export const Hero: GlobalConfig = {
    slug: "main-hero",
    label: "Hero",
    admin: {
        group: "Main website"
    },
    versions: {
        drafts: true
    },
    fields: [
        {
            name: "content",
            type: "richText",
            required: true,
            localized: true
        },
        {
            type: "upload",
            name: "pictures",
            relationTo: "media",
            hasMany: true,
            required: true
        },
        {
            type: "array",
            name: "buttons",
            fields: [
                {
                    type: "text",
                    name: "label",
                    localized: true,
                    required: true
                },
                url_field({ name: "link" })
            ]
        }
    ]
};