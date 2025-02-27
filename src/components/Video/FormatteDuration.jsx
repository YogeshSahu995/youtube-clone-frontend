
export function FormatteDuration({ seconds }) {
    const hours = Math.floor(seconds / 3600)
    const min = Math.floor((seconds % 3600) / 60)
    const sec = Math.floor(seconds % 60)

    return [
        hours > 0 ? String(hours).padStart(2, '0') : null,
        String(min).padStart(2, '0'),
        String(sec).padStart(2, '0')
    ]
        .filter(Boolean)
        .join(':')
}