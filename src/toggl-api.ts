import {ApiCallback, TogglClient, TogglProject, TogglTimeEntry, TogglUserData, TogglWorkspace} from "./interfaces";
import * as transport from "./transport";
import {DetailedReportRequestParams, DetailedReportResponse} from "./report-interfaces";

const API_URL = "https://www.toggl.com/api/v8";
const API_REPORTS_URL = "https://toggl.com/reports/api/v2";

export interface TogglApiOptions {
    apiUrl?: string;
    apiToken?: string;
    username?: string;
    password?: string;
    reauth?: boolean;
    sessionCookie?: string;
    reportsUrl?: string;
}

export class TogglApi {
    private options: TogglApiOptions;
    private transport = transport;

    constructor(options: TogglApiOptions) {
        this.options = options;
    }

    async getClients(): Promise<Array<TogglClient>> {
        const auth = this.getAuth();
        const response = await this.transport.get(buildUrl("/clients"), {auth});
        const {status} = response;
        const json = await response.json();
        if (status >= 400) {
            throw json;
        }
        else {
            return json;
        }
    }

    getProjectData(projectId: number, callback: ApiCallback<TogglProject>): void {
    };

    getTimeEntryData(teId: number, callback: ApiCallback<TogglTimeEntry>): void {
    };

    async getUserData(params?: { withRelatedData?: "true", since?: number }): Promise<TogglUserData> {
        const auth = this.getAuth();
        const response = await this.transport.get(buildUrl("/me"), {params, auth});
        const {status} = response;
        if (status >= 400) {
            throw new Error(`Status ${status}: ${await response.text()}`);
        }
        const json = await response.json();
        return json.data;
    };

    getWorkspaceData(wId: number, callback: ApiCallback<TogglWorkspace>): void {
    };

    getWorkspaceUsers(wId: number, callback: ApiCallback<Array<TogglUserData>>): void {
    };

    // getWorkspaceUsers(wId: number, actualUsers: boolean, callback: ApiCallback<Array<TogglUserData>>): void {};

    async detailedReport(params: DetailedReportRequestParams): Promise<DetailedReportResponse> {
        const auth = this.getAuth();
        if (!auth) {
            throw new Error("Toggl API token is required for reports API calls");
        }
        const response = await this.transport.get(buildReportUrl("/details"), {params, auth});
        const {status} = response;
        if (status >= 400) {
            throw await response.json();
        }
        return response.json();
    }

    private getAuth() {
        const {apiToken} = this.options;
        if (apiToken) {
            return {
                user: apiToken,
                pass: "api_token"
            };
        }
    }
}

const buildUrl = (path: string): string => API_URL + path;
const buildReportUrl = (path: string): string => API_REPORTS_URL + path;
