export function public_url(anyoneKey) {
    // return `http://localhost:3000/myapp#/storage/public/${anyoneKey}`;
     return `https://balibabu.github.io/myapp/#/storage/public/${anyoneKey}`;
}

export function get_users_anyonekey(file) {
    console.log('get_users_anyonekey');
    if (file.access===undefined) { return [[],[]] }
    const users = [];
    const anyoneKeys = [];
    for (const access of file.access) {
        if(access.sharedWith){
            users.push(access.sharedWith);
        }else{
            anyoneKeys.push(access.anyoneKey);
        }
    }
    return [users,anyoneKeys];
}