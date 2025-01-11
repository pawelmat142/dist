import { SelectorItem } from "../../artist/artist.controller";
export declare const getBookForm: (artist: SelectorItem, promoterInformation: any, eventInformation: any) => {
    eventInformation: any;
    promoterInformation: any;
    artistInformation: {
        artist: SelectorItem;
        offer: string;
        travel: string;
        accommodation: string;
        groundTransport: string;
        visa: string;
        detailsOfMediaRecordingRequests: string;
    };
    performanceDetails: {
        stageRoom: string;
        proposedSetTime: string;
        runningOrder: string;
        doors: string;
        curfew: string;
        exclusivityRadiusIssues: string;
        offerExpiryDate: Date;
    };
};
