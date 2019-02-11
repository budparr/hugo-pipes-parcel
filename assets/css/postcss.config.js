require("postcss-import");
require("tailwindcss");
require("autoprefixer");
require("@fullhuman/postcss-purgecss");

class TailwindExtractor {
	static extract(content) {
		return content.match(/[A-z0-9-:\/]+/g);
	}
}

module.exports = ctx => ({	
	plugins: {
		"postcss-import": {
			path: ["assets/css"]
		},
		tailwindcss: "./assets/css/tailwind/tailwind.config.js",
		autoprefixer: {
			grid: true,
			browsers: [">1%"]
		},
		"@fullhuman/postcss-purgecss":
      ctx.env !== "development" ?
         {
						content: ["./layouts/**/*.html", "./components/**/**/*.html"],
						extractors: [
							{
								extractor: TailwindExtractor,
								extensions: ["html"]
							}
						],
						fontFace: true,
						whitelist: ["class1"]
				  }
				: false
	}
});
