export interface StandardReportRequestParams {
    user_agent: string;
    workspace_id: number;
    since?: string;
    until?: string;
    billable?: "yes" | "no" | "both";
    client_ids?: string;
    project_ids?: string;
    user_ids?: string;
    rounding?: "on" | "off";
    display_hours?: "decimal" | "minutes";
}

export interface ReportResponse<T> {
    total_grand: number,
    total_billable: number,
    "total_currencies": Array<{ currency: string, amount: number }>,
    data: Array<T>
}

export interface DetailedReportRequestParams extends StandardReportRequestParams {
    page?: number;
}
export interface DetailedReportResponse extends ReportResponse<ReportTimeEntry> {
    total_count: number;
    per_page: number;
}

export interface ReportTimeEntry {
    id: number,
    pid: number,
    tid: number | null,
    uid: number,
    description: string,
    start: string,
    end: string,
    updated: string
    dur: number,
    user: string,
    use_stop: boolean,
    client: string,
    project: string,
    project_color: number,
    project_hex_color: string,
    task: null,
    billable: number,
    is_billable: boolean,
    cur: string,
    tags: Array<any>
}
