module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        custom: ["Cormorant", "serif"],
        primary: ["Gilroy-ExtraBold", "serif"],
        primary2: ["Gilroy-Bold", "serif"],
        gilroy_regular: ["Gilroy-Regular", "serif"],
        gilroy_medium: ["Gilroy-Medium", "serif"],
        secondary: ["Gilroy-Light", "serif"],
        title: ["Canela-Black", "serif"],
        subtitle: ["Canela-Bold", "serif"],
        canela_regular: ["Canela-Regular", "serif"],
        canela_light: ["Canela-Light", "serif"],
        cursive: ["ChicBudapestRegular", "serif"],
        regular: ["Helvetica", "serif"],
      },
    },
    keyframes: {
      textShow: {
        "0%": {
          transform: "translateY(1000px) scaleY(2.5) scaleX(0.2)",
          "transform-origin": "50% 100%",
          filter: "blur(60px)",
          opacity: "0",
        },
        "100%": {
          transform: "translateY(0) scaleY(1) scaleX(1)",
          "transform-origin": "50% 50%",
          filter: "blur(0)",
          opacity: "1",
        },
      },
      float: {
        "0%": {
          "box-shadow": "0 5px 15px 0px rgba(0,0,0,0.6)",
          transform: "translateY(0px)",
        },
        "50%": {
          "box-shadow": "0 25px 15px 0px rgba(0,0,0,0.2)",
          transform: "translateY(-20px)",
        },
        "100%": {
          "box-shadow": "0 5px 15px 0px rgba(0,0,0,0.6)",
          transform: "translateY(0px)",
        },
      },
      scroll: {
        "0%": {
          transform: "translateX(0)",
        },
        "100%": {
          transform: "translateX(calc(-250px * 4.5))",
        },
      },
      fourImagesScrollLeft: {
        "0%": {
          transform: "translate3d(0, 0, 0)",
        },
        "100%": {
          transform: "translate3d(-80%, 0, 0)",
        },
      },
      "text-shadow-pop-right": {
        "0%": {
          "text-shadow":
            "0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555",
          "-webkit-transform": "translateX(0)",
          transform: "translateX(0)",
        },
        "100% ": {
          "text-shadow":
            "1px 0 #555555, 2px 0 #555555, 3px 0 #555555, 4px 0 #555555, 5px 0 #555555, 6px 0 #555555, 7px 0 #555555, 8px 0 #555555",
          "-webkit-transform": "translateX(-8px)",
          transform: "translateX(-8px)",
        },
        "scale-up-center": {
          "0%": {
            "-webkit-transform": " scale(0.5)",
            transform: "scale(0.5)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
        },
      },
    },
    animation: {
      fourImagesScrollLeft: "fourImagesScrollLeft 85s linear infinite",
      float: "float 6s ease-in-out infinite",
      scroll: "scroll 20s linear infinite",
      textShow: "textShow 5.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both",
      textShow2: "textShow 3.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both",
      textShow3: "textShow 4.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both",
      "text-shadow-pop-right": "text-shadow-pop-right 0.6s both",
      "scale-up-center":
        "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
};
