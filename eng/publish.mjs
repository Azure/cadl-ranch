import { execSync } from "child_process";

const branchName = "publish/auto-release";
console.log("Checkout branch", branchName);
try {
  execSync(`git checkout -b ${branchName}`);
} catch {
  execSync(`git checkout ${branchName}`);
}

console.log("Branch checked out");

execSync(`git reset --hard origin/main`);
execSync(`pnpm changeset version`);
execSync(`git commit -am "Bump versions"`);
execSync(`git push --set-upstream origin ${branchName} --force`);
