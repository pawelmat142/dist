"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistModule = void 0;
const common_1 = require("@nestjs/common");
const artist_service_1 = require("./artist.service");
const artist_controller_1 = require("./artist.controller");
const mongoose_1 = require("@nestjs/mongoose");
const artist_model_1 = require("./model/artist.model");
const profile_module_1 = require("../profile/profile.module");
const telegram_module_1 = require("../telegram/telegram.module");
const artist_manager_service_1 = require("./artist-manager.service");
let ArtistModule = class ArtistModule {
};
ArtistModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: artist_model_1.Artist.name,
                    schema: artist_model_1.ArtistSchema
                }]),
            profile_module_1.ProfileModule,
            telegram_module_1.TelegramModule
        ],
        providers: [
            artist_service_1.ArtistService,
            artist_manager_service_1.ArtistManagerService
        ],
        controllers: [
            artist_controller_1.ArtistController
        ],
        exports: [
            artist_service_1.ArtistService,
            artist_manager_service_1.ArtistManagerService
        ]
    })
], ArtistModule);
exports.ArtistModule = ArtistModule;
//# sourceMappingURL=artist.module.js.map