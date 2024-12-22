// translation.service.ts
import { Injectable } from '@angular/core';
import { createObject } from 'rxjs/internal/util/createObject';

@Injectable({
	providedIn: 'root',
})
export class TranslationService {
	constructor() {}

	translate(unreadableText: string): string {
		// Example translation function
		// This could be replaced with actual translation logic or API calls
		const translationMap: { [key: string]: string } = {
			unreadable1: 'Hello',
			unreadable2: 'World',
			// Add more mappings as needed
		};

		return translationMap[unreadableText] || 'Translation not found';
	}
}
