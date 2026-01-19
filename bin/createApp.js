#!/usr/bin/env node

import { exec } from "child_process";
import { chdir } from "process";
import { join } from "path";
import ora from "ora";
import { promisify } from "util";
import { existsSync, mkdirSync, copyFileSync, rmSync } from "fs";

const execAsync = promisify(exec);

const checkPnpm = async () => {
  try {
    await execAsync("pnpm --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

const runCommand = async (command, success, error) => {
  try {
    await execAsync(command, { stdio: "inherit" });
    success && success();
  } catch {
    error && error();
    process.exit(1);
  }
};

const main = async () => {
  // Check for required arguments

  let spinner = ora().start();

  if (process.argv.length < 3) {
    spinner.fail("Please specify a project directory");
    process.exit(1);
  }

  const projectDir = process.argv[2];

  // Check for pnpm

  spinner.text = "Checking for pnpm...";
  const hasPnpm = await checkPnpm();

  if (hasPnpm) {
    spinner.succeed("Found pnpm");
  } else {
    spinner.warn("Unable to find pnpm, using npm.");
  }

  // Create project directory / clone
  spinner = ora(`Cloning into project directory ${projectDir}...`).start();

  if (existsSync(projectDir)) {
    spinner.fail(`Directory ${projectDir} already exists`);
    process.exit(1);
  }

  mkdirSync(projectDir, { recursive: true });

  await runCommand(
    `git clone --quiet https://github.com/ividrine/express-starter-app.git ${projectDir}`,
    () => spinner.succeed(),
    () => spinner.fail("Failed to clone repository")
  );

  chdir(projectDir);

  // Remove ora as dependency since its only needed for this script

  spinner = ora("Removing unnecessary dependencies...").start();

  let oraRemoveCmd = hasPnpm ? "pnpm rm ora" : "npm uninstall ora --save";

  await runCommand(
    `${oraRemoveCmd} --silent`,
    () => spinner.succeed(),
    () =>
      spinner.warn(
        `Unable to remove ora. You will need to run '${oraRemoveCmd}' to manually remove.`
      )
  );

  // Install dependencies

  spinner = ora("Installing dependencies...").start();

  let installCmd = hasPnpm ? "pnpm install" : "npm install";

  await runCommand(
    `${installCmd} --silent`,
    () => spinner.succeed(),
    () =>
      spinner.warn(
        `Unable to install packages. You will need to run '${installCmd}' manually to see full output log.`
      )
  );

  // Copy environment file

  spinner = ora("Creating env file...").start();

  const envExamplePath = join(process.cwd(), ".env.example");
  const envPath = join(process.cwd(), ".env");

  copyFileSync(envExamplePath, envPath);

  spinner.succeed();

  spinner = ora("Cleaning up...").start();

  // Remove git / bin / pnpm files if needed

  rmSync(join(process.cwd(), ".git"), { recursive: true, force: true });
  rmSync(join(process.cwd(), "bin"), { force: true, recursive: true });

  if (!hasPnpm) {
    rmSync(join(process.cwd(), "pnpm-lock.yaml"), { force: true });
    rmSync(join(process.cwd(), "pnpm-workspace.yaml"), { force: true });
  }

  spinner.succeed(
    `Project setup complete! Run '${hasPnpm ? "pnpm" : "npm"} dev' to launch your app!`
  );
};

main();
