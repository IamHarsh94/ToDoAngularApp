export class NoteResponse{
    noteId : number;
    message : string;
    title   : string;
    description : string;
    status : number;
    color:string;
    reminder:Date;
    labels : Array<LabelObject>
    collaborators:Array<User>
    collaboratorName:string;
    ownerId:number;
    image :string;
}
export class LabelObject {
    labelId : number;
    labelTitle : string;
}
export class User {
    fullName : string;
    userEmail : string;
}