export class AnnouncementConstant {
    public static FETCH_ANNOUNCEMENTS = 'api/announcement';
    public static FETCH_ANNOUNCEMENTS_JSON = 'json/announcement.json';
    public static ADD_ANNOUNCEMENT = 'api/announcement/add';
    public static FETCH_ANNOUNCEMENT = 'api/announcement';
    public static FETCH_ANNOUNCEMENT_BY_MONTH = 'api/announcement/month/admin';
    public static UPDATE_ANNOUNCEMENT = 'api/announcement/update';
    public static REORDER_ANNOUNCEMENT = 'api/announcement/reorder'
    public static DELETE_ANNOUNCEMENT = 'api/announcement/delete';

    public static SUCCESSFUL_UPDATE = 'Successfully updated announcement';

    public static MONTHS = [{ value: 0, label: 'January' },{ value: 1, label: 'February' },{ value: 2, label: 'March' },
    { value: 3, label: 'April' },{ value: 4, label: 'May' },{ value: 5, label: 'June' },{ value: 6, label: 'July' },
    { value: 7, label: 'August' },{ value: 8, label: 'September' },{ value: 9, label: 'October' },{ value: 10, label: 'November' },
    { value: 11, label: 'December' }];
    public static YEARS = [{value: 2019, label: '2019'}, {value: 2020, label: '2020'}, {value: 2021, label: '2021'}];
}