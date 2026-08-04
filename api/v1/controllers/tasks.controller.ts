import paginationHelpers from "../../../helpers/pagination";
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

  //Pagination
      const countTasks = await Task.countDocuments(find);
  
      let objectPagination = paginationHelpers(
          {
          currentPage :  1,
          limitItems : 3
          },
          req.query,
          countTasks
      )
  //End Pagination
  const tasks = await Task.find(find).sort(sort).skip(objectPagination.skip || 0).limit(objectPagination.limitItems)
  res.json(tasks)
}

export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;
  
  const task = await Task.findOne({ _id : id ,  deleted : false})
  res.json(task)
}

