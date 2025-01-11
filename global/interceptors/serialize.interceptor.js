"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializeBookingDto = exports.SerializeInterceptor = exports.Serialize = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const class_transformer_1 = require("class-transformer");
const booking_dto_1 = require("../../booking/model/booking.dto");
const event_model_1 = require("../../event/model/event.model");
function Serialize(dto) {
    return (0, common_1.UseInterceptors)(new SerializeInterceptor(dto));
}
exports.Serialize = Serialize;
class SerializeInterceptor {
    constructor(dto) {
        this.dto = dto;
        this.options = {
            excludeExtraneousValues: true
        };
    }
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            if (Array.isArray(data)) {
                return data.map((item) => (0, class_transformer_1.plainToClass)(this.dto, item, this.options));
            }
            return (0, class_transformer_1.plainToClass)(this.dto, data, this.options);
        }));
    }
}
exports.SerializeInterceptor = SerializeInterceptor;
class SerializeBookingDto {
    constructor() {
        this.options = {
            excludeExtraneousValues: true
        };
    }
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            if (Array.isArray(data)) {
                return data.map((item) => this.serializeBooking(item));
            }
            return this.serializeBooking(data);
        }));
    }
    serializeBooking(data) {
        if (data.event) {
            data.event = (0, class_transformer_1.plainToClass)(event_model_1.Event, data.event, this.options);
        }
        return (0, class_transformer_1.plainToClass)(booking_dto_1.BookingDto, data, this.options);
    }
}
exports.SerializeBookingDto = SerializeBookingDto;
//# sourceMappingURL=serialize.interceptor.js.map