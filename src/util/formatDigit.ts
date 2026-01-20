export function formatDigit(bits: number): string {
    const units = [
        'bits',
        'bytes',
        'KB',
        'MB',
        'GB',
        'TB',
        'PB',
        'EB',
        'ZB',
        'YB'
    ];

    let value = bits;
    let unitIndex = 0;

    if (value >= 8) {
        value /= 8;
        unitIndex = 1;
    }

    while (value >= 1024 && unitIndex < units.length - 1) {
        value /= 1024;
        unitIndex++;
    }

    return `${value % 1 === 0 ? value : value.toFixed(1)} ${units[unitIndex]}`;
}
