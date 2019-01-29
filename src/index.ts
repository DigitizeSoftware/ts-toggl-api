export * from "./interfaces";
export * from "./report-interfaces";

export {TogglApi, TogglApiOptions} from "./toggl-api";

export interface TogglClientOptions {
    apiUrl?: string;
    apiToken?: string;
    username?: string;
    password?: string;
    reauth?: boolean;
    sessionCookie?: string;
    reportsUrl?: string;
}
/*

export class TogglClient {

    private togglClient: TogglApi;

    constructor(options: TogglClientOptions) {
        this.togglClient = new TogglApi(options);
    }

    async getProjectData(projectId: number): Promise<TogglProject> {
        return Deferred.wrap<TogglProject>(cb => this.togglClient.getProjectData(projectId, cb));
    }

    async getTimeEntryData(teId: number): Promise<TogglTimeEntry> {
        return Deferred.wrap<TogglTimeEntry>(callback => this.togglClient.getTimeEntryData(teId, callback));
    }

    async getUserData(): Promise<TogglUserData> {
        return Deferred.wrap<TogglUserData>(callback => this.togglClient.getUserData({}, callback));
    }

    async getWorkspaceData(wId: number): Promise<TogglWorkspace> {
        return Deferred.wrap<TogglWorkspace>(cb => this.togglClient.getWorkspaceData(wId, cb));
    }

    async getWorkspaceUsers(wId: number): Promise<Array<TogglUserData>> {
        return Deferred.wrap<Array<TogglUserData>>(cb => this.togglClient.getWorkspaceUsers(wId, cb));
    }

    async getWorkspaceUser(wId: number, userId: number): Promise<TogglUserData | undefined> {
        const users = await this.getWorkspaceUsers(wId);
        return users.find(user => user.id === userId);
    }

    async detailedReport() {

    }
}
*/

interface Callback<T> {
    (err: any, result: T): void;
}

class Deferred<T> {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (reason: any) => void;

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        })
    }

    callback = (err: any, result: T) => {
        if (err) {
            this.reject(err);
        }
        else {
            this.resolve(result);
        }
    };

    static wrap<T>(fn: (callback: Callback<T>) => void) {
        const deferred = new Deferred<T>();
        fn(deferred.callback);
        return deferred.promise;
    }
}
