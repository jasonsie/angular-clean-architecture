import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pipe',
  imports: [CommonModule, FormsModule],
  templateUrl: './pipe.component.html',
  styleUrl: './pipe.component.scss'
})
export class PipeComponent {
  sampleText = 'angular pipes are awesome';
  sampleNumber = 1234.5678;
  samplePercent = 0.255;
  userInput = 'Type something here...';

  sampleObject = {
    name: 'Angular',
    version: 19,
    features: ['SSR', 'Standalone', 'Signals']
  };

  sampleArray = ['Angular', 'React', 'Vue', 'Svelte', 'Next.js'];
}
