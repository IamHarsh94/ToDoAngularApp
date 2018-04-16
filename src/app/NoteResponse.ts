export class NoteResponse{
    nodeId : number;
    message : string;
    title   : string;
    description : string;
    status : number;
    color:string;
    reminder:Date;
    labels : Array<LabelObject>
    collaborators:Array<User>
    collaboratorName:string;
}
export class LabelObject {
    labelId : number;
    labelTitle : string;
}
export class User {
    fullName : string;
    userEmail : string;
}