import { Logger } from '@nestjs/common';
// import { promisify } from 'util';
import { execSync } from 'child_process';
import {
  DEFAULT_INIT_COMMIT_MSG,
  DEFAULT_INIT_BRANCH,
  DEFAULT_BRANCHES,
} from '../../common/constant';

const logger: Logger = new Logger('GitUtils');
// const execSyncAsync = promisify(execSync);

export async function createGitRepository(projectDirPath: string): Promise<void> {
  try {
    logger.debug('>>> Creating Git repository');

    // Initialize Git repository
    logger.debug('>>> Initializing Git repository...');
    execSync('git init', { cwd: projectDirPath });

    // Set default branch
    logger.debug('>>> Setting default branch...');
    execSync(`git config --global init.defaultBranch ${DEFAULT_INIT_BRANCH}`, {
      cwd: projectDirPath,
    });

    // Perform initial commit
    logger.debug('>>> Performing initial commit...');
    execSync(`git add .gitignore *`, { cwd: projectDirPath });
    execSync(`git commit -m "${DEFAULT_INIT_COMMIT_MSG}"`, {
      cwd: projectDirPath,
    });

    // Create additional branches
    for (const branch of DEFAULT_BRANCHES) {
      try {
        logger.log(`>>> Creating branch: ${branch}`);
        execSync(`git checkout -b ${branch} ${DEFAULT_INIT_BRANCH}`, {
          cwd: projectDirPath,
        });
      } catch (err) {
        // Branch may already exist; continue without throwing an error.
        console.warn(`Warning: Branch "${branch}" already exists.`);
      }
    }

    // Switch back to the initial branch
    logger.log(`>>> Switching back to the default branch: ${DEFAULT_INIT_BRANCH}`);
    execSync(`git checkout ${DEFAULT_INIT_BRANCH}`, { cwd: projectDirPath });

    logger.debug('>>> Git repository setup completed.');
  } catch (error: any) {
    console.error('Error initializing Git repository:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

export async function gitCommit(projectDirPath: string, commitMessage: string): Promise<void> {
  try {
    // Add files to the staging area
    logger.debug('>>> Staging changes...');
    execSync('git add .gitignore *', { cwd: projectDirPath });

    // Commit the changes
    logger.debug('>>> Committing Git repository...');
    execSync(`git commit -m "${commitMessage}"`, {
      cwd: projectDirPath,
    });

    // Show the status after the commit
    logger.debug('>>> Git status after commit:');
    const statusOutput = execSync('git status', {
      cwd: projectDirPath,
    });
    logger.log(statusOutput.toString());
  } catch (error: any) {
    console.error('Error committing Git repository:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}
