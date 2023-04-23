import { buildLegacyTheme } from "sanity";

const props = {
  "--my-white": "#fff",
  "--my-black": "#070915",
  "--md-brand": "#FAD4D8",
  "--md-purple": "#330036",
  "--md-gray": "#ECECF0",
  "--my-green": "#0f9d58",
  "--my-red": "#db4437",
  "--my-yellow": "#f4b400",
};

export const myTheme = buildLegacyTheme({
  // Base Colors
  "--black": props["--my-black"],
  "--white": props["--my-white"],

  "--gray": props["--md-gray"],
  "--gray-base": props["--md-gray"],

  "--component-bg": props["--my-black"],
  "--component-text-color": props["--my-white"],

  // Brand Colors
  "--brand-primary": props["--md-brand"],

  //Buttons
  "--default-button-color": props["--md-gray"],
  "--default-button-primary-color": props["--md-brand"],
  "--default-button-success-color": props["--my-green"],
  "--default-button-danger-color": props["--my-red"],
  "--default-button-warning-color": props["--my-yellow"],

  //State
  "--state-info-color": props["--md-purple"],
  "--state-success-color": props["--my-green"],
  "--state-warning-color": props["--my-yellow"],
  "--state-danger-color": props["--my-red"],

  //Navbar
  "--main-navigation-color": props["--my-black"],
  "--main-navigation-color--inverted": props["--my-white"],

  "--focus-color": props["--md-brand"],
});
