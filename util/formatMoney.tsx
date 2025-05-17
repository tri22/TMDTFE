function formatMoney(number: number, currency: string = 'VND'): string {
    if (typeof number !== 'number' || isNaN(number)) {
        return '0 ₫';
    }

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
    });

    return formatter.format(number);
}

export default formatMoney;
