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
    {
        id: 'knm2',
        title: "学习设计地图",
        icon: 'jigsaw',
        type: 'UserKNMNavItems',
        router: '/main/detail',
    },
    // {
    //     id: 'knm3',
    //     title: "复杂系统科学地图",
    //     icon: '🎶',
    //     type: 'UserKNMNavItems',
    //     router: '/main/detail',
    // },
    {
        id: 'knm4',
        title: "元认知地图",
        icon: 'whale',
        type: 'UserKNMNavItems',
        router: '/main/detail',
    },
    {
        id: 'knm5',
        title: "知识建构地图",
        icon: 'gift',
        type: 'UserKNMNavItems',
        router: '/main/detail',
    },
    {
        id: 'knm6',
        title: "认识论信念地图",
        icon: 'art',
        type: 'UserKNMNavItems',
        router: '/main/detail',
    },
    {
        id: 'knm7',
        title: "情境认知理论",
        icon: 'star2',
        type: 'UserKNMNavItems',
        router: '/main/detail',
    },
    {
        id: 'knm8',
        title: "建构主义理论",
        icon: 'studio_microphone',
        type: 'UserKNMNavItems',
        router: '/main/detail',
    },
    {
        id: 'knm9',
        title: "认知加工主义",
        icon: 'closed_book',
        type: 'UserKNMNavItems',
        router: '/main/detail',
    },
];