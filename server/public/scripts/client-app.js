$(document).ready(function () {
  console.log('test');
    getTasks();
    $('#taskSubmit').on('click', postTask);


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
  $("#containerSpan").empty();
  for (var i = 0; i < tasks.length; i++) {
    $el = $('#container').children().last();
    var task = tasks[i];
    $el.data('id', task.id);
//    $el.append(task);
    console.log('append task: ', task);
    var string = '<p>Task: '+tasks[i].taskname+' Status:'+tasks[i].completionstatus+'</p>'
    console.log('append: ', string);
    $el.append(string);
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
