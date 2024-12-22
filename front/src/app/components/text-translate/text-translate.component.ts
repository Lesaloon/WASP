import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';

@Component({
	selector: 'app-text-translate',
	templateUrl: './text-translate.component.html',
	standalone: true,
	imports: [FormsModule, CommonModule],
})
export class TextTranslateComponent {
	unreadableText: string = '';
	translatedText: string = '';

	constructor(private translationService: TranslationService) {}

	translateText() {
		this.translatedText = this.translationService.translate(
			this.unreadableText
		);
	}
}
