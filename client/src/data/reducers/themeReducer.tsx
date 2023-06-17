// a reducer for toggling between light and dark theme
// -----------------------------------------------------------------------

// import { ThemeAction, ThemeState } from "../types";

// const initialState: ThemeState = {
//     theme: "light",
// };

// export const themeReducer = (
//     state: ThemeState = initialState,
//     action: ThemeAction
// ): ThemeState => {
//     switch (action.type) {
//         case "TOGGLE_THEME":
//             return {
//                 ...state,
//                 theme: action.payload,
//             };
//         default:
//             return state;
//     }
// }

export const initialThemeState = { theme: 'light' };

export function themeReducer(
        state: any = { theme: 'light' }, 
        action: { type: string; }
    ) {
    switch (action.type) {
        case 'toggleTheme':
            if (state.theme === 'light') {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
                console.log("dark theme");
                return {
                    ...state,
                    theme: 'dark'
                }
            } else {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                console.log("light theme");
                return {
                    ...state,
                    theme: 'light'
                }
            }
        default:
            return state;
    }
}