"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistsGenerator = void 0;
const common_1 = require("@nestjs/common");
const artist_service_1 = require("../../artist/artist.service");
const profile_email_service_1 = require("../../profile/profile-email.service");
const artist_info_1 = require("./artist-info");
const role_1 = require("../../profile/model/role");
const gen_util_1 = require("../gen.util");
const artist_images_1 = require("./artist-images");
const countries_1 = require("./countries");
const artist_manager_service_1 = require("../../artist/artist-manager.service");
let ArtistsGenerator = class ArtistsGenerator {
    constructor(profileEmailService, artistService, artistManagerService) {
        this.profileEmailService = profileEmailService;
        this.artistService = artistService;
        this.artistManagerService = artistManagerService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.ARTISTS = [];
        this.ARTIST_EMAIL = 'artist@test';
        this.ARTIST_SIGNATURE = 'ARTIST_SIGNATURE';
    }
    async generateArtistss(manager) {
        this.MANAGER = manager;
        await this.generateArtists();
        return this.ARTISTS;
    }
    async generateArtists() {
        let i = 0;
        const artistProfile = await this.generateArtist('Neon Reverie', this.ARTIST_EMAIL, 0, [artist_info_1.ARTIST_LABEL[0], artist_info_1.ARTIST_LABEL[1]], [artist_info_1.ARTIST_STYLE[0], artist_info_1.ARTIST_STYLE[1], artist_info_1.ARTIST_STYLE[2]], [artist_info_1.ARTIST_MEDIA.instagram, artist_info_1.ARTIST_MEDIA.soundcloud, artist_info_1.ARTIST_MEDIA.spotify]);
        this.ARTIST_SIGNATURE = artistProfile.signature;
        const artistProfile2 = await this.generateArtist('Pulse Machine', '', 1, [artist_info_1.ARTIST_LABEL[2]], [artist_info_1.ARTIST_STYLE[3], artist_info_1.ARTIST_STYLE[2]], [artist_info_1.ARTIST_MEDIA.instagram, artist_info_1.ARTIST_MEDIA.bandcamp, artist_info_1.ARTIST_MEDIA.spotify]);
        const artistProfile3 = await this.generateArtist('Echo Synthesis', '', 2, [artist_info_1.ARTIST_LABEL[3], artist_info_1.ARTIST_LABEL[4]], [artist_info_1.ARTIST_STYLE[3], artist_info_1.ARTIST_STYLE[4]], [artist_info_1.ARTIST_MEDIA.soundcloud, artist_info_1.ARTIST_MEDIA.bandcamp, artist_info_1.ARTIST_MEDIA.instagram, artist_info_1.ARTIST_MEDIA.you_tube]);
        const artistProfile4 = await this.generateArtist('Synthwave Odyssey', '', 3, [artist_info_1.ARTIST_LABEL[0]], [artist_info_1.ARTIST_STYLE[3], artist_info_1.ARTIST_STYLE[2]], [artist_info_1.ARTIST_MEDIA.instagram, artist_info_1.ARTIST_MEDIA.spotify, artist_info_1.ARTIST_MEDIA.facebook, artist_info_1.ARTIST_MEDIA.bandcamp]);
        const artistProfile5 = await this.generateArtist('Infinity Circuit', '', 4, [], [artist_info_1.ARTIST_STYLE[3], artist_info_1.ARTIST_STYLE[2]], [artist_info_1.ARTIST_MEDIA.instagram, artist_info_1.ARTIST_MEDIA.spotify, artist_info_1.ARTIST_MEDIA.facebook, artist_info_1.ARTIST_MEDIA.bandcamp]);
        const artistProfile6 = await this.generateArtist('Arctic Bass', '', 5, [artist_info_1.ARTIST_LABEL[1]], [artist_info_1.ARTIST_STYLE[3], artist_info_1.ARTIST_STYLE[2]], [artist_info_1.ARTIST_MEDIA.instagram, artist_info_1.ARTIST_MEDIA.you_tube, artist_info_1.ARTIST_MEDIA.spotify, artist_info_1.ARTIST_MEDIA.soundcloud]);
        const artistProfile7 = await this.generateArtist('Quantum Beats', '', 6, [artist_info_1.ARTIST_LABEL[2]], [artist_info_1.ARTIST_STYLE[8], artist_info_1.ARTIST_STYLE[1], artist_info_1.ARTIST_STYLE[7]], [artist_info_1.ARTIST_MEDIA.instagram, artist_info_1.ARTIST_MEDIA.spotify, artist_info_1.ARTIST_MEDIA.soundcloud]);
        const artistProfile8 = await this.generateArtist('Crystal Oscillator', '', 7, [artist_info_1.ARTIST_LABEL[3], artist_info_1.ARTIST_LABEL[1]], [artist_info_1.ARTIST_STYLE[4], artist_info_1.ARTIST_STYLE[5]], [artist_info_1.ARTIST_MEDIA.instagram, artist_info_1.ARTIST_MEDIA.spotify, artist_info_1.ARTIST_MEDIA.facebook, artist_info_1.ARTIST_MEDIA.you_tube]);
        const artistProfile9 = await this.generateArtist('Stellar Waves', '', 8, [artist_info_1.ARTIST_LABEL[4]], [artist_info_1.ARTIST_STYLE[8], artist_info_1.ARTIST_STYLE[0], artist_info_1.ARTIST_STYLE[6], artist_info_1.ARTIST_STYLE[7]], [artist_info_1.ARTIST_MEDIA.instagram, artist_info_1.ARTIST_MEDIA.bandcamp, artist_info_1.ARTIST_MEDIA.facebook]);
        this.ARTISTS.push(artistProfile);
        this.ARTISTS.push(artistProfile2);
        this.ARTISTS.push(artistProfile3);
        this.ARTISTS.push(artistProfile4);
        this.ARTISTS.push(artistProfile5);
        this.ARTISTS.push(artistProfile6);
        this.ARTISTS.push(artistProfile7);
        this.ARTISTS.push(artistProfile8);
        this.ARTISTS.push(artistProfile9);
    }
    async generateArtist(name, email, index, labels, styles, medias) {
        const mail = email ? email : gen_util_1.Gen.dotCom(name);
        const user = await this.profileEmailService.createProfile({
            name: name,
            role: { code: role_1.Role.ARTIST, name: role_1.Role.ARTIST },
            email: mail,
            password: mail,
        });
        this.logger.log(`Profile ${name} with role ARTIST created`);
        const nameSplit = name.split(' ');
        const artistForm = {
            manager: {
                code: this.MANAGER.uid,
                name: this.MANAGER.uid
            },
            artistName: name,
            firstName: (nameSplit === null || nameSplit === void 0 ? void 0 : nameSplit.length) ? nameSplit[0] : name,
            lastName: (nameSplit === null || nameSplit === void 0 ? void 0 : nameSplit[1]) ? nameSplit === null || nameSplit === void 0 ? void 0 : nameSplit[1] : '',
            phoneNumber: gen_util_1.Gen.PHONE_NUMBER,
            email: user.email
        };
        const artist = await this.artistService.createArtist(artistForm, { uid: user.uid });
        this.logger.log(`Artist created ${artist.name}`);
        const images = artist_images_1.ARTIST_IMAGES[index] || artist_images_1.ARTIST_IMAGES[0];
        if (images) {
            artist.images = images;
        }
        artist.country = countries_1.COUNTRIES[index] || countries_1.COUNTRIES[0];
        artist.bio = this.getArtistBio(artist.name);
        artist.labels = labels;
        artist.styles = styles;
        artist.medias = medias;
        const artistProfile = { uid: user.uid, artistSignature: artist.signature };
        const managerProfile = { uid: this.MANAGER.uid };
        await this.artistService.updateArtistView(artist, artistProfile);
        await this.artistManagerService.putManagementNotes({
            managmentNotes: this.getArtistManagementNotes(index % 2 + 1),
            artistSignture: artist.signature
        }, managerProfile);
        await this.artistManagerService.setStatus('ACTIVE', artist.signature, managerProfile);
        return artist;
    }
    getArtistBio(name) {
        return gen_util_1.Gen.getRandomParagraphs().join('\n\n');
    }
    getArtistManagementNotes(paragraphs) {
        return gen_util_1.Gen.getRandomParagraphs(paragraphs).join('\n\n');
    }
};
ArtistsGenerator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profile_email_service_1.ProfileEmailService,
        artist_service_1.ArtistService,
        artist_manager_service_1.ArtistManagerService])
], ArtistsGenerator);
exports.ArtistsGenerator = ArtistsGenerator;
//# sourceMappingURL=artists-generator.js.map