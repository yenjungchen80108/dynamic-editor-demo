import path from "path";
import fs from "fs/promises";

import camelcaseKeys from "camelcase-keys";

export const fetchConfigInfo = async ({ configUrl = "" }) => {
  const dir = path.join(process.cwd());

  try {
    const configFile = await fs.readFile(`${dir}${configUrl}`, "utf-8");

    return camelcaseKeys(JSON.parse(configFile), { deep: true });
  } catch (error) {
    throw new Error(error?.message || "[fetchConfigInfo] error");
  }
};
