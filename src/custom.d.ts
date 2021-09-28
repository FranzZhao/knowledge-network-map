// 界定一个模块, 只要是.css的文件就遵循下面的规定
declare module "*.css" {
    // 将读取的文件的内容转为key: value的键值对
    const css: {
        [key: string]: string
    };
    export default css;
}

// 使typescript能够引入pdf文件
declare module "*.pdf"
