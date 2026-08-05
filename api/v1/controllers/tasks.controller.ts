import paginationHelpers from "../../../helpers/pagination";
import searchHelpers from "../../../helpers/search";
import Task from "../models/task.model";
import { Request , Response} from"express";
export const index = async (req: Request, res: Response) => {
  //Find 
  interface Find {
    deleted : boolean,
    status? : string,
    title? : RegExp ,
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

  //Đoạn tìm kiếm
          const search = searchHelpers(req.query); 
          if(search.regex){
              find.title = search.regex;
          }
          
      //Đoạn tìm kiếm end
  const tasks = await Task
    .find(find)
    .sort(sort)
    .skip(objectPagination.skip || 0)
    .limit(objectPagination.limitItems)
  res.json(tasks)
}

export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;
  
  const task = await Task.findOne({ _id : id ,  deleted : false})
  res.json(task)
}

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const status : string = req.body.status
    const task = await Task.updateOne(
      { _id : id ,  deleted : false}, {
        status : status
    })
    if(!task){
        res.json({
        code : 400,
        message: "Cap nhat trang thai khong thanh cong"
      })
    }
    res.json({
      code : 200,
      message: "Cap nhat trang thai thanh cong"
    })
  } catch (error) {
    console.log(error)
    res.json({
      code : 400,
      message: "Loi"
    })
  }
  
}

