$(document).ready(function () {
  console.log('test');
    getTasks();
    $('#taskSubmit').on('click', postTask);
    $('#container').on('click', '.complete', completeTask);
    $('#container').on('click', '.complete', checkCompletion);
    $('#container').on('click', '.delete', deleteTask);

});

function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: function(tasks) {
      appendTasks(tasks);
    },
    error: function() {
      console.log('Database error');
    }

  })
}

function appendTasks(tasks) {
  $("#container").empty();
  for (var i = 0; i < tasks.length; i++) {
    $("#container").append('<div class="containerDiv"></div>');
    $el = $('#container').children().last();
    var task = tasks[i];
    $el.data('id', task.id);
//    console.log('append task: ', task);
    var string = '<p name="task" value="'+ task.taskname +'" id="test'+ task.id +'">Task: '+tasks[i].taskname+' Status:'+tasks[i].completionstatus+'</p>'
// console.log('append: ', string);
    $el.append(string);
    $el.append('<button class="complete">Task Completed</button>');
    $el.append('<button class="delete">Delete Task</button>');
  }
}

function postTask() {
  event.preventDefault();
  console.log("postTask test");
  var task = {};
  $.each($('#taskEntry').serializeArray(), function (i, field) {
    task[field.name] = field.value;
  });
  console.log('post task: ', task);

  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: task,
    success: function(response) {
      getTasks();
    },
    error: function() {
      console.log('could not post a new task');
    }
  })
}

function completeTask() {
  event.preventDefault();
  var id = $(this).parent().data('id');
  console.log('id: ', id);

  // make book object
  // var task = {};
  // var fields = $(this).parent().children();//.serializeArray();
  // console.log('this par chi: ', $(this).parent().children());
  // console.log('fields: ', fields);
  // fields.forEach(function(field) {
  //   task[field.name] = field.value;
  // });
  // console.log('complete task: ', task);

  $.ajax({
    type: 'PUT',
    url: '/tasks/' + id,
//    data: task,
    success: function(result) {
      console.log('updated!!!!');
      getTasks();
    },
    error: function(result) {
      console.log('could not update book!');
    }
  });

}

function deleteTask() {
  var id = $(this).parent().data('id');
  console.log(id);

  $.ajax({
    type: 'DELETE',
    url: '/tasks/' + id,
    success: function(result) {
      getTasks();
    },
    error: function(result) {
      console.log('could not delete book.');
    }
  });
}

function checkCompletion() {
  var id = $(this).parent().data('id');
  $.ajax({
    type: 'GET',
    url: '/complete/' + id,
    success: function(completionStatus) {
      console.log(completionStatus);
      if (completionStatus[0].completionstatus == 'complete') {
        console.log('success');
        var thing = "test"+id;
        console.log(thing);
        $.find(thing).color = '#33cc33';

      }
    },
    error: function() {
      console.log('Database error');
    }
  })
}
