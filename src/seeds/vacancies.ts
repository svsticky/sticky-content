import { Payload } from "payload";

import { fileURLToPath } from "node:url";
import path from "node:path";
import { fakerEN, fakerNL } from "@faker-js/faker";
import { richTextLorem } from "./utils";
import { CompanyContact } from "@/payload-types";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function to_slug(s: string) {
    return s.replaceAll(/\W+/g, "-").toLowerCase();
}

const vacancy_options = ["1", "2", "3", "4", "5", "6", "7"] as const;

export default async function (p: Payload) {
    // Companies
    const logo = await p.create({
        collection: "media",
        data: { alt: "Sticky logo" },
        filePath: path.resolve(dirname, "assets", "logo.png")
    });

    const n_studies = fakerNL.number.int({ min: 3, max: 10 });
    p.logger.info(`Creating ${n_studies} studies`);
    const studies = [];
    for (let i = 0; i < n_studies; i++) {
        const name = fakerNL.word.words({ count: { min: 1, max: 3 } });
        const study = await p.create({
            collection: "study",
            data: {
                name,
                abbreviation: name.split(" ").map(s => s[0]).join(""),
                order: i
            }
        });
        studies.push(study);
    }

    const n_companies = fakerNL.number.int({ min: 3, max: 10 });
    p.logger.info(`Creating ${n_companies} companies`);
    for (let i = 0; i < n_companies; i++) {
        const name = fakerNL.company.name();
        const company = await p.create({
            collection: "company",
            data: {
                name,
                slug: to_slug(name),
                logo,
                description: richTextLorem(fakerNL, { min: 2, max: 4 }),
                website: fakerNL.internet.url()
            },
            draft: false,
            locale: "nl"
        });

        await p.update({
            collection: "company",
            id: company.id,
            data: {
                ...company,
                name,
                description: richTextLorem(fakerEN, { min: 2, max: 4 })
            },
            draft: false,
            locale: "en"
        });

        const n_contacts = fakerNL.number.int({ min: 1, max: 2 });
        p.logger.info(`Creating ${n_contacts} contacts`);
        const contacts: CompanyContact[] = [];
        for (let j = 0; j < n_contacts; j++) {
            const contact = await p.create({
                collection: "company-contact",
                data: {
                    name: fakerNL.person.fullName(),
                    email: fakerNL.internet.email(),
                    phone: fakerNL.phone.number({ style: "international" }),
                    company
                },
                draft: false
            });
            contacts.push(contact);
        }

        const n_vacancies = fakerNL.number.int({ min: 0, max: 5 });
        p.logger.info(`Creating ${n_vacancies} vacancies`);
        for (let j = 0; j < n_vacancies; j++) {
            const title = fakerNL.company.catchPhrase();
            const vacancy = await p.create({
                collection: "vacancy",
                data: {
                    title, slug: to_slug(title),
                    summary: fakerNL.lorem.sentences(),
                    content: richTextLorem(fakerNL, { min: 3, max: 7 }),
                    type: fakerNL.helpers.arrayElements(vacancy_options),
                    studies: fakerNL.helpers.arrayElements(studies),
                    company,
                    contact: fakerNL.helpers.maybe(() => fakerNL.helpers.arrayElement(contacts))
                }
            });

            await p.update({
                collection: "vacancy",
                id: vacancy.id,
                data: {
                    ...vacancy,
                    title: fakerEN.company.catchPhrase(),
                    summary: fakerEN.lorem.sentences(),
                    content: richTextLorem(fakerEN, { min: 3, max: 7 })
                },
                draft: false,
                locale: "en"
            });
        }
    }
}