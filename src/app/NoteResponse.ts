export class NoteResponse{
    noteId : number;
    message : string;
    title   : string;
    description : string;
    status : number;
    color:string;
    reminder:Date;
    labels : Array<LabelObject>;
    collaborators:Array<User>;
    urls:Array<UrlData>;
    collaboratorName:string;
    ownerId:number;
    image :string;
    urlPromise ?: any;
}
export class LabelObject {
    labelId : number;
    labelTitle : string;
}
export class User {
    fullName : string;
    userEmail : string;
}
export class UrlData {
    nodeId : number;
    title : string;
    imageUrl : string;
    domain : string;
}