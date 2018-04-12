export class NoteResponse{
    nodeId : number;
    message : string;
    title   : string;
    description : string;
    status : number;
    color:string;
    reminder:Date;
    labels : Array<LabelObject>
}
export class LabelObject {
    labelId : number;
    labelTitle : string;
}