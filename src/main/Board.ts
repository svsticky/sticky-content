import { CollectionConfig, PayloadComponent } from "payload";

export const Board: CollectionConfig = {
    slug: "main-board",
    labels: { singular: "Board", plural: "Boards" },
    admin: {
        group: "Main website"
    },
    versions: {
        drafts: true
    },
    fields: [
        {
            name: "board_number",
            type: "number",
            min: 1,
            required: true
        },
        {
            name: "year",
            type: "text",
            required: true,
            validate: (input: string | null | undefined) => /\d{4}-\d{4}/.test(input ?? "") || "Inavalid format: wanted YYYY-YYYY"
        },
        {
            name: "colour",
            type: "text",
            required: true
        },
        {
            name: "zinspreuk",
            type: "text",
            required: true
        },
        {
            name: "picture",
            type: "upload",
            relationTo: "media",
            required: true
        },
        {
            name: "enable_personal_texts",
            type: "checkbox",
            required: true
        },
        {
            name: "board_members",
            type: "array",
            required: true,
            fields: [
                {
                    name: "name",
                    type: "text",
                    required: true
                },
                {
                    name: "function",
                    type: "text",
                    required: true,
                    localized: true
                },
                {
                    name: "picture",
                    type: "upload",
                    relationTo: "media",
                    admin: {
                        condition: (data: Partial<any>) => !!data.enable_personal_texts
                    }
                },
                {
                    name: "description",
                    type: "richText",
                    admin: {
                        condition: (data: Partial<any>) => !!data.enable_personal_texts
                    }
                }
            ],
        }
    ]
};