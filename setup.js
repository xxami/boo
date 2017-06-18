
const request = require('request');
const cheerio = require('cheerio');

const bulbapedia = 'https://bulbapedia.bulbagarden.net';
const pokemonListPage = 'List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number';

let generationsList = [];
let pokemonList = {}

let url = bulbapedia + '/wiki/' + pokemonListPage;
request(url, function(err, response, body) {

	console.log('boo: setup running..');
	
	// get generations titles
	$ = cheerio.load(body);
	let generations = $('#mw-content-text > h3 > span');

	$(generations).each(function(index, value) {
		let generation = $(value).attr('id')
			.replace('_', ' ');

		generationsList.push(generation);
	});

	// get list of pokemon within each generation
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

			console.log(generationText + 
				' ' + ndexText + 
				' ' + pokemonText + 
				' (' + pokemonDirText + 
				') ' + typeText);
		});
		generationIndex += 1;
	});

});

