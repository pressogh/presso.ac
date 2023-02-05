import 'styled-components';
import {PressoTheme} from "@/styles/PressoTheme";

declare module 'styled-components' {
    export type DefaultTheme = PressoTheme;
}
