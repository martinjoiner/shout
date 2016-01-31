
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








// Add an Emotions Dictionary as a source of suggestions 
app.addSource( 
	new Dictionary( 
		'Emotion', 
		[
		 	{
				"class": "negativeAndForceful", 
				"items": ["Anger","Annoyance","Contempt","Disgust","Irritation" ]
			},
			{ 
				"class": "negativeAndNotInControl",
				"items": [ "Anxiety","Embarrassment","Fear","Helplessness","Powerlessness","Worry" ]
			},
			{
				"class": "negativeThoughts",
				"items": [ "Doubt","Envy","Frustration","Guilt","Shame" ]
			},
			{
				"class": "negativeAndPassive",
				"items": [ "Boredom","Despair","Disappointment","Hurt","Sadness" ]
			},
			{
				"class": "agitation",
				"items": [ "Stress","Shock","Tension" ]
			},
			{
				"class": "positiveAndLively",
				"items": [ "Amusement","Delight","Elation","Excitement","Happiness","Joy","Pleasure" ]
			},
			{
				"class": "caring",
				"items": [ "Affection","Empathy","Friendliness","Love" ]
			},
			{
				"class": "positiveThoughts",
				"items": [ "Courage","Hope","Pride","Satisfaction","Trust" ]
			},
			{
				"class": "quietPositive",
				"items": [ "Calm","Content","Relaxed","Relieved","Serene" ]
			},
			{
				"class": "reactive",
				"items": [ "Interest","Politeness","Surprised" ]
			}
		]
	)
);


// Add Levels of tension that a character can hold
app.addSource( 
	new Dictionary( 'Tension Lvl', [ '1: Jellyfish', '2: Dude', '3: Neutral', '4: Formal', '5: Alert', '6: Bomb?', '7: Total Doom' ] ) 
);


// Reasons for a group of people to be in the same place
app.addSource( 
	new Dictionary( 'Gathering', [ 
									'Wedding', 'Funeral', 'Christening', 'Concert', 'Office party', 'Xmas', 'School disco', 'Retirement', 'Bar Mitzvah', 'Birthday', 'Auction', 
									'Protest', 'Royal visit', 'Sports Event', 'Family Dinner', 'Graduation'
								] ) 
);


// These are all archetypal locations 
app.addSource( 
	new Dictionary( 'Place', [ 	'A & E','Airport','Beach','Bus Stop','Butchers','Call centre','Canteen','Cinema','Countryside','Cruise ship','Doctors','Farm',
								'Factory','Garden Centre','Gym','Office','Park','Swimming Pool','Fire Station','Library','Motorway Services','Night Club',
								'Oil rig','Police Station','Power station','Restaurant','School','Showroom','Shop','Ski slope','Supermarket','Theme Park',
								'Train Station', 'University','Zoo'
							] )
);


// Present tense verbs
app.addSource( 
	new Dictionary( 'Verb', 	[ 	'Judging','Navigating','Peeling','Digging','Polishing','Craving','Operating','Procrastinating','Involving','Voting','Hitting','Cleaning',
									'Accepting','Enjoying','Leading','Opening','Reducing','Teaching','Carrying','Counting','Examining','Forming','Keeping','Repeating',
									'Hating','Learning','Ordering','Shaking','Catching','Covering','Leaving','Outing','Reflecting','Mimicking','Flying','Intending','Serving',
									'Creating','Expecting','Owning','Refusing','Sharing','Testing','Changing','Experiencing','Hearing','Preparing','Reporting','Aiming',
									'Disregarding','Shooting','Thanking','Admitting','Charging','Crying','Explaining','Helping','Lying','Paying','Relating','Thinking','Affecting',
									'Checking','Cutting','Expressing','Hiding','Performing','Releasing','Shouting','Throwing','Affording','Choosing','Damaging','Extending',
									'Picking','Remaining','Showing','Touching','Claiming','Dancing','Facing','Holding','Linking','Placing','Remembering','Shutting','Training',
									'Dealing','Failing','Listening','Planning','Remove','Singing','Traveling','Allowing','Clearing','Deciding','Hurting','Living','Playing',
									'Treating','Answering','Climbing','Delivering','Fastening','Identifying','Looking','Pointing','Replacing','Trying','Closing','Demanding',
									'Feeding','Imagining','Losing','Preferring','Replying','Smile','Turning','Applying','Collecting','Denying','Feeling','Improving','Loving',
									'Sorting','Understanding','Arguing','Fighting','Including','Making','Presenting','Representing','Sounding','Using','Arranging','Committing',
									'Describing','Filling','Increasing','Managing','Pressing','Requiring','Arriving','Comparing','Designing','Finding','Marking','Limiting',
									'Preventing','Resting','Visiting','Asking','Complaning','Destroying','Finish','Influencing','Mattering','Producing','Resulting','Starting',
									'Attacking','Completing','Developing','Fitting','Informing','Promising','Returning','Stating','Waiting','Avoiding','Concerning','Dying',
									'Protecting','Revealing','Staying','Walking','Confirming','Folding','Introducing','Measuring','Proving','Ringing','Sticking','Wanting',
									'Connecting','Discover','Follow','Inviting','Meeting','Providing','Rising','Stopping','Warning','Considering','Discussing','Forcing',
									'Studying','Washing','Becoming','Consisting','Dividing','Forgetting','Joining','Pulling','Running','Succeeding','Watching','Taking',
									'Contacting','Forgiving','Sitting','Jumping','Minding','Pushing','Saving','Suffering','Wearing','Believing','Containing','Drawing',
									'Suggesting','Willing','Belonging','Continuing','Dressing','Kicking','Moving','Raising','Seeing','Suiting','Winning','Breaking',
									'Reaching','Wishing','Building','Controlling','Knocking','Needing','Reading','Selling','Sunning','Sending','Supposign','Working',
									'Supporting','Wondering','Burning','Cooking','Dropping','Giving','Knowing','Noticing','Realising','Copying','Eating','Going','Lasting',
									'Obtaining','Receiving','Separating','Surviving','Worrying','Calling','Correcting','Enabling','Growing','Laughing','Occuring','Recognising',
									'Costing','Encouraging','Handling','Offering','Recording','Talking','Writing','Waking','Missing','Buying'
								] )
);


// Life changing moments (kept vague and skewed to be positive)
app.addSource( 
	new Dictionary( 'LifeChanger', [ 	'Admitting a mistake', 'Appearing on TV', 'Buying a house', 'Change of image', 'Discovering family', 'Falling in love', 'First kiss', 'Financial windfall', 
										'Gender reassignment', 'Getting published', 'Graduating', 'Hostage situation', 'Leaving home', 'Meeting a hero', 'New job', 'New school', 
										'New pet', 'New skill', 'Pregnancy test result', 'Quitting a job', 'Retirement', 'Receiving award', 'Rekindling relationship', 'Helping a stranger',
										'Sporting achievement', 'Surviving a natural disaster', 'Saving a life', 'Settling a long-term feud', 'Trip abroad'  
								] )
);


// Animals that characters can be based on
app.addSource( 
	new Dictionary( 'Animal', 	[ 	'Alligator','Ape','Badger','Bear','Beaver','Bee','Butterfly','Camel','Cat','Chimp','Coyote','Crab','Crow','Dinosaur','Handbag Dog','Terrier Dog',
									'Bull Dog','Large Dog','Duck','Exotic Bird','Elephant','Giraffe','Fish','Fox','Panda','Gorilla','Hippopotamus','Horse','Hummingbird','Kangaroo','Koala',
									'Leopard','Lion','Meerkat','Mosquito','Octopus','Ox','Rabbit','Rhinoceros','Shark','Snake','Spider','Squirrel','Swan','Ram','Turkey',
									'Turtle','Pig','Vulture' 
								] )
);


// Call suggest method to kick things off :-) 
app.suggest();
