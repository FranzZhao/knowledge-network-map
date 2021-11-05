import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import SearchIcon from '@material-ui/icons/Search';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';

export const SystemNavItems = [
    {
        id: "all-maps",
        title: "所有地图",
        icon: <ArtTrackIcon />,
        type: 'SystemNavItems',
        router: '/main/list'
    },
    {
        id: "userSpace",
        title: "用户空间",
        icon: <CloudQueueIcon />,
        type: 'SystemNavItems',
        router: '/main/userSpace',
    },
    // TODO 暂不支持检索, V2.0后续可以考虑如何实现
    // {
    //     id: "search",
    //     title: "笔记检索",
    //     icon: <SearchIcon />,
    //     type: 'SystemNavItems',
    //     router: '/main/search',
    // },
];