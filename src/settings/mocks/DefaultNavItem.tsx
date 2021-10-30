import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import SearchIcon from '@material-ui/icons/Search';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';

export const DefaultNavItems = [
    {
        id: "userSpace",
        title: "用户空间",
        icon: <CloudQueueIcon />,
        type: 'NavItemsBottom',
        router: '/main/userSpace',
    },
    {
        id: "all-maps",
        title: "所有地图",
        icon: <ArtTrackIcon />,
        type: 'SystemNavItems',
        router: '/main/list'
    },
    {
        id: "search",
        title: "笔记检索",
        icon: <SearchIcon />,
        type: 'SystemNavItems',
        router: '/main/search',
    },
    {
        id: 'knm1',
        title: "学习科学地图",
        icon: 'books',
        type: 'UserKNMNavItems',
        router: '/main/detail',
    },
];