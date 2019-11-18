module.exports = {
  database: [
    {
      tasks: {
        totalTasks: 0,
        nextTaskID: 0,
        order: [[], [[], [], []]],
        allTasks: [
          {
            taskType: 0,
            taskCards: []
          },
          {
            taskType: 1,
            kanbanCards: [
              {
                kanbanType: 0,
                taskCards: []
              },
              {
                kanbanType: 1,
                taskCards: []
              },
              {
                kanbanType: 2,
                taskCards: []
              }
            ]
          }
        ]
      },
      
      tags : {
        totalTags: 0,
        nextTagID: 0,
        allTags :[],
        premiumTags: [],
        premiumTagOrder: [],
        priorityXnumber: 0,
        tagIDTree: {
          tagID: 0,
          priority: 0,
          subTags: [
           
          ]
        }
      }
    }
  ],
  localDatabaseXnumber: 1
};

//-----------------eachTag------------
// tag: {
//   tagID: 0,
//   tagType: null,
//   title: null,
//   priority: 0,
//   subTags: [],
// },

// ---------------tagTree----------------
// {
//   tagID: 1,
//   priority: 1,
//   subTags: [
//     {
//       tagID: 2,
//       priority: 2,
//       subTags: []
//     },
//     {
//       tagID: 3,
//       priority: 2,
//       subTags: []
//     }
//   ]
// }