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
          tagTypes: [],
          priorityXnumber: 0,
          tag: {
            tagID: 0,
            tagType: null,
            title: null,
            priority: 0,
            subTags: [],
          }
        }
      }
    ],
    localDatabaseXnumber: 1
  };