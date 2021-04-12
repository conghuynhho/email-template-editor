// For CSS
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

// For LESS
declare module '*.module.less' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.less' {
    const classes: { [key: string]: string };
    export default classes;
}

// For SCSS
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

// For png
declare module '*.png' {
    const image: string;
    export default image;
}

declare module '*.jpg' {
    const image: string;
    export default image;
}

// For svg
declare module '*.svg' {
    const svg: string;
    export default svg;
}
