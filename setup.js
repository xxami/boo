
const request = require('request');
const cheerio = require('cheerio');

const bulbapedia = 'https://bulbapedia.bulbagarden.net';
const pokemonListPage = 'List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number';

let generationsList = [];
let pokemonList = {}

let url = bulbapedia + '/wiki/' + pokemonListPage;
console.log('boo: fetching ' + url);

class PendingDownload {

	constructor(pokemonDirText, pokemon) {
		this.url = bulbapedia + pokemonDirText;
		this.pokemon = pokemon;
	}

}

request(url, function(err, response, body) {
	console.log('boo: setup running..');
	
	// get generations titles
	let $ = cheerio.load(body);
	let generations = $('#mw-content-text > h3 > span');

	$(generations).each(function(index, value) {
		let generation = $(value).attr('id')
			.replace('_', ' ');

		generationsList.push(generation);
	});

	// get list of pokemon within each generation
	let pendingDownloads = [];
	let generationIndex = 0;
	let generationLists = $('#mw-content-text > table[align="center"] > tbody');

	$(generationLists).each(function(index, value) {
		let pokemonData = $(value).find('tr:not(:first-child)');
		$(pokemonData).each(function(index, value) {

			let ndex = $(value).find('td:nth-child(2)');
			let pokemon = $(value).find('td:nth-child(4) > a');
			let type_a = $(value).find('td:nth-child(5) > a');
			let type_b = $(value).find('td:nth-child(6) > a');

			let generationText = generationsList[generationIndex];
			let ndexText = ndex.text().trim();
			let pokemonText = pokemon.text().trim();
			let pokemonDirText = pokemon.attr('href').trim();
			let typeText = type_a.text().trim();

			if (type_b.text() !== '')
				typeText += '/' + type_b.text();

			pendingDownloads.push(new PendingDownload(
				pokemonDirText, pokemonText));

			console.log(generationText + 
				' ' + ndexText + 
				' ' + pokemonText + 
				' (' + pokemonDirText + 
				') ' + typeText);
		});
		generationIndex += 1;
	});

	console.log('boo: parser complete');

	// write configuration

	// init thumbnail downloads
	console.log('boo: downloading thumbnails');
	fetchPokemonThumbnail(pendingDownloads);
});

function fetchPokemonThumbnail(pendingDownloads) {
	if (pendingDownloads.length <= 0) {
		console.log('boo: downloads complete');
		return;
	}

	let pendingDownload = pendingDownloads.shift();
	console.log('boo: fetching ' + pendingDownload.url);
	request(pendingDownload.url, function(err, response, body) {
		let $ = cheerio.load(body);
		let selector = 'img[alt="' + pendingDownload.pokemon + '"]';
		let img = $(selector);
		let thumbnailImgUrl = 'https:' + img.attr('src');

		console.log(thumbnailImgUrl);
		fetchPokemonThumbnail(pendingDownloads);
	});
}
