import { CollectionConfig } from "payload";

export const Ad: CollectionConfig = {
    slug: "ad",
    admin: {
        useAsTitle: "title",
        group: "Radio"
    },
    versions: {
        drafts: true
    },
    access: {
        read: ({ req }) => {
            return (req.user?.apiKey) ? { _status: { equals: "published" } } : true;
        }
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true
        },
        {
            name: "fullscreen",
            type: "checkbox",
            required: true,
            admin: {
                description: "Is this a fullscreen horizontal ad (16:9) or a sidebar standing up (9:16) ad"
            }
        },
        {
            name: "poster",
            type: "upload",
            required: true,
            relationTo: "media"
        },
        {
            name: "duration",
            type: "number",
            required: true,
            defaultValue: 8,
            min: 0,
            admin: {
                description: "Duration of the ad in seconds",
            }
        },
        {
            name: "description",
            type: "textarea",
            admin: {
                condition: (data) => !data.fullscreen
            }
        }
    ]
}