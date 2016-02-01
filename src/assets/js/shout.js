
/**
 * Application class
 */
Application = function(){

	this.sources = [];

};


/**
 * Method on Application class - Adds a source that this Application can take suggestions from
 *
 * @param {Dictionary|Joiner} source Either an instnce of Dictionary or Joiner
 */
Application.prototype.addSource = function( source ){
	this.sources.push( source );

	var id = this.sources.length - 1
		checkedKeyword = '';

	if( id === 0 ){
		checkedKeyword = 'checked';
	}

	// Make a row on the DOM for displaying suggestion and checkbox 
	$('#tblResult tbody').append('<tr><td class="suggestion" id="rslt' + id + '"></td><td class="option"><input type="checkbox" id="chk' + id + '" ' + checkedKeyword + '><label for="chk' + id + '">' + source.name + '</label></td></tr>');


	// Populate the info content element with a load of text lists
 
	var html = '<h2>All ' + source.name + 's</h2>';

	html += '<p>' + source.getPossibilities() + ' possibilities</p>';
		
	$('.infoContent #dynamicCont').append( html );

}


/** 
 * Method on Application class - Updates the DOM with 
 */
Application.prototype.suggest = function(){

	var suggestion,
		cssClass = 'unemotional',
		result;

	// Iterate over all the sources
	for( var i = 0, iLimit = this.sources.length; i < iLimit; i++ ){

		// Reset the result to blank by default
		result = '';

		if( $( '#chk' + i ).is(":checked") ){
			
			var suggestion = this.sources[i].randomSuggestion();

			result = suggestion.item;

			if( suggestion.class ){
				cssClass = suggestion.class;
			}
			
		}

		$('#rslt' + i).html( result );

	}

	$('#resultColour').attr('class', cssClass);
	$('#tblResult').attr('class', cssClass);
	curtainUp();
}


/**
 * Section class
 *
 * @param {array} sArray 
 * @param {string} sClass 
 */
Section = function( sArray, sClass ){
	this.items = sArray;
	this['class'] = null;

	if( typeof sClass !== 'undefined' ){
		this['class'] = sClass;
	}
}


/**
 * Method on Section class 
 *
 * @return A random item
 */
Section.prototype.getRandomItem = function(){
	var randItemPointer = randomInt(0, this.items.length-1);
	return this.items[ randItemPointer ];
}


/** 
 * Method on Section class - Gets total number of possibilities
 *
 * @return {integer} Total number of possibilities
 */
Section.prototype.getPossibilities = function(){
	return this.items.length;
}


/**
 * Dictionary class has a name and 1 or more sections
 *
 * @param {string} name The name of the dictionary
 * @param {array} dArray Array of items. Items can be simple strings or objects with 'class' and 'items' elements
 */
Dictionary = function( name, dArray ){

	this.name = name;
	this.sections = [];

	var thisItem,
		firstLevelItems = [];

	// Iterate over dArray
	for( var i = 0, iLimit = dArray.length; i < iLimit; i++){
		thisItem = dArray[i];
		if( typeof thisItem === 'object' ){
			// This item is not a simple string, so it must be data for a section 
			this.sections.push( new Section(thisItem['items'], thisItem['class']) );
		} else {
			// Add this to an array ready to make a section later
			firstLevelItems.push( thisItem );
		}
	}

	// Finally, turn all the simple string items from dArray into a section of their own
	if( firstLevelItems.length ){
		this.sections.push( new Section(firstLevelItems) );
	}

}


/** 
 * Method on Dictionary class - Gets a random item from a random section
 *
 * @return {object} An object with 2 elements 'class' and 'item'
 */
Dictionary.prototype.randomSuggestion = function(){
	var randSectionPointer = randomInt(0, this.sections.length-1);
	var randSection = this.sections[ randSectionPointer ];

	var suggestion = {};
	suggestion['class'] = randSection.class;
	suggestion['item'] = randSection.getRandomItem();
	return suggestion;
}


/** 
 * Method on Dictionary class - Gets total number of possibilities
 *
 * @return {integer} Total number of possibilities
 */
Dictionary.prototype.getPossibilities = function(){
	var count = 0;
	// Iterate over all sections totalling up possibilities
	for( var i = 0, iLimit = this.sections.length; i < iLimit; i++){
		count += this.sections[i].getPossibilities();
	}
	return count;
}


/**
 * Joiner class
 *
 * @param {string} name Name of the joiner
 * n * @params {Dictionary} Multiple additional arguments must be instances of Dictionary 
 */
Joiner = function( name ){

	this.name = name;
	this.dictionaries = [];

	// Populate array of dictionaries with all arguments after the first
	for( var i = 1, iLimit = arguments.length; i < iLimit; i++ ){
		this.dictionaries.push( arguments[i] );
	}
}


/**
 * Method on Joiner class - Gets a random item from each dictionary and concats them separated by spaces
 *
 * @return {object} An object with 2 elements 'class' and 'item'
 */
Joiner.prototype.randomSuggestion = function(){
	
	var separator = ' ',
		item = '';

	for( var i = 0, iLimit = this.dictionaries.length; i < iLimit; i++ ){
		if( i > 0 ){
			item += separator;
		}
		item += this.dictionaries[i].randomSuggestion().item;
	}

	return { 'class': null, 'item': item };
}


/** 
 * Method on Joiner class - Gets total number of possibilities
 *
 * @return {string} Description of total number of possibilities
 */
Joiner.prototype.getPossibilities = function(){
	var countDescription = '';
	// Iterate over all dictionaries totalling up possibilities
	for( var i = 0, iLimit = this.dictionaries.length; i < iLimit; i++){
		if( i > 0 ){
			countDescription += ' x ';
		}
		countDescription += this.dictionaries[i].getPossibilities();
	}
	return countDescription;
}


app = new Application();


/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 *
 * @param {integer} min The smallest number that can be returned
 * @param {integer} max The largest number that can be returned
 */
function randomInt(min, max){
	if( min === max ){
		return min;
	}
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * The money-shot for the whole app!
 * When the user hits the "Shout" button
 */
$('#btnGenerate').click( function(){

	app.suggest();

});


/**
 * When the shout logo (bottom center) is clicked, show or hide the infoCutain
 */
$('.logo').click( function(){
	if( $('#infoCurtain').hasClass('expanded') ){
		curtainUp();
	} else {
		curtainDown();
	}
});


/**
 * Hides the info curtain
 */
function curtainUp(){
	$('#infoCurtain').removeClass('expanded');
	$('body').removeClass('invisible');
}


/**
 * Shows the info curtain
 */
function curtainDown(){
	$('#infoCurtain').addClass('expanded');
	$('body').addClass('invisible');
}

