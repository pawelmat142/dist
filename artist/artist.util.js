"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistUtil = void 0;
class ArtistUtil {
    static isViewReady(artist) {
        var _a, _b, _c;
        return !!artist.name
            && !!((_a = artist.country) === null || _a === void 0 ? void 0 : _a.code)
            && !!artist.bio
            && !!((_b = artist.medias) === null || _b === void 0 ? void 0 : _b.length)
            && this.imagesReadyForView(artist)
            && !!((_c = artist.styles) === null || _c === void 0 ? void 0 : _c.length);
    }
    static imagesReadyForView(artist) {
        var _a, _b;
        const avatarSet = (_a = artist.images) === null || _a === void 0 ? void 0 : _a.avatar;
        if (avatarSet) {
            if (avatarSet.avatar && avatarSet.avatarMobile && avatarSet.mini) {
                const bgImgs = (_b = artist.images) === null || _b === void 0 ? void 0 : _b.bg;
                if (bgImgs) {
                    const bgImgSet = bgImgs[0];
                    if (bgImgSet) {
                        return bgImgSet.bg && bgImgSet.bgMobile && !!bgImgSet.avatar;
                    }
                }
            }
        }
        return false;
    }
    static artistNames(artists) {
        return artists.map(a => a.name).join(', ');
    }
}
exports.ArtistUtil = ArtistUtil;
//# sourceMappingURL=artist.util.js.map