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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataGeneratorService = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("../profile/profile.service");
const profile_email_service_1 = require("../profile/profile-email.service");
const role_1 = require("../profile/model/role");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const countries_1 = require("./data/countries");
const gen_util_1 = require("./gen.util");
const artists_generator_1 = require("./data/artists-generator");
const bookings_generator_1 = require("./data/bookings-generator");
let DataGeneratorService = class DataGeneratorService {
    constructor(profileService, profileEmailService, artistsGenerator, bookingsGenerator, connection) {
        this.profileService = profileService;
        this.profileEmailService = profileEmailService;
        this.artistsGenerator = artistsGenerator;
        this.bookingsGenerator = bookingsGenerator;
        this.connection = connection;
        this.logger = new common_1.Logger(this.constructor.name);
        this.MANAGER_EMAIL = 'manager@test';
        this.MANAGER_2 = 'SynthSphere Booking';
        this.MANAGER_2_EMAIL = 'manager@synth-sphere-booking.com';
        this.MANAGER = { name: 'MANAGER_NAME' };
        this.ARTISTS = [];
        this.PROMOTERS = [];
        this.BOOKINGS = [];
    }
    async dataGenerator() {
        await this.cleanDatabase();
        await this.generateManagers();
        this.ARTISTS = await this.artistsGenerator.generateArtistss(this.MANAGER);
        this.PROMOTERS = await this.generatePromoters();
        this.BOOKINGS = await this.bookingsGenerator.generate(this.PROMOTERS, this.ARTISTS);
    }
    async cleanDatabase() {
        const collections = Object.keys(this.connection.collections);
        for (const collectionName of collections) {
            const collection = this.connection.collections[collectionName];
            await collection.deleteMany({});
            console.log(`Cleaned collection: ${collectionName}`);
        }
    }
    async generatePromoters() {
        const result = [];
        result.push(await this.generatePromoter(`James Taylor`, `promoter@test`));
        result.push(await this.generatePromoter(`Oliver Johnson`));
        result.push(await this.generatePromoter(`Thiago Almeida`));
        return result;
    }
    async generateManagers() {
        const managerData = {
            agencyName: this.MANAGER.name,
            agencyCompanyName: `${this.MANAGER} Sp. z o.o`,
            nameOfBank: `Turbo Bank`,
            accountHolder: `Adam Małysz`,
            agencyCountry: countries_1.COUNTRIES[0],
            accountAddress: `ul. Warszawska 15, 00-950 Warszawa`,
            accountNumber: `PL89 1234 5678 9012 3456 7890 1234`,
            accountSwift: `PL89 1234 5678 9012 3456 7890 1234`,
            agencyEmail: this.MANAGER_EMAIL,
            agencyPhone: gen_util_1.Gen.PHONE_NUMBER
        };
        const manager = await this.generateManager(this.MANAGER.name, this.MANAGER_EMAIL, managerData);
        this.MANAGER = manager;
        await this.generateManager(this.MANAGER_2, this.MANAGER_2_EMAIL);
    }
    async generateManager(name, email, managerData) {
        const user = await this.profileEmailService.createProfile({
            name: name,
            role: { code: role_1.Role.MANAGER, name: role_1.Role.MANAGER },
            email: email,
            password: email,
        });
        if (managerData) {
            await this.profileService.setManagerData(managerData, { uid: user.uid });
        }
        this.logger.log(`MANAGER ${name} generated`);
        return user;
    }
    async generatePromoter(name, email) {
        const mail = email ? email : gen_util_1.Gen.dotCom(name);
        const user = await this.profileEmailService.createProfile({
            name: name,
            role: { code: role_1.Role.PROMOTER, name: role_1.Role.PROMOTER },
            email: mail,
            password: mail,
        });
        this.logger.log(`PROMOTER ${name} generated`);
        return user;
    }
};
DataGeneratorService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [profile_service_1.ProfileService,
        profile_email_service_1.ProfileEmailService,
        artists_generator_1.ArtistsGenerator,
        bookings_generator_1.BookingsGenerator,
        mongoose_2.Connection])
], DataGeneratorService);
exports.DataGeneratorService = DataGeneratorService;
//# sourceMappingURL=data-generator.service.js.map