import { IFileImageContentInterface } from "../interfaces/file-image-content.interface";
import { FirebaseAuthService } from "../services/firebase-auth.service";
import { AuthDataModel } from "./auth-data.model";

export class JournalEntry{
    shortTitle: string;
    tags: Array<string>;
    description: string;
    images: IFileImageContentInterface[];
    author: AuthDataModel;
    date: Date;
    isfavorite: boolean;
    _id: string;

    constructor(private firebaseAuthService: FirebaseAuthService){
        if(firebaseAuthService){
            const payload = JSON.parse(JSON.stringify(firebaseAuthService.getAuthata()));
            this.author = payload;
        }
    }
}