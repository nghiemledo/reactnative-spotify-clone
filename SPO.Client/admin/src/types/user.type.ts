export interface User {
    id?: string,
    firstName?: string,
    lastName?: string,
    fullName?: string,
    dateofBirth?: string,
    gender?: boolean,
    address?: string,
    urlAvatar?: string,
    email?: string,
    emailConfirmed?: boolean
    passwordhash?: string,
    securityStamp?: string,
    concurrencyStamp?: string,
    phoneNumber?: string,
    lockoutEnd?: string,
    lockOutEnabled?: boolean,
    accessFailedCount?: number,
    createdAt?: string,
    updatedAt?: string
}