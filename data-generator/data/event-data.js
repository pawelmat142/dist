"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventData = void 0;
class EventData {
    static getRandomEventName(skipElements) {
        const randomIndex = Math.floor(Math.random() * this.eventNames.length);
        const result = this.eventNames[randomIndex];
        if (skipElements && skipElements.includes(result)) {
            return this.getRandomEventName(skipElements);
        }
        return result;
    }
}
exports.EventData = EventData;
EventData.eventNames = [
    "Sonic Bloom Festival",
    "Eclipse of Sound",
    "Vibes & Vistas",
    "Electric Pulse Showcase",
    "Rhythms of the Night",
    "Harmonic Horizons",
    "Bassline Breakthrough",
    "VibeCraft Music Fest",
    "Neon Echoes",
    "Starlight Soundwaves",
    "Beatwave Carnival",
    "Pulse & Beats Extravaganza",
    "Cosmic Harmony Sessions",
    "Sonic Odyssey",
    "Harmonic Revolution",
    "Frequencies of Freedom",
    "Bassbound",
    "Midnight Melodies",
    "Euphonic Escapade"
];
//# sourceMappingURL=event-data.js.map