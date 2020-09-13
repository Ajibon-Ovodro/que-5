const LOCAL_STORAGE_KEY = "posts";
const cat_data = 'categories'

export const loadPostData = () => {
	return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
};

export const storePostData = (post) => {
	window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(post));
};


export const loadCatData = () => {
	return JSON.parse(window.localStorage.getItem(cat_data) || "[]");
};

export const storeCatData = (category) => {
	const new_data = loadCatData();
	new_data.push(category);
	window.localStorage.setItem(cat_data, JSON.stringify(new_data));
};

export const toTitleCase = (phrase) => {
	return phrase
		.toLowerCase()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};
