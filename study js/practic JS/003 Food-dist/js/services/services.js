let postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': "application/json"
        },
        body: data
    });
    return await res.json();
};
let getData = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Невозможно получить данные ${url}, статус ошибки ${res.status}`);
    }

    return await res.json();
};
export { postData };
export { getData };