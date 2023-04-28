import { execSync } from "child_process";

const branchName = "publish/auto-release";

execSync(`pnpm changeset version`);
execSync(`git commit -am "Bump versions"`);
execSync(`git push --set-upstream origin ${branchName} --force`);
