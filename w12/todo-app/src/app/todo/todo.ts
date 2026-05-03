import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css']
})
export class TodoComponent {

  task = '';
  tasks: string[] = [];
  editIndex: number | null = null;

  addTask() {
    if (!this.task.trim()) return;

    if (this.editIndex !== null) {
      this.tasks[this.editIndex] = this.task;
      this.editIndex = null;
    } else {
      this.tasks.push(this.task);
    }

    this.task = '';
  }

  editTask(i: number) {
    this.task = this.tasks[i];
    this.editIndex = i;
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }
}