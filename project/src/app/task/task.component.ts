// src/app/task/task.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task: Task = new Task(0, '', '', new Date(), '', '', );  
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  addTask(): void {
    const taskId = this.tasks.length + 1;
    const newTask = new Task(
      taskId,
      this.task.name,
      this.task.description,
      this.task.deadline,
      this.task.owner,
      this.task.state,
      this.task.file  
      
    );
    this.taskService.addTask(newTask).subscribe(() => {
      this.loadTasks();
      this.task = new Task(0, '', '', new Date(), '', '', ); 
    });
  }

  private loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  removeTask(taskId: number): void {
    console.log('Removing task with ID:', taskId);
    this.taskService.removeTask(taskId).subscribe(
      () => {
        console.log('Task removed successfully.');
        this.loadTasks();
      },
      (error) => {
        console.error('Error removing task:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      this.task.file = fileInput.files[0].name;
    }
  }
}
