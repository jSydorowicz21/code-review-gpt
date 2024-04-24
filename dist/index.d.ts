declare module 'code-review-gpt/args' {
  import { ReviewArgs } from "code-review-gpt/common/types";
  export const getYargs: () => Promise<ReviewArgs>;

}
declare module 'code-review-gpt/common/ci/azdev/commentOnPR' {
  /**
   * Publish a comment on the pull request. It always create a new one.
   * The comment will be signed off with the provided sign off.
   * @param comment The body of the comment to publish.
   * @param signOff The sign off to use.
   * @returns
   */
  export const commentOnPR: (comment: string, signOff: string) => Promise<void>;

}
declare module 'code-review-gpt/common/ci/github/commentOnPR' {
  /**
   * Publish a comment on the pull request. If the bot has already commented (i.e. a comment with the same sign off exists), update the comment instead of creating a new one.
   * The comment will be signed off with the provided sign off.
   * @param comment The body of the comment to publish.
   * @param signOff The sign off to use. This also serves as key to check if the bot has already commented and update the comment instead of posting a new one if necessary.
   * @returns
   */
  export const commentOnPR: (comment: string, signOff: string) => Promise<void>;

}
declare module 'code-review-gpt/common/ci/github/commentPerFile' {
  import { IFeedback } from "code-review-gpt/common/types";
  /**
   * Publish comments on a file-by-file basis on the pull request. If the bot has already commented on a file (i.e. a comment with the same sign off exists on that file), update the comment instead of creating a new one.
   * The comment will be signed off with the provided sign off.
   * @param feedbacks The JSON feedback from the AIModel.
   * @param signOff The sign off to use. This also serves as key to check if the bot has already commented and update the comment instead of posting a new one if necessary.
   * @returns void
   */
  export const commentPerFile: (feedbacks: IFeedback[], signOff: string) => Promise<void>;

}
declare module 'code-review-gpt/common/ci/gitlab/commentOnPR' {
  /**
   * Publish a comment on the pull request. If the bot has already commented (i.e. a comment with the same sign off exists), update the comment instead of creating a new one.
   * The comment will be signed off with the provided sign off.
   * @param comment The body of the comment to publish.
   * @param signOff The sign off to use. This also serves as key to check if the bot has already commented and update the comment instead of posting a new one if necessary.
   * @returns
   */
  export const commentOnPR: (comment: string, signOff: string) => Promise<void>;

}
declare module 'code-review-gpt/common/ci/utils' {
  import { GitHub } from "@actions/github/lib/utils";
  import { CreateFileCommentData } from "code-review-gpt/common/types";
  export const getRelativePath: (fileName: string, repoName: string) => string;
  export const getToken: () => string;
  type OctokitType = {
      octokit: InstanceType<typeof GitHub>;
      owner: string;
      repo: string;
      pull_number: number;
  };
  export const getOctokitRepoDetails: () => OctokitType | undefined;
  export const commentOnFile: (octokit: InstanceType<typeof GitHub>, data: CreateFileCommentData) => Promise<void>;
  export {};

}
declare module 'code-review-gpt/common/git/getChangedFileLines' {
  export const getChangesFileLinesCommand: (isCi: string | undefined, fileName: string) => string;
  export const getChangedFileLines: (isCi: string | undefined, fileName: string) => Promise<string>;

}
declare module 'code-review-gpt/common/git/getChangedFilesNames' {
  export const getChangedFilesNamesCommand: (isCi: string | undefined) => string;
  export const getGitRoot: () => Promise<string>;
  export const getChangedFilesNames: (isCi: string | undefined) => Promise<string[]>;

}
declare module 'code-review-gpt/common/git/getFilesWithChanges' {
  import { ReviewFile } from "code-review-gpt/common/types";
  export const getFilesWithChanges: (isCi: string | undefined) => Promise<ReviewFile[]>;

}
declare module 'code-review-gpt/common/model/AIModel' {
  import { IFeedback } from "code-review-gpt/common/types";
  interface IAIModel {
      modelName: string;
      provider: string;
      temperature: number;
      apiKey: string;
      retryCount?: number;
      organization: string | undefined;
  }
  class AIModel {
      private model;
      private retryCount;
      constructor(options: IAIModel);
      callModel(prompt: string): Promise<string>;
      callModelJSON(prompt: string): Promise<IFeedback[]>;
  }
  export default AIModel;

}
declare module 'code-review-gpt/common/model/createMemoryStore' {
  import { Document } from 'langchain/dist/document';
  import { MemoryVectorStore } from 'langchain/vectorstores/memory';
  export const CreateMemoryStore: (initialFiles: Document[]) => Promise<MemoryVectorStore>;

}
declare module 'code-review-gpt/common/model/getMaxPromptLength' {
  export const getMaxPromptLength: (modelName: string) => number;

}
declare module 'code-review-gpt/common/remote/github/extractPullRequestIdentifier' {
  import { PullRequestIdentifier } from 'code-review-gpt/common/remote/github/types';
  export const extractPullRequestIdentifier: (identifier: string) => PullRequestIdentifier;

}
declare module 'code-review-gpt/common/remote/github/getRemotePullRequestFiles' {
  import { ReviewFile } from "code-review-gpt/common/types";
  export const getRemotePullRequestFiles: (remotePullRequest: string) => Promise<ReviewFile[]>;

}
declare module 'code-review-gpt/common/remote/github/GitHubRESTClient' {
  import { PullRequestIdentifier } from "code-review-gpt/common/remote/github/types";
  import { ReviewFile } from "code-review-gpt/common/types";
  type GithubFile = {
      sha: string;
      filename: string;
      status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
      additions: number;
      deletions: number;
      changes: number;
      blob_url: string;
      raw_url: string;
      contents_url: string;
      patch?: string | undefined;
      previous_filename?: string | undefined;
  };
  export class GitHubRESTClient {
      private client;
      fetchReviewFiles(identifier: PullRequestIdentifier): Promise<ReviewFile[]>;
      fetchPullRequestFiles(rawFiles: GithubFile[]): Promise<ReviewFile[]>;
      fetchPullRequestFile(rawFile: GithubFile): Promise<ReviewFile>;
      fetchPullRequestFileContent(url: string): Promise<string>;
      decodeBase64(encoded: string): string;
  }
  export {};

}
declare module 'code-review-gpt/common/remote/github/isEligibleForReview' {
  export const isEligibleForReview: (path: string, status: string) => boolean;

}
declare module 'code-review-gpt/common/remote/github/types' {
  export class PullRequestIdentifier {
      owner: string;
      repo: string;
      prNumber: number;
      constructor(owner: string, repo: string, prNumber: number);
  }

}
declare module 'code-review-gpt/common/types' {
  export type AskAIResponse = {
      markdownReport: string;
      feedbacks: IFeedback[];
  };
  export type CreateFileCommentData = {
      feedback: IFeedback;
      signOff: string;
      owner: string;
      repo: string;
      pull_number: number;
      commit_id: string;
  };
  export type ReviewFile = {
      fileName: string;
      fileContent: string;
      changedLines: string;
  };
  export type PromptFile = {
      fileName: string;
      promptContent: string;
  };
  export type IFeedback = {
      fileName: string;
      riskScore: number;
      details: string;
  };
  export enum PlatformOptions {
      GITHUB = "github",
      GITLAB = "gitlab",
      AZDEV = "azdev"
  }
  export type ReviewArgs = {
      [x: string]: unknown;
      ci: string | undefined;
      setupTarget: string;
      commentPerFile: boolean;
      model: string;
      reviewType: string;
      org: string | undefined;
      remote: string | undefined;
      provider: string;
      _: (string | number)[];
      $0: string;
  };

}
declare module 'code-review-gpt/common/utils/getReviewFiles' {
  import { ReviewFile } from "code-review-gpt/common/types";
  export const getReviewFiles: (isCi: string | undefined, remotePullRequest: string | undefined) => Promise<ReviewFile[]>;

}
declare module 'code-review-gpt/common/utils/logger' {
  import { Logger } from "tslog";
  export const logger: Logger<unknown>;

}
declare module 'code-review-gpt/common/utils/parseAttributes' {
  import { IFeedback } from "code-review-gpt/common/types";
  export const parseAttributes: (jsonString: string) => IFeedback[];

}
declare module 'code-review-gpt/config' {
  export const getOpenAIApiKey: () => string;
  export const githubToken: () => string;
  export const getGitHubEnvVariables: () => Record<string, string>;
  export const getGitLabEnvVariables: () => Record<string, string>;
  export const gitAzdevEnvVariables: () => Record<string, string>;

}
declare module 'code-review-gpt/configure/findTemplateFile' {
  export const findTemplateFile: (pattern: string) => Promise<string>;

}
declare module 'code-review-gpt/configure/index' {
  import { ReviewArgs } from "code-review-gpt/common/types";
  export const configure: (yargs: ReviewArgs) => Promise<void>;

}
declare module 'code-review-gpt/index' {
  export {};

}
declare module 'code-review-gpt/review/constants' {
  export const signOff = "#### Powered by [Code Review GPT](https://github.com/mattzcarey/code-review-gpt)";
  export const modelInfo: {
      model: string;
      maxPromptLength: number;
  }[];
  export const languageMap: {
      [key: string]: string;
  };
  export const supportedFiles: Set<string>;
  export const excludedKeywords: Set<string>;
  export const maxFeedbackCount = 3;
  export const MAX_SURROUNDING_LINES = 5;

}
declare module 'code-review-gpt/review/index' {
  import { ReviewArgs, ReviewFile } from "code-review-gpt/common/types";
  export const review: (yargs: ReviewArgs, files: ReviewFile[], openAIApiKey: string) => Promise<string | undefined>;

}
declare module 'code-review-gpt/review/llm/askAI' {
  import { AskAIResponse } from "code-review-gpt/common/types";
  export const askAI: (prompts: string[], modelName: string, openAIApiKey: string, organization: string | undefined, provider: string) => Promise<AskAIResponse>;

}
declare module 'code-review-gpt/review/llm/feedbackProcessor' {
  import AIModel from "code-review-gpt/common/model/AIModel";
  import { IFeedback } from "code-review-gpt/common/types";
  const createSummary: (model: AIModel, feedbacks: IFeedback[]) => Promise<string>;
  const processFeedbacks: (model: AIModel, prompts: string[]) => Promise<IFeedback[]>;
  export { createSummary, processFeedbacks };

}
declare module 'code-review-gpt/review/llm/generateMarkdownReport' {
  import { IFeedback } from "code-review-gpt/common/types";
  export const formatFeedbacks: (feedbacks: IFeedback[]) => string;
  export const generateMarkdownReport: (feedbacks: IFeedback[], summary: string) => string;

}
declare module 'code-review-gpt/review/llm/PriorityQueue' {
  type QueueItem<T> = {
      priority: number;
      item: T;
  };
  class PriorityQueue<T> {
      private items;
      constructor(items?: QueueItem<T>[]);
      enqueue(item: T, priority: number): void;
      dequeue(): T | undefined;
      size(): number;
      peek(): QueueItem<T> | undefined;
      getItems(): T[];
  }
  export default PriorityQueue;

}
declare module 'code-review-gpt/review/prompt/constructPrompt/batchFiles/changedLines' {
  import { PromptFile, ReviewFile } from "code-review-gpt/common/types";
  export const changedLinesIntoBatches: (files: ReviewFile[], maxPromptPayloadLength: number) => PromptFile[][];

}
declare module 'code-review-gpt/review/prompt/constructPrompt/batchFiles/costOptimizedChangedLines' {
  import { PromptFile, ReviewFile } from "code-review-gpt/common/types";
  export const costOptimizedChangedLinesIntoBatches: (files: ReviewFile[], maxPromptPayloadLength: number) => PromptFile[][];

}
declare module 'code-review-gpt/review/prompt/constructPrompt/batchFiles/fullFiles' {
  import { PromptFile, ReviewFile } from "code-review-gpt/common/types";
  export const fullFilesIntoBatches: (files: ReviewFile[], maxBatchSize: number) => PromptFile[][];

}
declare module 'code-review-gpt/review/prompt/constructPrompt/batchFiles/utils/createPromptFiles' {
  import { PromptFile, ReviewFile } from "code-review-gpt/common/types";
  export const createPromptFiles: (files: ReviewFile[], maxPromptPayloadLength: number, maxSurroundingLines?: number) => PromptFile[];

}
declare module 'code-review-gpt/review/prompt/constructPrompt/batchFiles/utils/promptsIntoBatches' {
  import { PromptFile } from "code-review-gpt/common/types";
  export const promptsIntoBatches: (promptFiles: PromptFile[], maxBatchSize: number) => PromptFile[][];

}
declare module 'code-review-gpt/review/prompt/constructPrompt/constructPrompt' {
  import { ReviewFile } from "code-review-gpt/common/types";
  export const constructPromptsArray: (files: ReviewFile[], maxPromptLength: number, reviewType: string) => string[];

}
declare module 'code-review-gpt/review/prompt/constructPrompt/getLengthOfFile' {
  import { PromptFile } from "code-review-gpt/common/types";
  export const getLengthOfFile: (file: PromptFile) => number;

}
declare module 'code-review-gpt/review/prompt/filterFiles/filterFiles' {
  import { ReviewFile } from "code-review-gpt/common/types";
  export const filterFiles: (files: ReviewFile[]) => ReviewFile[];

}
declare module 'code-review-gpt/review/prompt/filterFiles/index' {
  export { filterFiles } from "code-review-gpt/review/prompt/filterFiles/filterFiles";

}
declare module 'code-review-gpt/review/prompt/getLanguageOfFile' {
  export const getLanguageName: (fileName: string) => string;

}
declare module 'code-review-gpt/review/prompt/prompts' {
  export const instructionPrompt = "You are an expert {Language} developer, your task is to review a set of pull requests.\nYou are given a list of filenames and their partial contents, but note that you might not have the full context of the code.\n\nOnly review lines of code which have been changed (added or removed) in the pull request. The code looks similar to the output of a git diff command. Lines which have been removed are prefixed with a minus (-) and lines which have been added are prefixed with a plus (+). Other lines are added to provide context but should be ignored in the review.\n\nBegin your review by evaluating the changed code using a risk score similar to a LOGAF score but measured from 1 to 5, where 1 is the lowest risk to the code base if the code is merged and 5 is the highest risk which would likely break something or be unsafe.\n\nIn your feedback, focus on highlighting potential bugs, improving readability if it is a problem, making code cleaner, and maximising the performance of the programming language. Flag any API keys or secrets present in the code in plain text immediately as highest risk. Rate the changes based on SOLID principles if applicable.\n\nDo not comment on breaking functions down into smaller, more manageable functions unless it is a huge problem. Also be aware that there will be libraries and techniques used which you are not familiar with, so do not comment on those unless you are confident that there is a problem.\n\nUse markdown formatting for the feedback details. Also do not include the filename or risk level in the feedback details.\n\nEnsure the feedback details are brief, concise, accurate. If there are multiple similar issues, only comment on the most critical.\n\nInclude brief example code snippets in the feedback details for your suggested changes when you're confident your suggestions are improvements. Use the same programming language as the file under review.\nIf there are multiple improvements you suggest in the feedback details, use an ordered list to indicate the priority of the changes.\n\nFormat the response in a valid JSON format as a list of feedbacks, where the value is an object containing the filename (\"fileName\"),  risk score (\"riskScore\") and the feedback (\"details\"). The schema of the JSON feedback object must be:\n{\n  \"fileName\": {\n    \"type\": \"string\"\n  },\n  \"riskScore\": {\n    \"type\": \"number\"\n  },\n  \"details\": {\n    \"type\": \"string\"\n  }\n}\n\nThe filenames and file contents to review are provided below as a list of JSON objects:\n\n";
  export const completionPrompt = "\nYou are a senior developer and have just reviewed a pull request. This was your feedback:\n{feedback}\nPlease summarise the review using 3 emojis.\n";
  export const demoPrompt = "You are an senior developer, your task is to review a code snippet.\nNote that you do not have the full context of the code.\n\nBegin your review by evaluating the code using a risk score similar to a LOGAF score but measured from 1 to 5, where 1 is the lowest risk to the code base if the code is merged and 5 is the highest risk which would likely break something or be unsafe.\n\nIn your feedback, focus on highlighting potential bugs, improving readability if it is a problem, making code cleaner, and maximising the performance of the programming language. Flag any API keys or secrets present in the code in plain text immediately as highest risk. Rate the changes based on SOLID principles if applicable.\n\nDo not comment on breaking functions down into smaller, more manageable functions unless it is a huge problem. Also be aware that there will be libraries and techniques used which you are not familiar with, so do not comment on those unless you are confident that there is a problem.\n\nUse markdown formatting for the feedback details. Also do not include the risk level in the feedback details.\n\nEnsure the feedback details are brief, concise, accurate. If there are multiple similar issues, only comment on the most critical.\n\nInclude brief example code snippets in the feedback details for your suggested changes when you're confident your suggestions are improvements. Use the same programming language as the file under review.\nIf there are multiple improvements you suggest in the feedback details, use an ordered list to indicate the priority of the changes.\n\nFormat the response in a valid JSON format as a list of feedbacks, where the value is an object containing the risk score (\"riskScore\") and the feedback (\"details\"). Also add the filename (\"filename\") which will always be \"demo code\". The schema of the JSON feedback object must be:\n{\n  \"fileName\": {\n    \"type\": \"string\"\n  },\n  \"riskScore\": {\n    \"type\": \"number\"\n  },\n  \"details\": {\n    \"type\": \"string\"\n  }\n}\n\nThe code to review is provided below:\n\n";

}
declare module 'code-review-gpt/test/constants' {
  export const generateCodeSnippetsPrompt = "\nYour role is to help testing a GPT application reviewing code changes. You receive a test case and you need to generate code in typescript corresponding to this test case, even if it follows bad practices or has security issues.\nThe test cases is formatted as a stringified JSON object with the following properties:\n- name: the name of the test case\n- description: the description of the test case\n\nThe input is the following:\n{testCase}\n\nReturn the content of a valid typescript file that would pass the test case.\n";
  export const testThreshold = 0.1;
  export const signOff = "#### Tests Powered by [Code Review GPT](https://github.com/mattzcarey/code-review-gpt)";

}
declare module 'code-review-gpt/test/index' {
  import { ReviewArgs } from "code-review-gpt/common/types";
  export const test: ({ ci, model, reviewType }: ReviewArgs, openAIApiKey: string) => Promise<void>;

}
declare module 'code-review-gpt/test/load/hash' {
  /**
   * Generate a hash from a string
   * @param data The string to hash.
   * @returns The hash.
   */
  export const generateHash: (data: string) => string;

}
declare module 'code-review-gpt/test/load/loadSnapshots' {
  import { MemoryVectorStore } from "langchain/vectorstores/memory";
  /**
   * Load all snapshots from a directory.
   * @param shapshotsDir The directory containing the snapshots.
   * @returns The snapshots in a MemoryVectorStore.
   */
  export const loadSnapshots: (shapshotsDir: string) => Promise<MemoryVectorStore>;

}
declare module 'code-review-gpt/test/load/loadTestCases' {
  import { TestCase } from "code-review-gpt/test/types";
  /**
   * Load all test cases from a directory.
   * @param testCasesDir The directory containing the test cases.
   * @returns The test cases.
   */
  export const loadTestCases: (testCasesDir: string) => Promise<TestCase[]>;

}
declare module 'code-review-gpt/test/load/loadTestCodeSnippets' {
  import AIModel from "code-review-gpt/common/model/AIModel";
  import { TestCase } from "code-review-gpt/test/types";
  /**
   * Load all code snippets for a set of test cases from the cache, or generate them if they are not found.
   * @param testCases The test cases to load the code snippets for.
   * @param snippetCacheDir The directory containing the code snippet cache.
   * @param model The model to use to generate the code snippets.
   * @returns The test cases with the code snippets.
   */
  export const loadOrGenerateCodeSnippets: (testCases: TestCase[], snippetCacheDir: string, model: AIModel) => Promise<TestCase[]>;

}
declare module 'code-review-gpt/test/run/generateTestReport' {
  import { TestCase } from "code-review-gpt/test/types";
  /**
   * Possible test results.
   */
  export enum testResult {
      PASS = "PASS",
      WARN = "WARN",
      FAIL = "FAIL"
  }
  /**
   * Generate a test report for a test case.
   * @param testCase The test case.
   * @param review The review generated by the AI.
   * @param similarReview The most similar review found in the vector store.
   * @param similarity The similarity score between the review and the most similar review found in the vector store.
   * @returns The test report and the test result.
   */
  export const generateTestReport: (testCase: TestCase, review: string, similarReview: string, similarity: number) => {
      report: string;
      result: testResult;
  };
  /**
   * Generate a summary of the test results.
   * @param testResults The test results.
   * @returns The summary.
   */
  export const generateTestResultsSummary: (testResults: {
      [key: string]: testResult;
  }) => string;

}
declare module 'code-review-gpt/test/run/runTest' {
  import { MemoryVectorStore } from "langchain/vectorstores/memory";
  import { TestCase } from "code-review-gpt/test/types";
  /**
   * Run all the test cases.
   * @param testCases The test cases.
   * @param modelName The name of the model.
   * @param maxPromptLength The maximum prompt length.
   * @param vectorStore The vector store.
   * @param reviewType The review type.
   * @returns The test results.
   */
  export const runTests: (testCases: TestCase[], modelName: string, maxPromptLength: number, vectorStore: MemoryVectorStore, reviewType: string, openAIApiKey: string) => Promise<string>;

}
declare module 'code-review-gpt/test/types' {
  import { ReviewFile } from "code-review-gpt/common/types";
  export type TestCase = {
      name: string;
      description: string;
      hash?: string;
      snippet?: ReviewFile;
  };

}
declare module 'code-review-gpt/testFiles/initialFilesExample' {
  export const initialFiles: {
      pageContent: string;
      metadata: {
          source: string;
      };
  }[];

}
declare module 'code-review-gpt/testFiles/types' {
  export interface SomeInterface {
      someProperty: string;
  }

}
declare module 'code-review-gpt' {
  import main = require('code-review-gpt/src/index');
  export = main;
}