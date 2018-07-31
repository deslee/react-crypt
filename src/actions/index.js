export function createAction(type) {
    return (payload, extra) => ({
        type: type,
        payload: payload,
        extra: extra
    })
}