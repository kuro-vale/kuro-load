import http from "k6/http";
import {check, sleep} from "k6";

export const options = {
    stages: [
        {duration: "5m", target: 100},
        {duration: "10m", target: 100},
        {duration: "5m", target: 0},
    ],
    tags: {
        testid: "kuro-paste"
    }
};

export default function () {
    const host = "https://kuro-paste.up.railway.app";
    const headers = {"Content-Type": "application/json", "Authorization": ""};
    // Login
    let payload = JSON.stringify({
        username: "loadtest",
        password: "realmentestinproduction"
    });
    let res = http.post(`${host}/auth/login`, payload, {headers});
    check(res, {
        "returns token": r => r.json()["token"].startsWith("e")
    });
    // Create paste
    headers.Authorization = `Bearer ${res.json()["token"]}`;
    payload = JSON.stringify({
        filename: "load_test",
        extension: ".txt",
        body: `This is a file generated for load testing\n${getRandomString()}`
    });
    res = http.post(`${host}/pastes/compose`, payload, {headers});
    check(res, {
        "status is 201": r => r.status === 201
    });
    // List pastes
    res = http.get(`${host}/pastes`);
    check(res, {
        "status is 200": r => r.status === 200
    });
    sleep(1);
}

function getRandomString() {
    const length = Math.floor(Math.random() * 5000) + 1;
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomChar = characters.charAt(randomIndex);
        randomString += randomChar;
    }

    return randomString;
}
