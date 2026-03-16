import type { SanitizedConfig } from "payload";
import payload from "payload";

import seedMain from "./main";
import seedVacancies from "./vacancies";
import seedPages from "./pages";

export const script = async (config: SanitizedConfig) => {
    const p = await payload.init({ config });

    await seedMain(p);
    await seedVacancies(p);
    await seedPages(p);

    payload.logger.info("Completed seeding");
    process.exit(0);
};