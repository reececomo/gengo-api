import { GengoAPI } from './utils/types';
/** Re-export types & errors */
export * from './utils/types';
export * from './utils/errors';
export * from './utils/webhooks';
export declare enum GengoEnvironment {
    Live = "https://api.gengo.com/v2/",
    Sandbox = "http://api.sandbox.gengo.com/v2/"
}
export interface Config {
    publicKey?: string;
    privateKey?: string;
    useSandbox?: boolean;
}
/**
 *
 * @param config
 * @returns
 */
export declare const initGengoAPI: (config?: Config) => GengoAPI;
