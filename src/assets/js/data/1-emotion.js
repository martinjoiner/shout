
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
