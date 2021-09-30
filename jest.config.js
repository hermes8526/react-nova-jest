const jestConfig = {
	verbose: true,
	testURL: "http://localhost/",
	transform: {
		"^.+\\.jsx?$": "babel-jest",
	},
	testMatch: ["**/src/tests/*.js?(x)"],
    moduleDirectories: ['node_modules', 'src']
};

module.exports = jestConfig;
