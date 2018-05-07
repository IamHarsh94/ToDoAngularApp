export class UrlDataRes{
    noteId : number;
    urls : Array<resDto>;
}
export class resDto{
    title : string;
    imageUrl :string;
    domain:string;
}