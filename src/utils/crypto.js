import sjcl from 'sjcl';

export function hash(data) {
    return btoa(JSON.stringify(sjcl.hash.sha256.hash(data)));
}
export function encrypt(password, value) {
    const json = JSON.stringify(value);
    return sjcl.encrypt(password, json);
}
export function decrypt(password, value) {
    const json = sjcl.decrypt(password, value);
    return JSON.parse(json);
}