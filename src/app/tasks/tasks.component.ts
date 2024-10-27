import { Component, Input, input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { dummyTasks } from '../dummy-tasks';
import { NewTaskComponent } from './new-task/new-task.component';
import { newTask } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  // @Input() name: string | undefined;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name?: string;

  isAddingTask = false;
  tasks = dummyTasks;

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.id);
  }

  onCompleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    console.log('tasks component cancel');
    this.isAddingTask = false;
  }

  onAddTask(task: newTask) {
    console.log('onAddTask ', task);
    this.isAddingTask = false;
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: this.id,
      title: task.title,
      summary: task.summary,
      dueDate: task.dueDate,
    });
  }
}
