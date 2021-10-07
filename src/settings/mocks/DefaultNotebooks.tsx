import Chip from "@material-ui/core/Chip";

interface DataState {
    title: string;
    quote: string;
    tags: JSX.Element;
    time: string;
}

const createData = (title: string, quote: string, tags: JSX.Element, time: string): DataState => {
    return { title, quote, tags, time };
};

export const rows = [
    createData("学习科学基本概念", "Kim, 2017", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
    createData("元认知基本概念", "Flavell, 1978", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
    createData("设计范式", "Hannfin, 2001", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
    createData("复杂系统理论", "Kim, 2017", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
    createData("学习科学基本概念", "Kim, 2017", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
    createData("元认知基本概念", "Flavell, 1978", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
    createData("设计范式", "Hannfin, 2001", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
    createData("复杂系统理论", "Kim, 2017", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
    createData("学习科学基本概念", "Kim, 2017", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
    createData("元认知基本概念", "Flavell, 1978", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
    createData("设计范式", "Hannfin, 2001", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
    createData("复杂系统理论", "Kim, 2017", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
    createData("学习科学基本概念", "Kim, 2017", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
    createData("元认知基本概念", "Flavell, 1978", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
    createData("设计范式", "Hannfin, 2001", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
    createData("复杂系统理论", "Kim, 2017", <><Chip label="学习科学" color="secondary" size="small" variant="outlined" /> <Chip label="基本理论" color="secondary" size="small" variant="outlined" /></>, "2021年8月5日"),
];