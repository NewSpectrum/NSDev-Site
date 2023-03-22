const currentTheme = () => sessionStorage.getItem('theme');


if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log("OS is currently in Dark Mode.");
	sessionStorage.setItem('theme', 'dark');
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    console.log("OS is currently in Light Mode.");
	sessionStorage.setItem('theme', 'light');
}

/*
window.matchMedia('(prefers-color-scheme: dark)').addListener(
	osTheme => {
		this.colorScheme = osTheme.matches;
	}
);
*/

// const savedTheme = () => localStorage.getItem('theme');
	// localStorage.setItem('theme', savedTheme(theme));