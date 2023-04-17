export const comfirmable = (tips: string, fn: () => void) => () => {
    const result = window.confirm(tips)
    if (result) { fn() }
}
