
export const getPaddingChild = (padding) => {
    const result = {};

    switch (padding.length) {
        case 1:
            result.top = result.bottom = result.left = result.right = padding[0];
            break;
        case 2:
            result.top = result.bottom = padding[0];
            result.left = result.right = padding[1];
            break;
        case 3:
            result.top = padding[0];
            result.left = result.right = padding[1];
            result.bottom = padding[2];
            break;
        default:
            // 4
            result.top = padding[0];
            result.right = padding[1];
            result.bottom = padding[2];
            result.left = padding[3];
    }
    return result;
};