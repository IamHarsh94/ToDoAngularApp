import { NoteResponse } from './NoteResponse';

export interface noteInterface{
    message: string;
    status: number;
    notes: NoteResponse[];
}