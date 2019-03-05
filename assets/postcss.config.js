//console.log("NODE_ENV", process.env.NODE_ENV);
module.exports = {
	plugins: [
		require("tailwindcss")("./assets/css/tailwindcss/tailwind.config.js"),
		require("autoprefixer")({
			grid: false,
			browsers: [">1%"]
		}),
		...(process.env.NODE_ENV !== "development"
			? [
					require("@fullhuman/postcss-purgecss")({
						content: ["./layouts/**/*.html", "./components/**/**/*.html"],
						extractors: [
							{
								extractor: class {
									static extract(content) {
										//console.log(process.env.NODE_ENV);
										//return content.match(/[a-zA-Z0-9-:_/]+/g) || [];
										return content.match(/[A-z0-9-:\/]+/g) || [];
									}
								},
								extensions: ["vue", "html"]
							}
						]
					})
			  ]
			: []) //If Development, do not use PurgeCSS
	]
};
