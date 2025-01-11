"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
const artist_module_1 = require("./artist/artist.module");
const mongoose_1 = require("@nestjs/mongoose");
const form_module_1 = require("./form/form.module");
const profile_module_1 = require("./profile/profile.module");
const telegram_module_1 = require("./telegram/telegram.module");
const booking_module_1 = require("./booking/booking.module");
const feedback_module_1 = require("./feedback/feedback.module");
const event_module_1 = require("./event/event.module");
const document_module_1 = require("./document/document.module");
const pdf_module_1 = require("./pdf/pdf.module");
const data_generator_module_1 = require("./data-generator/data-generator.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, 'angular', 'browser'),
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI),
            artist_module_1.ArtistModule,
            form_module_1.FormModule,
            profile_module_1.ProfileModule,
            telegram_module_1.TelegramModule,
            booking_module_1.BookingModule,
            feedback_module_1.FeedbackModule,
            event_module_1.EventModule,
            document_module_1.DocumentModule,
            pdf_module_1.PdfModule,
            data_generator_module_1.DataGeneratorModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map