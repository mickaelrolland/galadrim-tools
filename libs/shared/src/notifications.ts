export const NOTIFICATIONS = {
    DEFAULT: 0b0,
    NEW_RESTAURANT: 0b1,
    NEW_IDEA: 0b10,
    SENT_BY_ADMIN: 0b100,
    NEW_REVIEW: 0b1000,
    NEW_IDEA_COMMENT: 0b10000,
} as const;

export type NotificationName = keyof typeof NOTIFICATIONS;

export const hasNotificationEnabled = (
    notificationsSettings: number,
    notification: NotificationName,
) => {
    return (
        notification === "DEFAULT" || (notificationsSettings & NOTIFICATIONS[notification]) !== 0
    );
};

export const generateNotificationsSettings = (notificationSettingsWanted: NotificationName[]) => {
    const notificationsSet = new Set(notificationSettingsWanted);
    const notificationsArray = Array.from(notificationsSet);

    return notificationsArray.reduce<number>(
        (acc, curr) => acc + NOTIFICATIONS[curr],
        NOTIFICATIONS.DEFAULT,
    );
};

export const DEFAULT_NOTIFICATION_SETTINGS = generateNotificationsSettings([
    "NEW_IDEA",
    "NEW_RESTAURANT",
    "SENT_BY_ADMIN",
]);
