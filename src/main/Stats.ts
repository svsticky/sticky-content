import { GlobalConfig } from "payload";

export const Stats: GlobalConfig = {
    slug: "main-stats",
    label: "Statistics",
    admin: {
        group: "Main website"
    },
    fields: [
        {
            name: "duration",
            type: "number",
            min: 0,
            required: true,
            defaultValue: 2000
        },
        {
            name: "stats",
            type: "array",
            minRows: 3,
            required: true,
            fields: [
                {
                    name: "target",
                    type: "number",
                    required: true
                },
                {
                    name: "unit",
                    type: "text",
                    localized: true
                },
                {
                    name: "description",
                    type: "text",
                    required: true,
                    localized: true
                },
                {
                    name: "include_unit_in_animation",
                    type: "checkbox",
                    defaultValue: true,
                    required: true
                }
            ]
        }
    ]
};