import { execSync } from "child_process";

const branchName = "publish/auto-release";

execSync(`git config --global user.email "noreply@microsoft.com"`);
execSync(`git config --global user.name "Auto Changeset Bot"`);
execSync(`pnpm changeset version`);
execSync(`git commit -am "Bump versions"`);
execSync(`git push --set-upstream origin ${branchName} --force`);
