$(document).ready(function () {
  console.log('test');
    getTasks();
    $('#taskSubmit').on('click', postTask);
    $('#container').on('click', '.complete', completeTask);
//    $('.delete').on('click', deleteTask);


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
    var string = '<p>Task: '+tasks[i].taskname+' Status:'+tasks[i].completionstatus+'</p>'
//console.log('append: ', string);
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
  var task = {};
  var fields = $(this).parent().children().serializeArray();
  fields.forEach(function(field) {
    task[field.name] = field.value;
  });
  console.log('complete task: ', task);

  $.ajax({
    type: 'PUT',
    url: '/tasks/' + id,
    data: task,
    success: function(result) {
      console.log('updated!!!!');
      getTasks();
    },
    error: function(result) {
      console.log('could not update book!');
    }
  });

}
