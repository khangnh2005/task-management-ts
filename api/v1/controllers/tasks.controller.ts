import Task from "../models/task.model";
import { Request , Response} from"express";
export const index = async (req: Request, res: Response) => {
  //Find 
  interface Find {
    deleted : boolean,
    status? : string
  }
  const find : Find = {
    deleted : false 
  }
  if(req.query.status){
    find.status  = req.query.status.toString()
  }

  //Find end 

  //Sort 
  const sort : Record<string,any>= {}
  if (req.query.sortKey && req.query.sortValue){
    const sortKey = req.query.sortKey.toString()
    sort[sortKey] = req.query.sortValue
  }
  //Sort end

  const tasks = await Task.find(find).sort(sort)
  res.json(tasks)
}

export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;
  
  const task = await Task.findOne({ _id : id ,  deleted : false})
  res.json(task)
}

