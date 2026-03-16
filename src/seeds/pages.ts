import { Payload } from "payload";
import { indexToFunction, richTextLorem } from "./utils";
import { fakerNL, fakerEN_GB as fakerEN } from "@faker-js/faker";
import { MainContact } from "@/payload-types";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

type ElementOf<T> = T extends (infer U)[] ? U : never;

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

async function seedContactPerson(p: Payload, index: number): Promise<Omit<Required<ElementOf<MainContact["people"]>>, "id">> {
    const filePath = path.resolve(dirname, "assets", `contact-${index}.jpg`);
    await fetch(fakerNL.image.personPortrait())
        .then(resp => resp.bytes())
        .then(buf => writeFile(filePath, buf));

    const name = fakerNL.person.fullName();

    const photo = await p.create({
        collection: "media",
        data: { alt: `Photo of ${name}` },
        filePath
    });

    return {
        title: fakerNL.person.jobTitle(),
        name,
        function: indexToFunction(index, "nl"),
        phone: fakerNL.phone.number({ style: "international" }),
        email: fakerNL.internet.email(),
        photo
    };
}

export default async function (p: Payload) {
    p.logger.info("Creating contact page");

    const contact_people = await Promise.all(Array(6).fill(null).map((_, i) => seedContactPerson(p, i)));
    await p.updateGlobal({
        slug: "main-contact",
        data: {
            address: richTextLorem(fakerNL, { min: 1, max: 1 }),
            postal: richTextLorem(fakerNL, { min: 1, max: 1 }),
            data: richTextLorem(fakerNL, { min: 1, max: 1 }),
            people: contact_people
        },
        locale: "nl"
    });

    await p.updateGlobal({
        slug: "main-contact",
        data: {
            address: richTextLorem(fakerEN, { min: 1, max: 1 }),
            postal: richTextLorem(fakerEN, { min: 1, max: 1 }),
            data: richTextLorem(fakerEN, { min: 1, max: 1 }),
            people: contact_people.map((person, index) => ({
                ...person,
                title: fakerEN.person.jobTitle(),
                function: indexToFunction(index, "nl"),
                phone: fakerEN.phone.number({ style: "international" }),
                email: fakerEN.internet.email(),
            }))
        },
        locale: "en"
    });
}