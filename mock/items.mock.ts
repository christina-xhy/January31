import { MockMethod } from "vite-plugin-mock";
import { ResponseParams } from "./mock";

let id = 0
const createId = () => {
    id += 1
    return id
}
const create = (attr?:Partial<Item>) : Item => {
    return {
        id: createId(),
        user_id:1,
        amount : 1000,
        tag_ids:[1,2],
        happen_at:'2023-02-14T00:00:00.000Z',
        created_at:'2023-02-14T00:00:00.000Z',
        updated_at:'2023-02-14T00:00:00.000Z',
        kind:'expense',
        ...attr
        }
      }

 const createList = (n:number,attr?:Partial<Item>):Item[] =>{
    return Array.from({length : 10}).map(()=>create())
 }

 const createResponse = ({count = 10,perPage = 10,page =1} ,attr?:Partial<Item>):Resources<Item> => {
    return {
        resources:createList(perPage,attr),
        pager: {
            page,
            per_page: perPage,
            count,
        }
    }
 }

 export const itemsMock : MockMethod = {
    url: '/api/v1/items',
    method: 'get',
    timeout: 1000,
    response: ( {query} : ResponseParams ):Resources<Item> => {
      return createResponse({count:100,perPage:10,page:parseInt(query.page)})
    }
}


   