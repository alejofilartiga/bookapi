import {Model, Schema, model} from "mongoose"

export interface IBook {
    title:string,
    writer:string,
    genre:string,
    date: number,
    expirationTime: string,
    available: boolean
}

const bookSchema: Schema = new Schema (
    {
        title:{
            type:String,
            required:true
        },
        writer:{
            type:String,
            required:true
        },
        genre:{
            type:String,
            required:true
        },
        date:{
            type:Number
        },
        expirationTime:{
            type:String
        },
        available:{
            type:Boolean,
            default:true
        }
    }
)

const Book: Model <IBook>  = model <IBook> ("Books",bookSchema)

export default Book