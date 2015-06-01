
/*
*	Mocks container
	very subject to change
*/

function generateMockTimeSlots() {
	return [30, 60, 15, 60, 60, 15];
}


function generateMockPrioritizedTasks() {
	return {
		"eTasks": [
			{
				description: "Task A"
			},
			{
				description: "Task B"
			}
		],
		"nTasks": [
			{
				description: "Task C"
			},
			{
				description: "Task D"
			}
		],
		"ntTasks": [
			{
				description: "Task E"
			},
			{
				description: "Task F"
			}
		]
	};
}


function generateMockWants() {
	return [
		{
			description: "Fuck Bitches"
		},
		{
			description: "Get Money"
		},
		{
			description: "Live Life"
		}
	];
}

function generateMockBreaks() {
	return [
		{
			description: "reddit"
		},
		{
			description: "youtube"
		},
		{
			description: "theonion"
		}
	];
}



module.exports = {
	generateMockTimeSlots:		generateMockTimeSlots,
	generateMockPrioritizedTasks:	generateMockPrioritizedTasks,
	generateMockWants:		generateMockWants,
	generateMockBreaks: 		generateMockBreaks
};
