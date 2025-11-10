export const showPrice = (price?: number): string => {
    if (!price) {
        return 'N/A';
    }
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}k`;
};
