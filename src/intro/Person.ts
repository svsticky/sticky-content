import { CollectionConfig } from "payload";

export const Person: CollectionConfig = {
    slug: "person",
    admin: {
        useAsTitle: "Name",
        group: "Intro website"
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
            name: "Name",
            type: "text"
        },
        {
            name: "Email",
            type: "email"
        },
        {
            name: "Phone",
            type: "text"
        },
        {
            name: "Role",
            type: "select",
            options: ["Voorzitter", "Secretaris", "Vertrouwenscontactpersoon"]
        },
        {
            name: "Photo",
            type: "upload",
            relationTo: "media"
        }
    ]
}