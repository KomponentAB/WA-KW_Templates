/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
WA.onInit().then(() => {
bootstrapExtra();}).catch((e: any) => console.error('Error during WA.onInit:', e));

WA.onInit().then(() => {
    console.log('Initializing grouping...');

    // Listen for changes to the "grouping" variable
    WA.state.onVariableChange('grouping').subscribe(() => {
        fetchAndUpdateGroupingState();
    });
}).catch((e: any) => console.error('Error during WA.onInit:', e));

// Fetch the current state of the "grouping" variable and process it
async function fetchAndUpdateGroupingState() {
    try {
        const groupingState: number = Number(WA.state.grouping);
        console.log('Current grouping state:', groupingState);
        await processGroupingStateChange(groupingState);
    } catch (e: any) {
        console.error('Error in updateGrouping:', e);
    }
}

// Process the change in the "grouping" state
async function processGroupingStateChange(state: number) {
    if (state === 1) {
        // If grouping state is 1, send "ping" event with value "start" and start collecting UUIDs
        WA.event.broadcast('ping', 'start');
        await startUUIDCollection();
    } else if (state === 0) {
        // If grouping state is 0, send "ping" event with value "stop"
        WA.event.broadcast('ping', 'stop');
        // Clear the group distributions and the uuids array
        uuids = [];
        console.log('Cleared UUIDs array');

        // Clear the arrays of each group
        const groupNames: string[] = ['Purple', 'Blue', 'Red', 'Green', 'Yellow', 'Orange'];
        groupNames.forEach(groupName => {
            WA.state[groupName] = [];
            console.log(`Cleared group ${groupName}`);
        });
    } else {
        console.warn('Unknown grouping state:', state);
    }
}

let uuids: string[] = [];

async function startUUIDCollection() {
    uuids = [];
    const pongSubscription = WA.event.on('pong').subscribe((value: any) => {
        const playerUUID = value.data as string;
        if (!uuids.includes(playerUUID)) {
            uuids.push(playerUUID);
        }
    });

    try {
        // Collect UUIDs for 3 seconds
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    } finally {
        // Stop collecting UUIDs and assign them to groups
        pongSubscription.unsubscribe();
        assignUUIDsToGroups();
    }
}

// Assign collected UUIDs to groups
async function assignUUIDsToGroups() {
    const groupNames: string[] = ['Purple', 'Blue', 'Red', 'Green', 'Yellow', 'Orange'];
    const groups: { [key: string]: string[] } = {
        Purple: [],
        Blue: [],
        Red: [],
        Green: [],
        Yellow: [],
        Orange: []
    };

    // Get your own player UUID
    const myUUID = WA.player.uuid;
    console.log('My UUID:', myUUID);

    // Remove your own UUID from the list of collected UUIDs
    uuids = uuids.filter(uuid => uuid !== myUUID);

    // Shuffle the UUIDs to ensure random distribution
    uuids.sort(() => Math.random() - 0.5);

    // Calculate the number of players per group ensuring each group has at least 2 players
    const minGroupSize = 2;
    const totalGroups = Math.min(groupNames.length, Math.floor(uuids.length / minGroupSize));
    const playersPerGroup = Math.floor(uuids.length / totalGroups);
    const remainder = uuids.length % totalGroups;

    let index = 0;
    groupNames.slice(0, totalGroups).forEach((groupName, i) => {
        const extraPlayer = i < remainder ? 1 : 0;
        const groupSize = playersPerGroup + extraPlayer;
        groups[groupName] = uuids.slice(index, index + groupSize);
        index += groupSize;
    });

    console.log('Formed groups:', groups);

    // Broadcast the assigned group to each UUID
    Object.keys(groups).forEach(groupName => {
        const uuidArray = groups[groupName];
        uuidArray.forEach(uuid => {
            console.log(`UUID ${uuid} is in group ${groupName}`);
            WA.event.broadcast(uuid, groupName);
        });
    });

    // Generate and set random codes for each group
    generateRandomCodes();
}

// Function to generate random 4-digit codes for each group
function generateRandomCodes() {
    const colors = ['Blue', 'Green', 'Orange', 'Red', 'Yellow', 'Purple'];
    colors.forEach(color => {
        const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
        WA.state[`code${color}`] = randomCode;
        console.log(`Generated code for ${color}: ${randomCode}`);
    });
        }
export {};