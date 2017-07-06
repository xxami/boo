
// this is probably broken by the time you need to use it

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const bulbapedia = 'https://bulbapedia.bulbagarden.net';
const pokemonListPage = 'List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number';

let generationsList = [];
let pokemonList = {} // generation: [PokemonInfo, ...]

let url = bulbapedia + '/wiki/' + pokemonListPage;
console.log('boo: fetching ' + url);

class PendingDownload {

	constructor(pokemonDirText, pokemon, index) {
		this.index = index;
		this.url = bulbapedia + pokemonDirText;
		this.pokemon = pokemon;
	}

}

class PokemonInfo {

	constructor(index, pokemon, type) {
		this.index = index;
		this.pokemon = pokemon;
		this.type = type;
	}

}

request(url, function(err, response, body) {
	console.log('boo: extracting pokemon');
	
	// get generations titles
	let $ = cheerio.load(body);
	let generations = $('#mw-content-text > h3 > span');

	$(generations).each(function(index, value) {
		let generation = $(value).attr('id')
			.replace('_', ' ');

		generationsList.push(generation);
		pokemonList[generation] = [];
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
				pokemonDirText, pokemonText, ndexText.substring(1)));

			let pokemonInfo = new PokemonInfo(
				ndexText, pokemonText, typeText);
			pokemonList[generationText][Number(ndexText.substring(1))] = pokemonInfo;
		});
		generationIndex += 1;
	});

	console.log('boo: finished parsing');

	// write configuration
	console.log('boo: writing dataset');
	
	let dataset = '\n';
	dataset += 'const boosters = [\n'
	generationsList.forEach(function(generation) {
		dataset += '	\'' + generation + '\',\n';
	});
	dataset += '];\n\n';
	dataset += 'const boosterDescript = \'booster box\';\n\n';
	dataset += 'const cards = {\n';
	generationsList.forEach(function(generation) {
		dataset += '	\'' + generation + '\': [\n';
		pokemonList[generation].forEach(function(pokemonInfo) {
			dataset += '		{\'img\': \'res/';
			dataset += pokemonInfo.index.substring(1) + '.png\', \'id\': ';
			dataset += pokemonInfo.index.substring(1) + ', \'text\': "';
			dataset += pokemonInfo.pokemon + '", \'description\': "';
			dataset += 'A `' + pokemonInfo.type + '` type Pokémon"},\n';
		});
		dataset += '	],\n';
	});
	dataset += '};\n\n';
	dataset += 'const titles = {\n';
	dataset += '	0: \'Newbie Trainer\',\n';
	dataset += '	100: \'Beginner Trainer\',\n';
	dataset += '	200: \'Intermediate Trainer\',\n';
	dataset += '	300: \'Experienced Trainer\',\n';
	dataset += '	400: \'Advanced Trainer\',\n';
	dataset += '	500: \'Expert Trainer\',\n';
	dataset += '	600: \'Elite Trainer\',\n';
	dataset += '	700: \'Pokémon Master\',\n';
	dataset += '	802: \'Pokémon Master+\',\n';
	dataset += '};\n\n';
	dataset += 'exports.boosters = boosters;\n';
	dataset += 'exports.boosterDescript = boosterDescript;\n';
	dataset += 'exports.cards = cards;\n';
	dataset += 'exports.titles = titles;\n';
	
	fs.writeFile('./idletcg/tcgdata.js', dataset, function (err) {
		if (err) { return console.log(err); }
		
		console.log('boo: dataset written');
	});

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
	
	let localFile = 'res/' + pendingDownload.index + '.png';
	if (fs.existsSync(localFile)) {
		console.log('skipping ' + localFile);
		fetchPokemonThumbnail(pendingDownloads);
		return;
	}
	
	console.log('boo: fetching ' + pendingDownload.url);
	request(pendingDownload.url, function(err, response, body) {
		let $ = cheerio.load(body);
		let selector = 'img[alt="' + pendingDownload.pokemon + '"]';
		let img = $(selector);
		if (img.attr('src') == undefined) {
			img = $($('img[width="250"]')[0]);
			console.log(img.attr('src'));
		}
		let thumbnailImgUrl = 'https:' + img.attr('src');
		console.log('downloading thumbnail to ' + localFile);
		request(thumbnailImgUrl).pipe(fs.createWriteStream(localFile));
		fetchPokemonThumbnail(pendingDownloads);
	});
}
