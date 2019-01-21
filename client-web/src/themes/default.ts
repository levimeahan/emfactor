import { StyleSheet } from 'aphrodite/no-important';

export const colors = {
    text: {
        bright: '#f0f0f0',
        semiBright: '#e0e0e0',
        medium: '#d0d0d0',
        semiDark: '#c0c0c0',
        dark: '#b0b0b0',
    },
    links: {
        primary: '#5a5ada',
        primaryHover: '#6a6af0',
    },
    background: {
        primary: "#21252d",
        primaryDark: "#191923",
        primaryLight: "#282e37",
        secondary: "#363941",
        secondaryDark: "#2C2F37",
        secondaryLight: "#3f434b",
        tertiary: "#282c4b",
        tertiaryDark: "#202541",
        tertiaryLight: "#313455",
    },
    primaryBg: "#282c34",
    primaryHeaderBg: "#282c4b",
    primaryText: "white",
    primaryLink: "white",
    primaryHover: "#c0c0c0",

    secondaryBg: '#373b43',
    tertiaryBg: '',
    subtleText: "#e0e0e0",
};

export const sizes = {
    primaryFont: 16,
};

export const linkStyles = StyleSheet.create({
    standard: {
        color: colors.links.primary,
        transition: 'color linear 75ms',
        textDecoration: 'none',
        ':hover': {
            color: colors.links.primaryHover,
        },
    },
});