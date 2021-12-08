const localURL = 'localhost:3001';
const productURL = '47.107.34.33:3000';
const currentEnv = localURL;

export const API = {
    "user": {
        "login": "http://"+currentEnv+"/user/login",
        "register": "http://"+currentEnv+"/user/register",
        "jwtVerify": "http://"+currentEnv+"/user/jwt",
        "passwordVerify": "http://"+currentEnv+"/user/verify",
        "update": "http://"+currentEnv+"/user/",
        "diary": "http://"+currentEnv+"/user/diary",
        "avatar": "http://"+currentEnv+"/user/avatar",
        "statics": "http://"+currentEnv+"/user/statics",
    },
    "map": "http://"+currentEnv+"/map",
    "graph": "http://"+currentEnv+"/map/:mapId/graph",
    "node": "http://"+currentEnv+"/graph/:graphId/node",
    "link": "http://"+currentEnv+"/graph/:graphId/link",
    "notebook": {
        "all": "http://"+currentEnv+"/graph/:graphId/allNotebook",
        "normal": "http://"+currentEnv+"/graph/:graphId/:target/:targetId/notebook",
        "node": "http://"+currentEnv+"/graph/:graphId/node/:nodeId/notebook",
        "link": "http://"+currentEnv+"/graph/:graphId/link/:linkId/notebook",
    }
}