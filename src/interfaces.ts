export interface TogglClient {
    at: string;
    guid: string;
    id: number
    name: string
    wid: number
}
export interface TogglProject {
    id: number;
    wid: number;
    name: string;
    billable: boolean;
    active: boolean;
    at: string;
    color: string;
    cid: number;
    is_private: boolean;
    template: boolean;
    created_at: string;
    auto_estimates: boolean;
    actual_hours: number;
    rate: number;
    hex_color: string;
}

export interface TogglTimeEntry {
    id: number;
    guid: string;
    wid: number;
    pid: number;
    billable: boolean;
    start: string;
    stop: string;
    duration: number;
    description: string;
    duronly: boolean;
    at: string;
    uid: number;
}

export interface TogglTag {
    id: number
    wid: number,
    name: string
}

export interface TogglWorkspace {
    id: number;
    name: string;
    profile: number;
    premium: boolean;
    admin: boolean;
    default_hourly_rate: number;
    default_currency: string;
    only_admins_may_create_projects: boolean;
    only_admins_see_billable_rates: boolean;
    only_admins_see_team_dashboard: boolean;
    projects_billable_by_default: boolean;
    rounding: number;
    rounding_minutes: number;
    api_token: string;
    at: string;
    logo_url: string;
    ical_url: string;
    ical_enabled: boolean;
}

export interface TogglUserData {
    id: number;
    api_token: string;
    default_wid: number;
    email: string;
    fullname: string;
    jquery_timeofday_format: string;
    jquery_date_format: string;
    timeofday_format: string;
    date_format: string;
    store_start_and_stop_time: boolean;
    beginning_of_week: number;
    language: string;
    image_url: string;
    sidebar_piechart: boolean;
    at: string;
    created_at: string;
    retention: number
    record_timeline: boolean
    render_timeline: boolean
    timeline_enabled: boolean
    timeline_experiment: boolean
    /*
        new_blog_post:
            {
                title: 'Upgrades to the Toggl Premium Plan',
                url: 'https://blog.toggl.com/upgrades-toggl-premium-plan/',
                category: 'toggl premium',
                pub_date: '2018-09-03T00:00:00Z'
            },
    */
    should_upgrade: boolean;
    achievements_enabled: boolean;
    timezone: string;
    openid_enabled: boolean;
    openid_email: string;
    send_product_emails: boolean;
    send_weekly_report: boolean;
    send_timer_notifications: boolean;
    last_blog_entry: string;
    /*
        invitation: {},
    */
    workspaces: Array<TogglWorkspace>;
    duration_format: string;
    obm: {
        included: boolean;
        nr: number;
        actions: string;
    }
}

export interface TogglDetailedReport {

}

export interface ApiCallback<T> {
    (err: any, res: T): void;
}
