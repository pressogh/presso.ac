import Color from 'color';

interface PressoTheme {
    fontFamily: string,
    monospaceFontFamily: string,
    textColor: Color,
    textColorInverted: Color,
    backgroundColor: Color
}

const GothamNotoFontFamily = [
    "Gotham",
    "Gotham SSm A",
    "Gotham SSm B",
    "Noto Sans KR",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
]
    .map((font) => (font.includes(' ') ? `"${font}"` : font))
    .join(',');

const GothamNotoMonospaceFontFamily = [
    'Gotham SSm Tabular A',
    'Gotham SSm Tabular B',
    'monospace',
]
    .map((f) => (f.includes(' ') ? `"${f}"` : f))
    .join(',')

const White = Color.rgb(255, 255, 255)
const Black = Color.rgb(11, 27, 56)

const Breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
}

const Light: PressoTheme = {
    fontFamily: GothamNotoFontFamily,
    monospaceFontFamily: GothamNotoMonospaceFontFamily,
    textColor: Black,
    textColorInverted: White,
    backgroundColor: White,
}

const Dark: PressoTheme = {
    fontFamily: GothamNotoFontFamily,
    monospaceFontFamily: GothamNotoMonospaceFontFamily,
    textColor: White,
    textColorInverted: Black,
    backgroundColor: Black,
}

const castShadow = (
    color: Color,
    x: number,
    y: number,
    r: number,
    s?: number
) => {
    return `${x}em ${y}em ${r}em ${s !== undefined ? `${s}em ` : ``}${color
        .alpha(0.15)
        .toString()}`
}

export type { PressoTheme }
export { Breakpoints, Light, Dark, castShadow }
