/* eslint-disable @typescript-eslint/no-explicit-any */
export const isValidPermission = (permissionName: any, permissionType: any) => {
    if (typeof permissionName !== 'string') return { valid: 0, message: 'Your permission name is not correctly formatted.' }
    if (permissionName.length < 1 || permissionName.length >= 40) return { valid: 0, message: 'The size of your permission name is not valid' }
    if (typeof permissionType !== 'string') return { valid: 0, message: 'Your permission type is not correctly formatted.' }
    if (permissionType.length < 1 || permissionType.length >= 40) return { valid: 0, message: 'The size of your permission type is not valid' }

    return { valid: 1 }
}
