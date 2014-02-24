
var arrEmoCats =[
 	{
		"name": "Negative and forceful", 
		"arrEmotions": ["Anger","Annoyance","Contempt","Disgust","Irritation" ]
	},
	{ 
		"name": "Negative and not in control",
		"arrEmotions": [ "Anxiety","Embarrassment","Fear","Helplessness","Powerlessness","Worry" ]
	},
	{
		"name": "Negative thoughts",
		"arrEmotions": [ "Doubt","Envy","Frustration","Guilt","Shame" ]
	},
	{
		"name": "Negative and passive",
		"arrEmotions": [ "Boredom","Despair","Disappointment","Hurt","Sadness" ]
	},
	{
		"name": "Agitation",
		"arrEmotions": [ "Stress","Shock","Tension" ]
	},
	{
		"name": "Positive and lively",
		"arrEmotions": [ "Amusement","Delight","Elation","Excitement","Happiness","Joy","Pleasure" ]
	},
	{
		"name": "Caring",
		"arrEmotions": [ "Affection","Empathy","Friendliness","Love" ]
	},
	{
		"name": "Positive thoughts",
		"arrEmotions": [ "Courage","Hope","Pride","Satisfaction","Trust" ]
	},
	{
		"name": "Quiet positive",
		"arrEmotions": [ "Calm","Content","Relaxed","Relieved","Serene" ]
	},
	{
		"name": "Reactive",
		"arrEmotions": [ "Interest","Politeness","Surprised" ]
	}
];

var objData = {};
objData['keys'] = [ 'Emotion','TensionLevel','Gathering','Place','Animal','Verb' ];

objData['arrEmotion'] 		= [];

// Levels of tension that a character can hold
objData['arrTensionLevel'] 	= 	[ '1: Jellyfish', '2: Dude', '3: Neutral', '4: Formal', '5: Alert', '6: Bomb?', '7: Total Doom' ];

// Reasons for a group of people to be in the same place
objData['arrGathering'] 	= 	[ 
									'Wedding', 'Funeral', 'Christening', 'Concert', 'Office party', 'Xmas', 'School disco', 'Retirement', 'Bar Mitzvah', 'Birthday', 'Auction', 
									'Protest', 'Royal visit', 'Sports Event', 'Family Dinner', 'Graduation'
								];

// These are all archetypal locations 
objData['arrPlace'] 		= 	[ 	'A & E','Airport','Beach','Bus Stop','Butchers','Call centre','Canteen','Cinema','Countryside','Cruise ship','Doctors','Farm',
									'Factory','Garden Centre','Gym','Office','Park','Swimming Pool','Fire Station','Library','Motorway Services','Night Club',
									'Oil rig','Police Station','Power station','Restaurant','School','Showroom','Shop','Ski slope','Supermarket','Theme Park',
									'Train Station', 'University','Zoo'
								];

// Present tense verbs
objData['arrVerb'] 			= 	[ 	'Judging','Navigating','Peeling','Digging','Polishing','Craving','Operating','Procrastinating','Involving','Voting','Hitting','Cleaning',
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
									'Obtaining','Receiving','Separating','Surviving','Worry about','call','correct','enable','grow','Laughing at','occur','Recognising',
									'Costing','Encouraging','Handling','Offering','Recording','Talking','Writing','Waking','Missing','Buying'
								];

// Life changing moments (kept vague and skewed to be positive)
objData['arrLifeChanger'] 	= 	[ 	'Admitting a mistake', 'Appearing on TV', 'Buying a house', 'Change of image', 'Discovering family', 'Falling in love', 'First kiss', 'Financial windfall', 
									'Gender reassignment', 'Getting published', 'Graduating', 'Hostage situation', 'Leaving home', 'Meeting a hero', 'New job', 'New school', 
									'New pet', 'New skill', 'Pregnancy test result', 'Quitting a job', 'Retirement', 'Receiving award', 'Rekindling relationship', 'Helping a stranger',
									'Sporting achievement', 'Surviving a natural disaster', 'Saving a life', 'Settling a long-term feud', 'Trip abroad'  
								];

// Animals that characters can be based on
objData['arrAnimal'] 		= 	[ 	'Alligator','Ape','Badger','Bear','Beaver','Bee','Butterfly','Camel','Cat','Chimp','Coyote','Crab','Crow','Dinosaur','Handbag Dog','Terrier Dog',
									'Bull Dog','Large Dog','Duck','Exotic Bird','Elephant','Giraffe','Fish','Fox','Panda','Gorilla','Hippopotamus','Horse','Hummingbird','Kangaroo','Koala',
									'Leopard','Lion','Meerkat','Mosquito','Octopus','Ox','Rabbit','Rhinoceros','Shark','Snake','Spider','Squirrel','Swan','Ram','Turkey',
									'Turtle','Pig','Vulture' 
								];


var populateCompleteListArrays = (function(){
	var cnt = 0;
	arrEmoCats.forEach( function(thisCat){
		thisCat.arrEmotions.forEach( function(thisEmotion){
			objData['arrEmotion'][cnt] = {};
			objData['arrEmotion'][cnt]['name'] = thisEmotion;
			objData['arrEmotion'][cnt]['class'] = thisCat['name'].replace(/ /g,'').toLowerCase();
			cnt++;
		});
	});

	cnt = 0;
	objData['arrNouns'] = [];
	for (var cc = 97; cc <= 122; cc++) {
		thisArr = noun[ String.fromCharCode(cc) ];
		if( typeof thisArr != 'undefined' ){
			//console.log(noun[ thisChar ]);
			thisArr.forEach( function(thisNoun){
				objData['arrNouns'][cnt++] = thisNoun;
			});
		}
	}

	cnt = 0;
	objData['arrAdjectives'] = [];
	for (var cc = 97; cc <= 122; cc++) {
		thisArr = adj[ String.fromCharCode(cc) ];
		if( typeof thisArr != 'undefined' ){
			//console.log(noun[ thisChar ]);
			thisArr.forEach( function(thisNoun){
				objData['arrAdjectives'][cnt++] = thisNoun;
			});
		}
	}

})();

var populateInfoContent = (function(){

	var html = '';
	var cnt = 0;

	objData['keys'].forEach( function(thisKey){

		html += '<h2>All ' + thisKey + 's</h2><p>';
		cnt = 0;

		objData[ 'arr' + thisKey ].forEach( function(thisThing){
			if( cnt++ > 0 ){
				html += ', ';
			}
			if( typeof thisThing === 'object' ){
				html += thisThing['name'];
			} else {
				html += thisThing;
			}

		});
		
		html += '</p>';

	});

	$('.infoContent #dynamicCont').html( html );

})();

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$('#btnGenerate').click( function(){
	var html = '';
	var cssClass = 'unemotional'
	var intRand = 0;

	objData['keys'].forEach( function(thisKey){

		if( $( '#' + thisKey ).is(":checked") ){
			intRand = getRandomInt(0, objData[ 'arr' + thisKey ].length-1);
			var thisThing = objData[ 'arr' + thisKey ][intRand];

			html += '<div class="suggestion">';
			if( typeof thisThing === 'object' ){
				cssClass = thisThing['class'];
				html += thisThing['name'];
			} else {
				html += thisThing;
			}
			html += '</div>';
		}

	});

	if( $('#adjNoun').is(":checked") ){
		var rndNoun = getRandomInt(0, objData['arrNouns'].length-1);
		var rndAdj = getRandomInt(0, objData['arrAdjectives'].length-1);
		html += '<div class="suggestion">' + objData['arrAdjectives'][rndAdj] + ' ' + objData['arrNouns'][rndNoun] + '</div>';
	}
	
	$('#result').html( html ).attr('class',cssClass);
	curtainUp();
});

$('.logo').click( function(){
	if( $('#infoCurtain').hasClass('expanded') ){
		curtainUp();
	} else {
		curtainDown();
	}
});

function curtainUp(){
	$('#infoCurtain').removeClass('expanded');
	$('#result').removeClass('invisible');
}
function curtainDown(){
	$('#infoCurtain').addClass('expanded');
	$('#result').addClass('invisible');
}

$('#btnGenerate').click();


