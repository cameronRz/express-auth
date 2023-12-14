import cookie from 'cookie';

export function serializeCookie(name: string, value: any) {
    return cookie.serialize(name, value, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
    })
}

export function expireCookie(name: string) {
    return cookie.serialize(name, '', {
        expires: new Date(0),
    })
}